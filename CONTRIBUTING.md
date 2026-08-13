# Contributing to eyeCARD

Спасибо, что рассматриваете вариант участия в eyeCARD! Вот несколько рекомендаций для начала.

## 🔧 Процесс разработки

### Подготовка к разработке

1. **Форк и клон репозитория**:
```bash
git clone https://github.com/YOUR_USERNAME/psychotype-radical-marketing-web.git
cd psychotype-radical-marketing-web
npm install
```

2. **Создайте feature branch**:
```bash
git checkout -b feature/your-feature-name
```

3. **Запустите dev сервер**:
```bash
npm run dev
```

### Стандарты кода

- **Язык**: TypeScript
- **Стиль**: ESLint + Prettier
- **Форматирование**: 2 spaces indent

### Перед коммитом

1. **Проверьте код**:
```bash
npm run lint          # Проверить синтаксис
npm run format        # Форматировать код
npm run test          # Запустить тесты
npm run build         # Собрать проект
```

2. **Коммитьте с осмысленными сообщениями**:
```bash
git commit -m "feat: add new feature"
git commit -m "fix: resolve issue #123"
git commit -m "docs: update README"
```

Используйте conventional commits:
- `feat:` для новых фичей
- `fix:` для исправления багов
- `docs:` для документации
- `style:` для стиля кода
- `refactor:` для рефакторинга
- `test:` для тестов
- `chore:` для вспомогательных изменений

### Откройте Pull Request

1. **Push ветку**:
```bash
git push origin feature/your-feature-name
```

2. **Создайте PR** на GitHub с описанием изменений

3. **Дождитесь review** и CI/CD проверок

## 📋 Правила

- Все ветки должны содержать работающий код
- Pull requests должны содержать описание изменений
- Обновляйте CHANGELOG.md с вашими изменениями
- Пишите тесты для новых фичей

## 🐛 报告багов

При обнаружении бага создайте Issue с:
- Описанием проблемы
- Шагами для воспроизведения
- Ожидаемым поведением
- Фактическим поведением
- Версией Node.js и браузера (если применимо)

## ❓ Вопросы?

Создавайте Discussions в репозитории для вопросов и обсуждений.

## Спасибо! 🎉

Ваш вклад помогает улучшить eyeCARD для всех!
