/**
 * Утилита для работы с Robokassa KZ
 */

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
 * Получает статус платежа с бэкенда
 * @param {string} invId - ID платежа
 * @returns {Promise<Object>} Результат проверки статуса
 */
export const checkPaymentStatus = async (invId) => {
  try {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
    const response = await fetch(`${baseUrl}/api/payment/status/${invId}`);

    if (!response.ok) {
      throw new Error('Failed to check payment status');
    }

    return await response.json();
  } catch (error) {
    console.error('Error checking payment status:', error);
    throw error;
  }
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
