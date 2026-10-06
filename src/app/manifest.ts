import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'eyeCARD — ИИ-анализ карточек товаров Wildberries и Ozon',
    short_name: 'eyeCARD',
    description: 'ИИ-аналитика карточек товаров для продавцов маркетплейсов: повышение CTR через анализ дизайна и психологии покупателей.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0e1a',
    theme_color: '#1C3E61',
    icons: [
      {
        src: '/favicon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
