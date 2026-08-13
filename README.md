# eyeCARD — Нейромаркетинговый аудит дизайна карточек товаров

**eyeCARD** — это аналитическая AI-платформа для аудита визуального дизайна товаров на маркетплейсах (Wildberries, Ozon и др.). Платформа использует нейромаркетинговый подход, анализируя визуальный код через 4 семантические оси позиционирования, архетипы Юнга и 7 психологических радикалов.

**Сайт для eyecard.ru**

## 🚀 Быстрый старт

### Требования
- Node.js 18.17+ 
- npm 9+

### Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/Robastik/psychotype-radical-marketing-web.git
cd psychotype-radical-marketing-web
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл `.env.local` (см. `.env.example`):
```bash
cp .env.example .env.local
```

4. Запустите сервер разработки:
```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## 📁 Структура проекта

```
psychotype-radical-marketing-web/
├── src/app/
│   ├── layout.tsx          # Главный layout с метаданными
│   ├── page.tsx            # Главная страница
│   ├── globals.css         # Глобальные стили (CSS переменные)
│   ├── page.module.css     # Стили для главной страницы
│   ├── methodology/        # Страница методологии
│   ├── privacy/            # Политика конфиденциальности
│   └── terms/              # Условия использования
├── public/                 # Статические файлы (изображения, иконки)
├── firebase.json           # Конфигурация Firebase Hosting
├── .firebaserc             # Firebase проекты
├── next.config.ts          # Конфигурация Next.js
├── tsconfig.json           # TypeScript конфигурация
├── eslint.config.mjs       # ESLint конфигурация
└── package.json            # Зависимости и скрипты
```

## 📦 Доступные скрипты

- `npm run dev` — Запуск сервера разработки
- `npm run build` — Сборка для production
- `npm start` — Запуск production сервера
- `npm run lint` — Проверка кода ESLint

## 🎨 Дизайн и стили

Проект использует современный CSS с переменными (CSS Custom Properties). Все цвета определены в формате OKLCH для лучшей читаемости и консистентности.

**Основные CSS переменные** (см. `src/app/globals.css`):
- `--primary` — основной цвет (Cobalt Blue)
- `--accent` — цвет акцента (Focus Orange)
- `--bg-primary` — фон
- `--text-primary` — основной текст
- `--text-muted` — приглушённый текст

## 🔥 Firebase Hosting

Проект готов к развертыванию на Firebase Hosting.

### Развертывание:
```bash
npm run build
firebase deploy
```

## 🧪 Тестирование

```bash
npm test
```

## 📝 Документация

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🤝 Как участвовать

1. Fork репозиторий
2. Создайте ветку для вашей фичи (`git checkout -b feature/AmazingFeature`)
3. Коммитьте изменения (`git commit -m 'Add AmazingFeature'`)
4. Push в ветку (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📄 Лицензия

Проприетарное ПО. Все права защищены © 2026 eyeCARD.

## ❓ Поддержка

При возникновении вопросов создавайте Issues в репозитории GitHub.
