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
- 🔒 Безопасная обработка платежей

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
│   └── Success.jsx      # Страница успешной оплаты
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

Укажите URL вашего Django бэкенда:

```env
VITE_API_BASE_URL=https://your-backend-api.com
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

1. Установите Vercel CLI (опционально):
```bash
npm i -g vercel
```

2. Деплой через GitHub:
   - Подключите репозиторий к Vercel
   - Добавьте переменную окружения `VITE_API_BASE_URL` в настройках проекта
   - Vercel автоматически развернет приложение

3. Или используйте CLI:
```bash
vercel --prod
```

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

Приложение ожидает следующий endpoint:

**POST** `/api/payment/create`

Request body:
```json
{
  "plan_id": "business",
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
  "message": "Payment successful"
}
```

Response (ошибка):
```json
{
  "error": "Error message"
}
```

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
