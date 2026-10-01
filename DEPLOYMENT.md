# Deployment Guide

## ⚠️ ВАЖНО: Архитектура деплоя Web

### Автоматический деплой через отдельный репозиторий

**Репозиторий для деплоя:** `Robastik/psychotype-radical-marketing-web`  
**Основной репозиторий:** `Robastik/psychotype-radical-marketing`

**Ключевые факты:**
- Web деплоится из **отдельного репозитория** `psychotype-radical-marketing-web`
- Этот репозиторий должен поддерживаться в **актуальном состоянии** (синхронизирован с основным)
- **Время деплоя:** 30+ минут (100+ страниц Next.js)
- **Default branch:** `master` (НЕ `main`!)
- **Триггер:** Push в ветку `master` (или `develop`) репозитория `psychotype-radical-marketing-web`
- **Механизм:** GitHub Actions → Firebase Hosting

### Стандартный workflow

```bash
# 1. Внести изменения в web/ в основном репо
cd C:\Users\Salice\consumer-behavior
# ... внести изменения в web/ ...

# 2. Скопировать изменения в worktree
cd C:\Users\Salice\referral-feature
cp -r C:\Users\Salice\consumer-behavior\web\* web/

# 3. Закоммитить
git add .
git commit -m "feat(web): описание изменений"

# 4. Push в web репозиторий (запускает автодеплой)
# ВАЖНО: push в master, НЕ в main!
git push web-remote <branch>:master

# 5. GitHub Actions автоматически задеплоит (30+ минут)
# Проверить статус: https://github.com/Robastik/psychotype-radical-marketing-web/actions
```

### Ручной деплой Backend (ТОЛЬКО для особых случаев)

**Команда:** `gcloud run deploy eyecard-api --source .` (из директории `backend/`)

**Правило:** Может использоваться **ТОЛЬКО** в особых случаях, для которых штатный автодеплой не решает поставленные цели и это **явно и однозначно подтверждено пользователем**.

**Штатный механизм:** Backend деплоится автоматически через Cloud Build при push в `main` ветку основного репозитория.

**Почему ограничение:**
- Ручной деплой может привести к рассинхронизации с CI/CD
- Автодеплой обеспечивает воспроизводимость и отслеживаемость
- Ручной деплой должен быть исключением, а не правилом

---

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

# 4.5 (выполняется автоматически в конце build) Подготовка OG-базы для Firebase Function:
#     out/verify.html → functions/verify_base.html
#     это хук build:og-base = node scripts/prepare-og-base.mjs; отдельно запускать не нужно

# 5. Проверка выходных данных
ls -la out/
ls -la functions/verify_base.html   # обязательно — без него ssrVerifyPage отдаёт 500
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
- ✓ Копирует `out/verify.html` → `functions/verify_base.html` (хук `build:og-base`, `scripts/prepare-og-base.mjs`) — база для SSR OG-тегов

## 🔄 Автоматический workflow (GitHub Actions)

**Репозиторий:** `Robastik/psychotype-radical-marketing-web`  
**Время выполнения:** 30+ минут (100+ страниц Next.js)

При push в `master` (или `develop`) ветку репозитория `psychotype-radical-marketing-web` автоматически:

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
   npm run deploy  # Deployment на Firebase Hosting
   ```

**Проверка статуса деплоя:**
- URL: https://github.com/Robastik/psychotype-radical-marketing-web/actions
- Время: обычно 30-40 минут для полного деплоя

**Примечание:** Репозиторий `psychotype-radical-marketing-web` — это **отдельный репозиторий**,专门用于 web деплоя. Он должен синхронизироваться с основным репозиторием `psychotype-radical-marketing` через worktree.

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

# 3.1 Если менялась Firebase Function (functions/ В КОРНЕ репо, не web/functions/) —
#     деплоить вместе:
firebase deploy --only hosting,functions
```

## ⚡ Firebase Functions — ssrVerifyPage (OG-теги для /verify)

**Назначение:** `/verify?id=<uuid>` отдаётся функцией `ssrVerifyPage` (us-central1), которая
фетчит `https://eyecard-api-634368981577.us-central1.run.app/api/v1/analysis/public/{id}`
и инъецирует OG-теги (`og:title`, `og:description`, `og:image` на OG-картинку 1200×630 из GCS)
перед `<meta name="next-size-adjust" content=""/>`. Клиентская гидратация SPA не затрагивается.

**Build-артефакт:** `functions/verify_base.html` — копия `out/verify.html`, создаётся
автоматически в конце `npm run build` хуком `build:og-base` (`scripts/prepare-og-base.mjs`).
Файл **не коммитится** (см. `functions/.gitignore`). Перед деплоем проверить:
```bash
ls -la functions/verify_base.html
```

**Почему артефакт, а не исходник.** Next.js хэширует имена чанков и шрифтов на каждую сборку,
поэтому закоммиченный снапшот неизбежно устаревает и начинает ссылаться на несуществующие
`/_next/static/*`. 2026-09-30 это сломало авто-доставку отчётов
(job `728cdf6e-09e5-4cbe-a3cb-e17c4d0fb18c`): гидрация не проходила, маркер `#passport-report`
не появлялся, `report_service.py` падал по таймауту, а `ShareService` возвращал монеты,
так и не отправив сообщение в Telegram.

Шаг CI `Verify verify_base.html came from this build` **сверяет** базу с `out/verify.html`
через `cmp` и роняет сборку при расхождении. Он намеренно не копирует файл сам: иначе
отвязавшийся от `npm run build` хук остался бы незамеченным, а дефект всплыл только в проде.

**Поведение при сбоях** (важно: `/verify` — это та же страница, которую рендерит Playwright
для графической копии отчёта, поэтому провал загрузки обрывает доставку):

| Ситуация | Ответ | Почему так |
|---|---|---|
| база не читается | `500` + `Cache-Control: no-store` | отдавать нечего; `report_service.py:142` диагностирует явный 500 как `[STAGE:page_load]` за ~1 с вместо трёх непрозрачных таймаутов по 30 с |
| якорь инъекции не найден | `200`, база **без изменений** | Next.js сменил формат `<head>`, но страница валидна и гидратируема: доставка продолжается, деградирует только превью |
| API недоступен / id невалиден / анализ не `completed` | `200`, дефолтные OG-теги брендинга | превью остаётся, просто без привязки к товару |
| в Firestore нет `og_image_url` | `og:image` = прокси-фото товара с бэкенда | картинка в превью сохраняется |

Отличить ветку по ответу: настоящие данные дают **8** тегов `og:` и **4** `twitter:` включая
`og:image`; fallback — **5** `og:` и **1** `twitter:` без `og:image` вовсе.

**Кэш:** `Cache-Control: public, max-age=0, s-maxage=86400` — CDN-кэш сутки, краулер Telegram
не долбит функцию повторно.

**Деплой:**
```bash
firebase deploy --only hosting,functions
```

**Проверка после деплоя:**
```bash
# 1. Роутинг действительно переключился (см. признаки выше: s-maxage, нет Last-Modified)
curl -sI "https://eyecard.ru/verify?id=<реальный_job_id>" | grep -iE 'cache-control|last-modified'

# 2. Теги инжектированы и это не fallback
curl -s "https://eyecard.ru/verify?id=<реальный_job_id>" | grep -o 'og:[^>]*' | head -10
curl -s "https://eyecard.ru/verify?id=<несуществующий>" | grep -o 'og:title[^>]*'

# 3. Главное — ЦЕЛОСТНОСТЬ АССЕТОВ: база функции обязана ссылаться только на
#    существующие файлы. Именно этот тест ловит устаревшую базу; размер HTML его
#    не ловит, потому что длина хэшей постоянна и размер от сборки к сборке не меняется.
curl -s "https://eyecard.ru/verify?id=<реальный_job_id>" \
  | grep -oE '/_next/static/[^"'"'"' )]+\.(js|css)' | sort -u \
  | while read -r a; do
      printf '%s %s\n' "$(curl -s -o /dev/null -w '%{http_code}' "https://eyecard.ru$a")" "$a"
    done | grep -v '^200' || echo 'ассеты целы'
```

**Требования:** тариф Blaze; при первом деплое firebase-tools сам включает нужные API
(cloudfunctions.googleapis.com, cloudbuild.googleapis.com, artifactregistry.googleapis.com).

**Права сервисного аккаунта для деплоя из CI.** Это неочевидно и стоило трёх проваленных
прогонов: Firebase сообщает об отсутствующем праве **по одному за раз**, поэтому чинить
приходится итерациями. Аккаунту GitHub Actions
`github-action-1332955876@consumer-behavior-card.iam.gserviceaccount.com` нужны
на уровне проекта:

```text
roles/cloudfunctions.developer
roles/cloudbuild.builds.editor
roles/artifactregistry.writer
roles/run.developer
```

и, отдельно, `roles/iam.serviceAccountUser` **с областью на конкретные сервисные аккаунты**
(право `iam.serviceAccounts.actAs`), на обе:

```text
consumer-behavior-card@appspot.gserviceaccount.com            # её CLI называет в preflight
634368981577-compute@developer.gserviceaccount.com            # на ней реально работает gen2
```

Вторая — источник неочевидной ошибки: функция уже успевает загрузиться
(`functions source uploaded successfully`), и только затем падает `403 actAs` на compute-аккаунте.

Проверять выдачу нужно **чтением политики обратно**, а не кодом возврата команды:

```bash
gcloud projects get-iam-policy consumer-behavior-card \
  --flatten='bindings[].members' \
  --filter='bindings.role:roles/iam.serviceAccountUser' \
  --format='value(bindings.role,bindings.members,bindings.condition)'
```

## 🔙 Откат OG-миграции (Stage 3: ссылка вместо PNG)

Если нужно вернуть отправку PNG/PDF вместо ссылки:

1. **`backend/app/services/telegram_service.py`:**
   - Раскомментировать блок `# OG-MIGRATION: commented for rollback` в `send_report_to_user`
   - Удалить новую логику `send_message` со ссылкой в `send_report_to_user` (вернуть `send_photo` + `send_media_group` + `send_message`)
   - В `send_report_to_user` убрать параметр `job_id` (вернуть только `chat_id, artifact`)
   - Аналогично в `send_report_to_channel`: раскомментировать `send_photo` + `send_document`, вернуть сигнатуру `(png_bytes, marketplace, sku)`

2. **`backend/app/services/channel_broadcast_service.py`:**
   - Вернуть параметр `image_bytes: bytes` в `maybe_broadcast`
   - Вернуть извлечение `marketplace`/`sku` и вызов `telegram_service.send_report_to_channel(image_bytes, marketplace, sku)`

3. **`backend/app/services/share_service.py`:**
   - Переместить `generate_and_upload_og_image` обратно ПОСЛЕ отправки (в try/except после `release_delivery_lock`)
   - Убрать `job_id` из вызова `telegram_service.send_report_to_user`
   - Вернуть `image_bytes` в вызов `channel_broadcast_service.maybe_broadcast`

4. **Деплой:** `gcloud run deploy eyecard-api --source .` (из `backend/`)

OG-инфраструктура (Stage 1+2: GCS-картинка, `ssrVerifyPage`, OG-теги) **не удаляется** — она используется и при отправке ссылки (Stage 3), и может быть использована для будущего возврата.

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

### `/verify?id=<uuid>` — Visual Passport public link + SSR OG-теги

Next.js static export (`output: "export"`) emits the `/verify` route as a single file:

```text
out/verify.html
```

Firebase Hosting does **not** automatically serve `verify.html` for the path `/verify`. URL `/verify?id=...`
обслуживается **Firebase Function `ssrVerifyPage`** (rewrite в `firebase.json`, см. секцию
«Firebase Functions» выше) — она отдаёт тот же статический HTML плюс динамические OG-теги
для краулеров (Telegram, соцсети). Query-параметр `id` сохраняется для клиентского кода
(`useSearchParams`), SPA гидратируется как раньше.

#### Почему нужны ОБА изменения: и rewrite, и `hosting.ignore`

Firebase Hosting разбирает запрос в фиксированном порядке:

```text
redirects → ТОЧНОЕ СОВПАДЕНИЕ ФАЙЛА → rewrites → 404
```

Статический файл **выигрывает** у rewrite. При `cleanUrls: true` запрос `/verify` совпадает с
загруженным `verify.html`, поэтому одного rewrite недостаточно — до него просто не дойдёт.
Отсюда `"verify.html"` в `hosting.ignore`: файл не загружается, совпадения нет, и запрос
проходит дальше, до rewrite.

Симптом, что забыт именно `ignore`: страница отвечает 200, но это статика —
`Cache-Control: max-age=3600`, присутствует `Last-Modified`, ноль тегов
`<meta property="og:*">`, размер ~9340 байт вместо ~10494. Деплой при этом проходит
«успешно», поэтому в CI дефект не виден. Так и случилось 2026-09-30: правку внесли в
`web/firebase.json`, а CI деплоит корневой `firebase.json`.

Признаки, что запрос обслуживает функция: `Cache-Control: public, max-age=0, s-maxage=86400`,
`Last-Modified` отсутствует, 8 тегов `og:` и 4 `twitter:`.

⚠️ **Откат на статику** (если функция недоступна). Заменить rewrites **недостаточно** — нужно
вернуть файл в hosting, иначе rewrite упрётся в 404:

1. убрать `"verify.html"` из `hosting.ignore`;
2. заменить оба правила на `{ "source": "/verify/**", "destination": "/verify.html" }`
   и `{ "source": "/verify", "destination": "/verify.html" }`;
3. `firebase deploy --only hosting` — быстрый путь, ~1 мин, если `out/` уже собран;
   либо commit + push и дождаться CI (~30 мин).

Порядок шагов в `ci-cd.yml` — functions **до** hosting — означает, что при провале деплоя
функций hosting не задеплоится вовсе и прод останется на предыдущей рабочей версии.

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
