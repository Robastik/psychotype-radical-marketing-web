import type { Metadata } from 'next';
import { SITE_ORIGIN, absoluteUrl } from '@/lib/seo';

import * as Home from '../page';
import * as AnalizKartochki from '../analiz-kartochki/page';
import * as SozdanieKartochki from '../sozdanie-kartochki/page';
import * as GeneraciyaKartochki from '../generaciya-kartochki/page';
import * as PromtyDlyaKartochki from '../promty-dlya-kartochki/page';
import * as BesplatnyyAnaliz from '../besplatnyy-analiz-kartochki/page';
import * as ZapolnenieKartochki from '../zapolnenie-kartochki/page';
import * as RazmeryKartochki from '../razmery-kartochki/page';
import * as OptimizaciyaKartochki from '../optimizaciya-kartochki/page';
import * as AuditKartochki from '../audit-kartochki/page';
import * as DizaynKartochki from '../dizayn-kartochki/page';
import * as CtrKartochki from '../ctr-kartochki/page';
import * as Infografika from '../infografika/page';
import * as AnalizKonkurentov from '../analiz-konkurentov/page';
import * as VizualnyAudit from '../vizualny-audit/page';
import * as Wildberries from '../wildberries/page';
import * as Ozon from '../ozon/page';
import * as GuideIndex from '../guide/page';
import * as Support from '../support/page';
import * as Terms from '../terms/page';
import * as Privacy from '../privacy/page';
import * as PrivacyEn from '../en/privacy/page';
import * as ExtensionPrivacy from '../extension/privacy/page';
import * as Consent from '../consent/page';

/**
 * Регрессия на дефект, найденный 2026-11-19.
 *
 * canonical был объявлен в корневом layout.tsx, Next наследует metadata
 * дочерним сегментам — в результате 130 из 131 собранной страницы указывали
 * на главную как на каноническую, и в индексе Яндекса оставалась одна страница.
 *
 * Попутно: страница, объявившая свой openGraph без images, теряла og:image
 * целиком (/wildberries, /ozon), а наследующие корневой openGraph получали
 * og:image на несуществующий /og-image.png (404 в проде).
 */

type RouteModule = { metadata?: Metadata };

const routes: Array<{ path: string; mod: RouteModule }> = [
  { path: '/', mod: Home },
  { path: '/analiz-kartochki', mod: AnalizKartochki },
  { path: '/sozdanie-kartochki', mod: SozdanieKartochki },
  { path: '/generaciya-kartochki', mod: GeneraciyaKartochki },
  { path: '/promty-dlya-kartochki', mod: PromtyDlyaKartochki },
  { path: '/besplatnyy-analiz-kartochki', mod: BesplatnyyAnaliz },
  { path: '/zapolnenie-kartochki', mod: ZapolnenieKartochki },
  { path: '/razmery-kartochki', mod: RazmeryKartochki },
  { path: '/optimizaciya-kartochki', mod: OptimizaciyaKartochki },
  { path: '/audit-kartochki', mod: AuditKartochki },
  { path: '/dizayn-kartochki', mod: DizaynKartochki },
  { path: '/ctr-kartochki', mod: CtrKartochki },
  { path: '/infografika', mod: Infografika },
  { path: '/analiz-konkurentov', mod: AnalizKonkurentov },
  { path: '/vizualny-audit', mod: VizualnyAudit },
  { path: '/wildberries', mod: Wildberries },
  { path: '/ozon', mod: Ozon },
  { path: '/guide', mod: GuideIndex },
  { path: '/support', mod: Support },
  { path: '/terms', mod: Terms },
  { path: '/privacy', mod: Privacy },
  { path: '/en/privacy', mod: PrivacyEn },
  { path: '/extension/privacy', mod: ExtensionPrivacy },
  { path: '/consent', mod: Consent },
];

function metaOf(mod: RouteModule): Metadata {
  if (!mod.metadata) throw new Error("у страницы нет экспорта metadata");
  return mod.metadata;
}

function canonicalOf(meta: Metadata): string | undefined {
  const alternates = meta.alternates;
  return alternates && 'canonical' in alternates
    ? String(alternates.canonical)
    : undefined;
}

function ogImages(meta: Metadata): string[] {
  const og = meta.openGraph;
  if (!og || Array.isArray(og) || !og.images) return [];
  return og.images.map((image) => (typeof image === 'string' ? image : image.url));
}

describe("canonical страниц", () => {
  it("каждая страница объявляет собственный canonical", () => {
    for (const { path, mod } of routes) {
      expect(canonicalOf(metaOf(mod))).toBe(absoluteUrl(path));
    }
  });

  it("ни одна чужая страница не канонизируется на главную", () => {
    const pointingHome = routes
      .filter(({ path, mod }) => path !== "/" && canonicalOf(metaOf(mod)) === SITE_ORIGIN)
      .map(({ path }) => path);
    expect(pointingHome).toEqual([]);
  });

  it("og:url совпадает с canonical", () => {
    for (const { path, mod } of routes) {
      const og = metaOf(mod).openGraph;
      const url = og && !Array.isArray(og) ? og.url : undefined;
      expect(url).toBe(absoluteUrl(path));
    }
  });

  it("og:image объявлен и никогда не ведёт на несуществующий og-image.png", () => {
    for (const { mod } of routes) {
      const images = ogImages(metaOf(mod));
      expect(images.length).toBeGreaterThan(0);
      expect(images.join(" ")).not.toContain("og-image.png");
      expect(images.join(" ")).toContain("/opengraph-image");
    }
  });
});

describe("уникальность мета", () => {
  it("title уникальны", () => {
    const titles = routes.map(({ mod }) => String(metaOf(mod).title));
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("description уникальны и непустые", () => {
    const descriptions = routes.map(({ mod }) => String(metaOf(mod).description ?? ""));
    for (const d of descriptions) expect(d.length).toBeGreaterThan(40);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });
});

describe("метаданные статей справочника", () => {
  // Динамический маршрут подключается лениво: модуль тянет корпус 11 МБ.
  it("статья канонизируется на собственный URL", async () => {
    const { generateMetadata } = await import('../guide/[code]/page');
    const meta = (await generateMetadata({
      params: Promise.resolve({ code: 'I.1.1' }),
    })) as Metadata;

    expect(canonicalOf(meta)).toBe(`${SITE_ORIGIN}/guide/I.1.1`);
  });

  it("og:image статьи остаётся за файловым соглашением сегмента", async () => {
    const { generateMetadata } = await import('../guide/[code]/page');
    const meta = (await generateMetadata({
      params: Promise.resolve({ code: 'I.1.1' }),
    })) as Metadata;

    // Ручное объявление images давало og:image → 404 (этап 3.5), поэтому
    // в metadata картинок быть не должно: их подставляет opengraph-image.tsx.
    expect(ogImages(meta)).toEqual([]);
  });

  it("несуществующий код не притворяется главной", async () => {
    const { generateMetadata } = await import('../guide/[code]/page');
    const meta = (await generateMetadata({
      params: Promise.resolve({ code: 'NET.TAKOGO' }),
    })) as Metadata;

    expect(canonicalOf(meta)).toBeUndefined();
  });
});

describe("sitemap", () => {
  it("включает все страницы", async () => {
    const buildSitemap = (await import('../sitemap')).default;
    const entries = await buildSitemap();
    const urls = entries.map((e) => e.url);

    for (const { path } of routes) {
      expect(urls).toContain(path === "/" ? SITE_ORIGIN : `${SITE_ORIGIN}${path}`);
    }
  });

  it("lastmod не одинаковый для всего сайта", async () => {
    const buildSitemap = (await import('../sitemap')).default;
    const entries = await buildSitemap();

    const dates = entries
      .filter((e) => e.lastModified)
      .map((e) => new Date(e.lastModified as Date).toISOString().slice(0, 10));

    expect(dates.length).toBeGreaterThan(10);
    expect(new Set(dates).size).toBeGreaterThan(3);
  });

  it("статьи корпуса в sitemap на месте", async () => {
    const buildSitemap = (await import('../sitemap')).default;
    const entries = await buildSitemap();
    const guideUrls = entries.filter((e) => e.url.includes("/guide/"));

    expect(guideUrls.length).toBeGreaterThan(100);
  });
});

describe("удалённый /methodology", () => {
  it("маршрут больше не существует", async () => {
    await expect(import('../methodology/page')).rejects.toThrow();
  });
});
