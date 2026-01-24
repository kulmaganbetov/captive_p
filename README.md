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
- 🔒 Безопасная обработка платежей через Robokassa KZ
- 💳 Поддержка различных способов оплаты

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
│   ├── mikrotik.js      # Работа с параметрами MikroTik
│   └── robokassa.js     # Утилиты для Robokassa
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

**Для тестирования БЕЗ бэкенда (Demo Mode):**

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_DEMO_MODE=true

# Robokassa Test Credentials (получите в личном кабинете)
VITE_ROBOKASSA_LOGIN=your_test_login
VITE_ROBOKASSA_PASSWORD1=your_test_password_1
VITE_ROBOKASSA_PASSWORD2=your_test_password_2
```

**Как получить тестовые креденшиалы Robokassa:**
1. Зарегистрируйтесь на https://auth.robokassa.kz
2. Войдите в личный кабинет
3. Перейдите в раздел "Технические настройки"
4. Включите "Тестовый режим"
5. Выберите алгоритм хеширования **SHA256** (важно!)
6. **⚠️ КРИТИЧНО: Настройте URL для перенаправления:**
   - **Success URL**: `https://ваш-домен.vercel.app/success`
   - **Fail URL**: `https://ваш-домен.vercel.app/fail`
   - **Result URL**: URL вашего бэкенда (опционально)
7. Скопируйте MerchantLogin, Password#1 и Password#2
8. Вставьте их в файл `.env` или в Environment Variables на Vercel

**В демо-режиме:**
- ✅ Оплата работает без реального бэкенда
- ✅ Перенаправление на **настоящую тестовую форму Robokassa**
- ✅ Используется SHA256 для генерации подписи платежа
- ✅ Все страницы (Home, Success, Fail) полностью функциональны
- ✅ Можно протестировать весь UI и UX с реальной платежной системой
- ✅ Имитируется задержка сети для реалистичности

**Важно:** Демо-режим использует тестовую среду Robokassa, никакие реальные деньги не списываются.

**Для продакшена с реальным бэкендом:**

```env
VITE_API_BASE_URL=https://your-backend-api.com
VITE_DEMO_MODE=false
```

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

Перед деплоем обязательно настройте переменные окружения в Vercel:

1. Откройте ваш проект на Vercel
2. Перейдите в **Settings** → **Environment Variables**
3. Добавьте следующие переменные:

**Для демо-режима (тестирование):**
- `VITE_DEMO_MODE` = `true`
- `VITE_ROBOKASSA_LOGIN` = ваш тестовый логин из Robokassa
- `VITE_ROBOKASSA_PASSWORD1` = ваш Password#1 из Robokassa
- `VITE_ROBOKASSA_PASSWORD2` = ваш Password#2 из Robokassa

**Для продакшена (с бэкендом):**
- `VITE_DEMO_MODE` = `false`
- `VITE_API_BASE_URL` = URL вашего бэкенда

4. После добавления переменных нажмите **Redeploy** проекта

**⚡ Важно:** В Vite переменные читаются во время сборки, поэтому после изменения env vars нужно обязательно пересобрать проект!

### Деплой через GitHub

1. Подключите репозиторий к Vercel
2. Настройте Environment Variables (см. выше)
3. Vercel автоматически развернет приложение
4. После деплоя **обязательно добавьте** Success URL и Fail URL в личном кабинете Robokassa

## Интеграция с MikroTik

Приложение автоматически извлекает параметры из URL:
- `mac` - MAC адрес устройства
- `ip` - IP адрес устройства
- `linkorig` - Оригинальный URL для редиректа

Пример URL от MikroTik:
```
https://your-domain.vercel.app/?mac=AA:BB:CC:DD:EE:FF&ip=10.0.0.1&linkorig=http://example.com
```

## API Backend

Приложение интегрирован с платежной системой **Robokassa KZ** и требует следующие endpoints:

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
  "payment_url": "https://auth.robokassa.kz/Merchant/Index.aspx?MerchantLogin=...&OutSum=500&..."
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
- Сгенерировать подпись (signature) для Robokassa
- Вернуть URL для перенаправления пользователя на страницу оплаты Robokassa
- Включить success_url и fail_url в параметры Robokassa

### 2. Подтверждение успешной оплаты

**GET** `/api/payment/success`

Query параметры от Robokassa:
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

Query параметры от Robokassa:
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

### 4. Result URL (Server-to-Server callback)

**POST** `/api/payment/result`

Robokassa отправляет POST запрос на этот URL после успешной оплаты для server-to-server подтверждения.

Query/POST параметры:
- `OutSum` - Сумма платежа
- `InvId` - ID платежа
- `SignatureValue` - Подпись для верификации

Response:
```
OK{InvId}
```

**Важно:**
- Этот callback критически важен для безопасности
- Должен проверять подпись и обновлять статус платежа
- Должен возвращать `OK{InvId}` в случае успеха

## Интеграция с Robokassa KZ

### Алгоритм хеширования

Приложение использует **SHA256** для генерации подписи платежа (SignatureValue).

**Формула подписи для запроса оплаты (с shp_ параметрами):**
```
SHA256(MerchantLogin:OutSum:InvId:Password#1:shp_duration=value:shp_email=value:shp_ip=value:shp_mac=value:shp_plan_name=value)
```

**Формула подписи для Success URL (с shp_ параметрами):**
```
SHA256(OutSum:InvId:Password#1:shp_duration=value:shp_email=value:shp_ip=value:shp_mac=value:shp_plan_name=value)
```

**Формула подписи для Result URL (с shp_ параметрами):**
```
SHA256(OutSum:InvId:Password#2:shp_duration=value:shp_email=value:shp_ip=value:shp_mac=value:shp_plan_name=value)
```

**⚠️ ВАЖНО:**
- В личном кабинете Robokassa выберите алгоритм хеширования **SHA256**
- При использовании дополнительных параметров (shp_*), они **ОБЯЗАТЕЛЬНО** должны быть включены в формулу подписи
- shp_ параметры должны быть отсортированы **в алфавитном порядке**
- Пустые значения тоже должны быть включены (например, `shp_ip=` если IP пустой)

### Параметры Success URL

После успешной оплаты Robokassa перенаправит пользователя на:
```
https://your-domain.vercel.app/success?OutSum=500&InvId=123&SignatureValue=...&shp_email=...&shp_plan_name=...
```

### Параметры Fail URL

После неудачной оплаты:
```
https://your-domain.vercel.app/fail?OutSum=500&InvId=123&shp_email=...
```

### Пользовательские параметры (shp_*)

Приложение использует следующие кастомные параметры для передачи через Robokassa:
- `shp_email` - Email пользователя
- `shp_plan_name` - Название тарифа
- `shp_duration` - Длительность тарифа
- `shp_mac` - MAC адрес устройства
- `shp_ip` - IP адрес устройства
- `shp_link_orig` - Оригинальный URL для редиректа

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
