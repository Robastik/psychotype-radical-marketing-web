'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css'; // Убедитесь, что путь правильный

// Определяем типы вместо any
interface ProductData {
  platform: string;
  sku: string;
  name: string;
  image_url?: string;
  [key: string]: any;
}

interface AnalysisData {
  job_id: string;
  product: ProductData;
  target_audience?: any;
  design_analysis?: any;
  recommendations?: any;
  timestamp?: string;
  status?: string;
  error?: string;
  [key: string]: any;
}

export default function VerifyPage() {
  const router = useRouter();
  const [data, setData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [job_id, setJobId] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Получаем job_id из URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get('job_id');
    
    if (!id) {
      setError("Идентификатор анализа не указан");
      setLoading(false);
      return;
    }
    
    setJobId(id);

    async function fetchData() {
      try {
        // Замените на ваш реальный бэкенд URL
        const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
        const res = await fetch(`${BACKEND_URL}/analysis/public/${id}`);
        
        if (!res.ok) {
          throw new Error('Ошибка загрузки данных');
        }
        
        const result = await res.json();
        setData(result);
        
        // Отрисовка радара, если данные есть
        if (result.radar_data && canvasRef.current) {
          drawRadar(result.radar_data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Произошла неизвестная ошибка");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Функция отрисовки радара (упрощенная версия)
  const drawRadar = (radarData: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Очистка и базовая отрисовка
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ... логика отрисовки радара ...
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loader}>Загрузка данных...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h1>Ошибка</h1>
          <p>{error || "Данные не найдены"}</p>
          <Link href="/">Вернуться на главную</Link>
        </div>
      </div>
    );
  }

  const { product } = data;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          Radical Marketing
        </Link>
        <nav className={styles.nav}>
          <Link href="/about">О проекте</Link>
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.metaBlock}>
          <div className={styles.titleBlock}>
            <h2 className={styles.mainTitle}>СРАВНИТЕЛЬНЫЙ АНАЛИЗ</h2>
            <p className={styles.mainSubtitle}>Целевой аудитории и Дизайна карточки</p>
          </div>
          
          {/* Исправлено: Date.now() вынесен или используется стабильное значение */}
          <div className={styles.dateBlock}>
            <span className={styles.labelTech}>Дата анализа</span>
            <br />
            <span className={styles.valueTech}>
              {new Date(data.timestamp || new Date().toISOString()).toLocaleDateString('ru-RU')}
            </span>
          </div>
        </div>

        <div className={styles.metaRow}>
          <div className={styles.metaItem}>
            <span className={styles.labelTech}>Платформа:</span>
            <span className={styles.valueTech}>{product.platform}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.labelTech}>SKU:</span>
            <span className={styles.valueTech}>{product.sku}</span>
          </div>
        </div>

        <h1 className={styles.productName}>{product.name}</h1>

        <div className={styles.imageContainer}>
          {product.image_url ? (
            <Image 
              src={product.image_url} 
              alt={product.name}
              width={400}
              height={400}
              className={styles.productImage}
              unoptimized // Если изображение с внешнего ресурса без CORS
            />
          ) : (
            <div className={styles.noImage}>Нет изображения</div>
          )}
        </div>

        <div className={styles.canvasContainer}>
          <canvas ref={canvasRef} width={400} height={400} className={styles.radarCanvas}></canvas>
        </div>

        <div className={styles.actions}>
          <Link href="/" className={styles.button}>
            Провести новый анализ
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Radical Marketing. Все права защищены.</p>
      </footer>
    </div>
  );
}
