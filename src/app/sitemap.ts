import type { MetadataRoute } from 'next';
import { execSync } from 'child_process';
import { getAllGuideCodes, guideData } from '@/app/guide/data/guide-data';

export const dynamic = 'force-static';

const baseUrl = 'https://eyecard.ru';

/**
 * lastmod по git-истории, а не по времени сборки.
 *
 * Раньше все 129 URL получали один и тот же `new Date()` — то есть на каждом
 * деплое весь сайт объявлял себя обновлённым целиком. Робот читает это как
 * отсутствие сигнала свежести (и как шум), а честная дата страницы — единственный
 * lastmod, которому имеет смысл верить.
 *
 * Если git недоступен (сборка из tarball без .git), дата просто не выдаётся:
 * отсутствующий lastmod лучше выдуманного.
 */
const gitDateCache = new Map<string, string | null>();

function gitDate(paths: string[]): string | null {
  const key = paths.join('|');
  if (gitDateCache.has(key)) return gitDateCache.get(key) ?? null;

  let value: string | null = null;
  try {
    const out = execSync(`git log -1 --format=%as -- ${paths.join(' ')}`, {
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'ignore'],
      timeout: 5000,
    }).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(out)) value = out;
  } catch {
    value = null;
  }

  gitDateCache.set(key, value);
  return value;
}

interface StaticRoute {
  path: string;
  /** Файлы, по которым считаем дату изменения страницы. */
  sources: string[];
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
}

const staticRoutes: StaticRoute[] = [
  { path: '/', sources: ['src/app/page.tsx'], priority: 1.0, changeFrequency: 'weekly' },
  { path: '/analiz-kartochki', sources: ['src/app/analiz-kartochki'], priority: 0.9, changeFrequency: 'weekly' },
  { path: '/sozdanie-kartochki', sources: ['src/app/sozdanie-kartochki'], priority: 0.9, changeFrequency: 'weekly' },
  { path: '/generaciya-kartochki', sources: ['src/app/generaciya-kartochki'], priority: 0.9, changeFrequency: 'weekly' },
  { path: '/besplatnyy-analiz-kartochki', sources: ['src/app/besplatnyy-analiz-kartochki'], priority: 0.9, changeFrequency: 'weekly' },
  { path: '/wildberries', sources: ['src/app/wildberries'], priority: 0.9, changeFrequency: 'weekly' },
  { path: '/ozon', sources: ['src/app/ozon'], priority: 0.9, changeFrequency: 'weekly' },
  { path: '/promty-dlya-kartochki', sources: ['src/app/promty-dlya-kartochki'], priority: 0.85, changeFrequency: 'monthly' },
  { path: '/zapolnenie-kartochki', sources: ['src/app/zapolnenie-kartochki'], priority: 0.85, changeFrequency: 'monthly' },
  { path: '/razmery-kartochki', sources: ['src/app/razmery-kartochki'], priority: 0.8, changeFrequency: 'monthly' },
  { path: '/optimizaciya-kartochki', sources: ['src/app/optimizaciya-kartochki'], priority: 0.8, changeFrequency: 'monthly' },
  { path: '/audit-kartochki', sources: ['src/app/audit-kartochki'], priority: 0.8, changeFrequency: 'weekly' },
  { path: '/dizayn-kartochki', sources: ['src/app/dizayn-kartochki'], priority: 0.8, changeFrequency: 'weekly' },
  { path: '/ctr-kartochki', sources: ['src/app/ctr-kartochki'], priority: 0.8, changeFrequency: 'weekly' },
  { path: '/analiz-konkurentov', sources: ['src/app/analiz-konkurentov'], priority: 0.8, changeFrequency: 'weekly' },
  { path: '/vizualny-audit', sources: ['src/app/vizualny-audit'], priority: 0.8, changeFrequency: 'weekly' },
  { path: '/infografika', sources: ['src/app/infografika'], priority: 0.7, changeFrequency: 'weekly' },
  { path: '/guide', sources: ['src/app/guide/page.tsx'], priority: 0.8, changeFrequency: 'weekly' },
  { path: '/support', sources: ['src/app/support'], priority: 0.4, changeFrequency: 'monthly' },
  { path: '/terms', sources: ['src/app/terms'], priority: 0.2, changeFrequency: 'yearly' },
  { path: '/privacy', sources: ['src/app/privacy'], priority: 0.2, changeFrequency: 'yearly' },
  { path: '/en/privacy', sources: ['src/app/en/privacy'], priority: 0.2, changeFrequency: 'yearly' },
  { path: '/extension/privacy', sources: ['src/app/extension/privacy'], priority: 0.2, changeFrequency: 'yearly' },
  { path: '/consent', sources: ['src/app/consent'], priority: 0.1, changeFrequency: 'yearly' },
];

function entry(
  path: string,
  lastmod: string | null,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
): MetadataRoute.Sitemap[number] {
  const url = path === '/' ? baseUrl : `${baseUrl}${path}`;
  return {
    url,
    ...(lastmod ? { lastModified: new Date(`${lastmod}T12:00:00.000Z`) } : {}),
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) =>
    entry(route.path, gitDate(route.sources), route.priority, route.changeFrequency),
  );

  // Статьи справочника: даты взяты из git-истории корпуса (build-guide-data),
  // поэтому lastmod у каждой статьи собственный.
  let guidePages: MetadataRoute.Sitemap = [];
  try {
    guidePages = getAllGuideCodes().map((code) => {
      const doc = guideData.byCode[code];
      return entry(`/guide/${code}`, doc?.updatedAt ?? null, 0.6, 'monthly');
    });
  } catch {
    // Если данные корпуса недоступны (например, на этапе сборки), пропускаем.
  }

  return [...pages, ...guidePages];
}
