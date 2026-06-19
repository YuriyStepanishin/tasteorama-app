# Tasteorama

## Про проєкт

**Tasteorama** — fullstack вебзастосунок для роботи з кулінарними рецептами. Frontend побудований на Next.js, backend — окремий REST API ([tasteorama-server](https://github.com/BogdanJanchenko/tasteorama-server)).

### Що вміє застосунок

- **Перегляд рецептів** — список страв на головній сторінці з картками (фото, назва, час, опис, калорії).
- **Пошук і фільтри** — за назвою, категорією та інгредієнтом.
- **Детальна сторінка рецепта** — повна інформація: інгредієнти з кількістю, інструкція, категорія, час приготування.
- **Обране** — авторизований користувач може зберігати рецепти в favourites.
- **Особистий кабінет** — власні рецепти та список обраного (`/profile/own`, `/profile/favorites`).
- **Додавання рецепта** — форма з валідацією, вибором категорії, інгредієнтів і завантаженням фото.
- **Реєстрація та вхід** — авторизація через backend API.

### Яку задачу вирішує

Проєкт об'єднує в одному інтерфейсі **пошук, перегляд, збереження та створення** рецептів — щоб користувачу не доводилось шукати страви в різних місцях або вести записи окремо. Це зручне рішення для тих, хто готує вдома і хоче швидко знаходити ідеї страв, фільтрувати їх за інгредієнтами та зберігати улюблені рецепти.

## Технології

- **Next.js** (App Router)
- **React**, **TypeScript**
- **CSS Modules**, **modern-normalize**
- **TanStack Query** — робота з серверними даними
- **Zustand** — клієнтський стан
- **Formik** + **Yup** — форми та валідація
- **Axios** — HTTP-запити
- **react-hot-toast** — сповіщення

Backend проєкту: [tasteorama-server](https://github.com/BogdanJanchenko/tasteorama-server)

## Як запустити проєкт

### Передумови

- [Node.js](https://nodejs.org/) (LTS)
- Запущений backend API (локально або на Render)

### 1. Клонування репозиторію

```bash
git clone https://github.com/BogdanJanchenko/tasteorama-app.git
cd tasteorama-app
```

### 2. Встановлення залежностей

```bash
npm install
```

### 3. Налаштування змінних оточення

Створіть файл `.env.local` на основі `.env.example`:

```bash
cp .env.example .env.local
```

Для локальної розробки:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

> Backend за замовчуванням працює на порту `3000`. Якщо порти конфліктують, запустіть frontend на іншому порту: `npm run dev -- -p 3001`.

### 4. Запуск у режимі розробки

```bash
npm run dev
```

Відкрийте [http://localhost:3000](http://localhost:3000) у браузері (або порт, який ви вказали).

### Інші команди

```bash
npm run build   # збірка для продакшну
npm run start   # запуск зібраного проєкту
npm run lint    # перевірка коду
```

## Як розгорнути проєкт

1. Зберіть проєкт: `npm run build`
2. Запустіть: `npm run start`
3. У змінних оточення на хостингу вкажіть:

```env
NEXT_PUBLIC_API_URL=https://tasteorama-server.onrender.com
```

> **Важливо:** `NEXT_PUBLIC_API_URL` — це базова адреса API, а не сторінка документації.  
> Наприклад, запити йдуть на `https://tasteorama-server.onrender.com/api/recipes`.

## Команда

- [Bogdan Janchenko](https://github.com/BogdanJanchenko) - Team Lead
- [Daria Golovashova](https://github.com/DariaGolovashova) - Scrum Master
- [Vitalina Sinkova](https://github.com/Vitalina90)
- [Yuriy Stepanishin](https://github.com/YuriyStepanishin)
- [Tetiana Furmanets](https://github.com/tetiana-furmanets)
- [Natan Diachuk](https://github.com/d-natan)
- [Serhii Muzalevskyi](https://github.com/muzal57)
- [Yevhenii Shevchenko](https://github.com/Yevhenii-Shevchenko)
- [Marta](https://github.com/mdarntl-code)
- [Dima Kaznadiy](https://github.com/Dima-Kaznadiy)
- [Mykola Gumeniuk](https://github.com/GumeniukMykolaMyhailovych)
- [Diana Harrison](https://github.com/HarrisonDiana)

## Супутня інформація

- [Макет у Figma](https://www.figma.com/design/ktViLr1e38fGcw5Z1WU1dQ/Tasteorama?node-id=6-39&p=f&t=vtfZNZyyTnrFMqsU-0)
- [Backend-репозиторій](https://github.com/BogdanJanchenko/tasteorama-server)
- [Swagger API (документація backend)](https://tasteorama-server.onrender.com/api-docs/)
- Продакшн API: `https://tasteorama-server.onrender.com`
