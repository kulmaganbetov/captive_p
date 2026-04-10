# Captive Portal Frontend

Современный, mobile-first фронтенд для Captive Portal Wi-Fi системы на базе React и Vite.

## Технологии

- **React 18** - UI библиотека
- **Vite** - Build tool и dev server
- **Tailwind CSS** - Utility-first CSS фреймворк
- **Framer Motion** - Библиотека для анимаций
- **Lucide React** - Современные иконки
- **React Router** - Клиентский роутинг

## Особенности

- 🎨 Apple-style дизайн (минимализм, закругленные углы, мягкие тени)
- 📱 Mobile-first подход (оптимизировано для смартфонов)
- ⚡ Быстрая загрузка и отзывчивый интерфейс
- 🎭 Плавные анимации при взаимодействии
- ✅ Валидация форм
- 🔒 Безопасная обработка платежей через FreedomPay
- 💳 Поддержка Visa и Mastercard

## Структура проекта

```
src/
├── components/          # React компоненты
│   ├── Header.jsx       # Шапка приложения
│   ├── Footer.jsx       # Футер
│   ├── PricingCard.jsx  # Карточка тарифа
│   └── PaymentForm.jsx  # Форма оплаты
├── pages/               # Страницы
│   ├── Home.jsx         # Главная страница
│   ├── Success.jsx      # Страница успешной оплаты
│   └── Fail.jsx         # Страница неудачной оплаты
├── utils/               # Утилиты
│   └── mikrotik.js      # Работа с параметрами MikroTik
├── App.jsx              # Главный компонент с роутингом
├── main.jsx             # Точка входа
└── index.css            # Глобальные стили
```

## Установка и запуск

### Требования

- Node.js >= 18.0.0
- npm или yarn

### Установка зависимостей

```bash
npm install
```

### Настройка окружения

Создайте файл `.env` на основе `.env.example`:

```bash
cp .env.example .env
```

**Frontend-only режим (по умолчанию):**

```env
VITE_DEMO_MODE=true
```

**Особенности:**
- ✅ Полностью frontend решение без бэкенда
- ✅ Симуляция платежного процесса
- ✅ Все страницы (Home, Success, Fail) полностью функциональны
- ✅ Имитируется задержка сети для реалистичности
- ✅ Никакие реальные платежи не производятся

**Для интеграции с реальным FreedomPay:**
- Требуется бэкенд для обработки платежей
- Информация о FreedomPay: https://freedompay.kz/
- Поддержка платежей: support@freedompay.kz

### Разработка

Запуск dev сервера:

```bash
npm run dev
```

Приложение будет доступно по адресу `http://localhost:3000`

### Production Build

```bash
npm run build
```

Результат сборки будет в папке `dist/`

### Предпросмотр production build

```bash
npm run preview
```

## Деплой на Vercel

### ⚠️ ВАЖНО: Настройка Environment Variables

Для базового использования никаких переменных окружения не требуется. Приложение работает в frontend-only режиме.

**Опциональные переменные:**
- `VITE_DEMO_MODE` = `true` (по умолчанию)

### Деплой через GitHub

1. Подключите репозиторий к Vercel
2. Vercel автоматически развернет приложение
3. Никаких дополнительных настроек не требуется

## Интеграция с MikroTik

Приложение автоматически извлекает параметры из URL:
- `mac` - MAC адрес устройства
- `ip` - IP адрес устройства
- `linkorig` - Оригинальный URL для редиректа

Пример URL от MikroTik:
```
https://your-domain.vercel.app/?mac=AA:BB:CC:DD:EE:FF&ip=10.0.0.1&linkorig=http://example.com
```

## Интеграция с платежной системой

Приложение использует платежную систему **FreedomPay** (https://freedompay.kz/).

### Frontend-only режим (текущая реализация)

В текущей версии приложение работает без бэкенда - платежи симулируются на фронтенде для демонстрации UI/UX.

### Интеграция с реальным FreedomPay

Для интеграции с реальной платежной системой FreedomPay требуется бэкенд со следующими возможностями:

### 1. Создание платежа

**POST** `/api/payment/create`

Request body:
```json
{
  "plan_id": "business",
  "plan_name": "Бизнес",
  "plan_duration": "3 часа",
  "plan_price": 500,
  "email": "user@example.com",
  "mac": "AA:BB:CC:DD:EE:FF",
  "ip": "10.0.0.1",
  "link_orig": "http://example.com"
}
```

Response (успех):
```json
{
  "success": true,
  "payment_url": "https://checkout.freedompay.kz/..."
}
```

Response (ошибка):
```json
{
  "error": "Error message"
}
```

**Важно:** Бэкенд должен:
- Создать запись платежа в БД
- Интегрироваться с FreedomPay API
- Вернуть URL для перенаправления пользователя на страницу оплаты FreedomPay
- Включить success_url и fail_url в параметры платежа

### 2. Подтверждение успешной оплаты

**GET** `/api/payment/success`

Query параметры от FreedomPay:
- `OutSum` - Сумма платежа
- `InvId` - ID платежа
- `SignatureValue` - Подпись для верификации
- `shp_email`, `shp_plan_name`, `shp_duration` - Пользовательские параметры

Response:
```json
{
  "success": true,
  "plan_name": "Бизнес",
  "duration": "3 часа",
  "email": "user@example.com"
}
```

**Важно:** Бэкенд должен:
- Проверить подпись (SignatureValue) для безопасности
- Обновить статус платежа в БД
- Предоставить доступ к Wi-Fi (разблокировать MAC адрес в MikroTik)
- Отправить чек на email пользователя

### 3. Обработка неудачной оплаты

**GET** `/api/payment/fail`

Query параметры от FreedomPay:
- `OutSum` - Сумма платежа
- `InvId` - ID платежа
- Пользовательские параметры

Response:
```json
{
  "success": false,
  "message": "Payment failed"
}
```

**Важно:** Бэкенд должен:
- Обновить статус платежа в БД (установить как "failed")
- Залогировать причину неудачи

### 4. Webhook (Server-to-Server callback)

**POST** `/api/payment/webhook`

FreedomPay отправляет POST запрос на этот URL после успешной оплаты для server-to-server подтверждения.

**Важно:**
- Этот callback критически важен для безопасности
- Должен проверять подпись платежа
- Должен обновлять статус платежа в БД
- Документация FreedomPay: https://freedompay.kz/

## Технические детали FreedomPay

### Безопасность платежей

FreedomPay обеспечивает:
- **PCI DSS 3.0** - стандарт безопасности данных платежных карт
- **3-D Secure** - дополнительная аутентификация держателя карты
- **SSL шифрование** - защита передачи данных
- Поддержка **Visa** и **Mastercard**

### Параметры Success URL

После успешной оплаты FreedomPay перенаправит пользователя на:
```
https://your-domain.vercel.app/success?OutSum=500&InvId=123&shp_email=...&shp_plan_name=...
```

### Параметры Fail URL

После неудачной оплаты:
```
https://your-domain.vercel.app/fail?OutSum=500&InvId=123&shp_email=...
```

### Пользовательские параметры

Приложение передает следующие параметры:
- `shp_email` - Email пользователя
- `shp_plan_name` - Название тарифа
- `shp_duration` - Длительность тарифа
- `shp_mac` - MAC адрес устройства
- `shp_ip` - IP адрес устройства

### Контакты FreedomPay

- Сайт: https://freedompay.kz/
- Поддержка: support@freedompay.kz

## Тарифные планы

По умолчанию доступны три тарифа:

1. **Старт** - 1 час, 200 ₸
2. **Бизнес** - 3 часа, 500 ₸ (популярный)
3. **Безлимит** - 24 часа, 1000 ₸

Редактировать тарифы можно в файле `src/pages/Home.jsx`

## Кастомизация

### Цветовая схема

Основной цвет можно изменить в `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Ваши цвета
      }
    }
  }
}
```

### Тайминги анимаций

Настройки Framer Motion находятся в компонентах. Пример:

```javascript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
```

## Лицензия

MIT
