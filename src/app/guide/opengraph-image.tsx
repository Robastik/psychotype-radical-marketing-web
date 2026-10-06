import { ImageResponse } from 'next/og';

export const alt = 'Справочник по анализу карточек товаров — eyeCARD';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0e1a',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '60px',
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: '#F27318',
              marginBottom: 16,
              letterSpacing: '0.05em',
            }}
          >
            eyeCARD
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: '#e0e7ef',
              textAlign: 'center',
              lineHeight: 1.3,
              maxWidth: 900,
            }}
          >
            Методический справочник по анализу карточек товаров
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 400,
              color: '#8b9bb4',
              marginTop: 16,
            }}
          >
            Методика · Психология · CTR
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
