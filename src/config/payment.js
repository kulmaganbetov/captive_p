// FreedomPay payment configuration
// Docs: https://docs.freedompay.kz/

export const FREEDOMPAY_CONFIG = {
  // Merchant ID - получите в личном кабинете FreedomPay
  merchantId: import.meta.env.VITE_FREEDOMPAY_MERCHANT_ID || 'MERCHANT_ID',

  // Валюта платежа
  currency: 'KZT',

  // Тестовый режим (1 - включен, 0 - выключен)
  testMode: import.meta.env.VITE_FREEDOMPAY_TEST_MODE !== 'false' ? 1 : 0,

  // URL для перенаправления
  successUrl: '/success',
  failureUrl: '/failure',

  // Описание по умолчанию
  defaultDescription: 'Оплата заказа',
};

// Тестовые суммы для тестовой страницы оплаты
export const TEST_AMOUNTS = [
  { value: 100, label: '100 ₸' },
  { value: 500, label: '500 ₸' },
  { value: 1000, label: '1000 ₸' },
];

// Генерация уникального order_id
export const generateOrderId = () => `order_${Date.now()}`;
