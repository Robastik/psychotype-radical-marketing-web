# Deployment Guide

## 📋 Pre-Deployment Checklist

Перед каждым deployment должны быть выполнены эти скрипты (в порядке):

```bash
# 1. Проверка кода
npm run lint

# 2. Запуск тестов
npm test

# 3. Сборка для production
npm run build

# 4. Проверка выходных данных
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

## 🚨 Troubleshooting

### Build fails
```bash
npm run build  # Запустить локально и увидеть ошибку
npm run lint:fix  # Исправить auto-fixable проблемы
```

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
