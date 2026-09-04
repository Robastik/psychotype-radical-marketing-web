# Deployment Guide

## 📋 Pre-Deployment Checklist

Перед каждым deployment должны быть выполнены эти скрипты (в порядке):

```bash
# 1. Проверка кода
npm run lint

# 2. Перегенерация данных справочника
npm run build:guide

# 3. Запуск тестов
npm test

# 4. Сборка для production
npm run build

# 5. Проверка выходных данных
ls -la out/
```

## 🚀 Основной скрипт перед deployment

```bash
npm run build
```

**Этот скрипт:**
- ✓ Компилирует TypeScript
- ✓ Оптимизирует React компоненты
- ✓ Генерирует статические файлы в папку `out/`
- ✓ Выполняет проверку ошибок TypeScript
- ✓ Использует Turbopack для быстрой сборки
- ✓ Генерирует данные методического справочника из Markdown (`build:guide`)

## 🔄 Автоматический workflow (GitHub Actions)

При push в `master` ветку автоматически:

1. **Test Job** (матрица для Node 18 и 20):
   ```bash
   npm ci
   npm run lint
   npm test --coverage
   npm run build
   ```

2. **Deploy Job** (только если test job успешен):
   ```bash
   npm ci
   npm run lint
   npm run build
   npm run deploy  # Deployment на Firebase
   ```

## 🔐 Настройка Firebase Deployment

Перед первым deployment нужно:

1. **Получить Firebase Token**:
```bash
npm install -g firebase-tools
firebase login:ci
# Скопируйте токен
```

2. **Добавить в GitHub Secrets**:
   - Перейдите: Settings → Secrets and variables → Actions
   - Создайте `FIREBASE_TOKEN` с полученным токеном

3. **Убедиться в .firebaserc**:
```json
{
  "projects": {
    "default": "your-firebase-project-id"
  }
}
```

## 🌍 Переменные окружения

Убедитесь, что `.env.local` содержит:
```
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NODE_ENV=production
```

## 📦 Локальное развертывание

Для тестирования перед push:

```bash
# 1. Сборка
npm run build

# 2. Предварительный просмотр
firebase emulators:start --import=seed.json

# 3. Деплой
firebase deploy --only hosting
```

## ✅ Проверка deployment

После deployment проверьте:

```bash
# 1. Просмотр последних deployments
firebase hosting:channel:list

# 2. Просмотр логов
firebase functions:log

# 3. Откатить к предыдущей версии
firebase hosting:clone production staging
```

## 🔥 Firebase Rewrites and Special Routes

`firebase.json` contains the rewrites used by Firebase Hosting. The following rules are required for the site to work correctly:

### `/verify?id=<uuid>` — Visual Passport public link

Next.js static export (`output: "export"`) emits the `/verify` route as a single file:

```text
out/verify.html
```

Firebase Hosting does **not** automatically serve `verify.html` for the path `/verify`. Therefore `firebase.json` must contain:

```json
{
  "source": "/verify/**",
  "destination": "/verify.html"
},
{
  "source": "/verify",
  "destination": "/verify.html"
}
```

This ensures that URLs like `https://eyecard.ru/verify?id=...` load the Visual Passport page and the query parameter is preserved for the client-side code (`useSearchParams`).

### `cleanUrls` — обязательная настройка для всех маршрутов

Next.js static export (`output: "export"`, без `trailingSlash`) генерирует **плоские `.html` файлы**:

```text
out/guide.html
out/methodology.html
out/privacy.html
out/terms.html
out/en/privacy.html
out/guide/<code>.html      # ~99 динамических страниц
```

Одноимённые директории (`out/guide/`, `out/verify/` и т.д.) содержат только внутренние `.txt`-метаданные Next.js — **без `index.html`**.

Firebase Hosting по умолчанию для URL `/guide` ищет файл `out/guide`, затем `out/guide/index.html` — ни того, ни другого нет → **404 при прямом открытии страницы или при обновлении (F5)**.

Поэтому в `firebase.json` обязательно должна быть настройка:

```json
{
  "hosting": {
    "cleanUrls": true
  }
}
```

С `cleanUrls: true` Firebase для URL без расширения отдаёт одноимённый `.html`-файл: `/guide` → `guide.html`, `/guide/I.1.1` → `guide/I.1.1.html`, `/en/privacy` → `en/privacy.html`.

Do **not** add a catch-all rewrite like `"source": "**", "destination": "/index.html"`, because it would override all routes and always return the home page.

### `/guide/<code>` — Methodical guide pages

См. секцию `cleanUrls` выше: страницы генерируются как `out/guide/<code>.html` и отдаются автоматически благодаря `cleanUrls: true`. Rewrites для `/guide` не нужны.

## 🚨 Troubleshooting

### Build fails
```bash
npm run build       # Запустить локально и увидеть ошибку
npm run build:guide # Проверить генерацию данных справочника
npm run lint:fix    # Исправить auto-fixable проблемы
```

### Guide build fails
```bash
npm run build:guide # Перегенерировать данные справочника
```

Возможные причины:
- Синтаксическая ошибка в Markdown-файле `docs/reference/Tasks/`
- Дублирующийся или некорректный код документа
- Отсутствующий файл в `.gitignore` для сгенерированных данных

### Deployment fails
```bash
firebase login:ci  # Переаутентифицировать
firebase deploy --debug  # Увидеть детальные логи
```

### Out of date packages
```bash
npm audit fix
npm run build  # Пересобрать
```

## 📊 CI/CD Status Badge

Добавьте в README.md:

```markdown
[![CI/CD](https://github.com/Robastik/psychotype-radical-marketing-web/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/Robastik/psychotype-radical-marketing-web/actions)
```

---

## 📚 Полезные ссылки

- [Next.js Production Deployment](https://nextjs.org/docs/pages/building-your-application/deploying)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
