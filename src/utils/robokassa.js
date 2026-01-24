/**
 * Утилита для работы с Robokassa KZ
 * Документация: https://docs.robokassa.kz/
 *
 * Для тестового режима используем SHA256 вместо MD5
 */

/**
 * Генерирует SHA256 хеш
 * @param {string} string - Строка для хеширования
 * @returns {Promise<string>} SHA256 хеш в hex формате
 */
export async function generateSHA256(string) {
  const msgBuffer = new TextEncoder().encode(string);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Генерирует платежную ссылку Robokassa
 * @param {Object} params - Параметры платежа
 * @returns {Promise<string>} URL для перенаправления на оплату
 */
export const generateRobokassaUrl = async (params) => {
  const {
    merchantLogin,
    merchantPassword1,
    outSum,
    invId,
    description,
    email,
    planName,
    duration,
    mac,
    ip,
    isTest = 1, // 1 для теста, 0 для прода
  } = params;

  // Собираем shp_ параметры в алфавитном порядке для подписи
  // ВАЖНО: Robokassa требует включать ВСЕ shp_ параметры в формулу подписи
  const shpParams = {
    shp_duration: duration,
    shp_email: email,
    shp_ip: ip || '',
    shp_mac: mac || '',
    shp_plan_name: planName,
  };

  // Сортируем по ключу и формируем строку для подписи
  const shpString = Object.keys(shpParams)
    .sort()
    .map(key => `${key}=${shpParams[key]}`)
    .join(':');

  // Генерируем подпись: SHA256(MerchantLogin:OutSum:InvId:Password1:shp_...)
  const signatureString = `${merchantLogin}:${outSum}:${invId}:${merchantPassword1}:${shpString}`;
  console.log('🔐 Signature string:', signatureString);

  const signature = await generateSHA256(signatureString);

  // Формируем URL параметры
  const urlParams = new URLSearchParams({
    MerchantLogin: merchantLogin,
    OutSum: outSum,
    InvId: invId,
    Description: description,
    SignatureValue: signature,
    IsTest: isTest,
    // Пользовательские параметры (shp_*)
    shp_email: email,
    shp_plan_name: planName,
    shp_duration: duration,
    shp_mac: mac || '',
    shp_ip: ip || '',
  });

  // URL Robokassa
  const robokassaUrl = 'https://auth.robokassa.kz/Merchant/Index.aspx';

  return `${robokassaUrl}?${urlParams.toString()}`;
};

/**
 * Извлекает параметры платежа из URL
 * @param {URLSearchParams} searchParams - URL параметры
 * @returns {Object} Объект с параметрами платежа
 */
export const parseRobokassaParams = (searchParams) => {
  return {
    // Обязательные параметры от Robokassa
    outSum: searchParams.get('OutSum'),
    invId: searchParams.get('InvId'),
    signatureValue: searchParams.get('SignatureValue'),

    // Дополнительные пользовательские параметры (shp_*)
    email: searchParams.get('shp_email'),
    planName: searchParams.get('shp_plan_name'),
    duration: searchParams.get('shp_duration'),
    mac: searchParams.get('shp_mac'),
    ip: searchParams.get('shp_ip'),
    linkOrig: searchParams.get('shp_link_orig'),

    // Дополнительная информация
    culture: searchParams.get('Culture'),
  };
};

/**
 * Проверяет наличие всех необходимых параметров для верификации платежа
 * @param {Object} params - Параметры платежа
 * @returns {boolean} true если все параметры присутствуют
 */
export const validatePaymentParams = (params) => {
  return Boolean(
    params.outSum &&
    params.invId &&
    params.signatureValue
  );
};

/**
 * Форматирует сумму для отображения
 * @param {string|number} amount - Сумма платежа
 * @returns {string} Форматированная сумма
 */
export const formatAmount = (amount) => {
  if (!amount) return '0';
  const num = parseFloat(amount);
  return num.toFixed(2);
};

/**
 * Проверяет подпись от Robokassa (ResultURL)
 * @param {Object} params - Параметры от Robokassa
 * @param {string} password2 - Merchant Password 2
 * @returns {Promise<boolean>} true если подпись верна
 */
export const checkSignatureResult = async (params, password2) => {
  const { outSum, invId, signatureValue, duration, email, ip, mac, planName } = params;

  // Собираем shp_ параметры в алфавитном порядке
  const shpParams = {
    shp_duration: duration || '',
    shp_email: email || '',
    shp_ip: ip || '',
    shp_mac: mac || '',
    shp_plan_name: planName || '',
  };

  const shpString = Object.keys(shpParams)
    .sort()
    .map(key => `${key}=${shpParams[key]}`)
    .join(':');

  const signatureString = `${outSum}:${invId}:${password2}:${shpString}`;
  const calculatedSignature = await generateSHA256(signatureString);

  return calculatedSignature.toLowerCase() === signatureValue.toLowerCase();
};

/**
 * Проверяет подпись от Robokassa (SuccessURL)
 * @param {Object} params - Параметры от Robokassa
 * @param {string} password1 - Merchant Password 1
 * @returns {Promise<boolean>} true если подпись верна
 */
export const checkSignatureSuccess = async (params, password1) => {
  const { outSum, invId, signatureValue, duration, email, ip, mac, planName } = params;

  // Собираем shp_ параметры в алфавитном порядке
  const shpParams = {
    shp_duration: duration || '',
    shp_email: email || '',
    shp_ip: ip || '',
    shp_mac: mac || '',
    shp_plan_name: planName || '',
  };

  const shpString = Object.keys(shpParams)
    .sort()
    .map(key => `${key}=${shpParams[key]}`)
    .join(':');

  const signatureString = `${outSum}:${invId}:${password1}:${shpString}`;
  const calculatedSignature = await generateSHA256(signatureString);

  return calculatedSignature.toLowerCase() === signatureValue.toLowerCase();
};

/**
 * Формирует URL для перенаправления после успешной оплаты
 * @returns {string} Success URL
 */
export const getSuccessUrl = () => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/success`;
};

/**
 * Формирует URL для перенаправления после неудачной оплаты
 * @returns {string} Fail URL
 */
export const getFailUrl = () => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/fail`;
};

/**
 * Декодирует пользовательские параметры Robokassa (если они закодированы)
 * @param {string} value - Закодированное значение
 * @returns {string} Декодированное значение
 */
export const decodeRobokassaParam = (value) => {
  if (!value) return '';
  try {
    return decodeURIComponent(value);
  } catch (error) {
    console.error('Error decoding parameter:', error);
    return value;
  }
};
