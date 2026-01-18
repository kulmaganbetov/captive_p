/**
 * Утилита для работы с параметрами MikroTik Captive Portal
 */

/**
 * Извлекает параметры из URL (mac, ip, linkorig)
 * @returns {Object} Объект с параметрами MikroTik
 */
export const getMikroTikParams = () => {
  const params = new URLSearchParams(window.location.search);

  return {
    mac: params.get('mac') || '',
    ip: params.get('ip') || '',
    linkOrig: params.get('linkorig') || params.get('link-orig') || '',
  };
};

/**
 * Проверяет наличие всех необходимых параметров MikroTik
 * @param {Object} params - Параметры MikroTik
 * @returns {boolean} true если все параметры присутствуют
 */
export const validateMikroTikParams = (params) => {
  return Boolean(params.mac && params.ip && params.linkOrig);
};

/**
 * Форматирует MAC адрес для отображения
 * @param {string} mac - MAC адрес
 * @returns {string} Форматированный MAC адрес
 */
export const formatMacAddress = (mac) => {
  if (!mac) return '';
  return mac.toUpperCase();
};

/**
 * Хук для использования параметров MikroTik в компонентах
 */
import { useMemo } from 'react';

export const useMikroTikParams = () => {
  const params = useMemo(() => getMikroTikParams(), []);
  const isValid = useMemo(() => validateMikroTikParams(params), [params]);

  return {
    ...params,
    isValid,
    formattedMac: formatMacAddress(params.mac),
  };
};
