"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./passport.module.css";

const BASE_URL = "https://eyecard-api-634368981577.us-central1.run.app";
const BACKEND_URL = `${BASE_URL}/api/v1`;

interface AnalysisData {
  status: string;
  job_id: string;
  product: {
    name: string;
    platform: string;
    sku: string;
    image_url: string;
    features: string[];
  };
  analysis: {
    icc: number;
    actual: Record<string, unknown>;
    ideal: Record<string, unknown>;
    vectors: Record<string, unknown>;
    verdict: {
      compliance: number;
      [key: string]: unknown;
    };
  };
  timestamp: string;
}

const vpEngines = {
    icc: {
        getColor(icc: number) {
            if (icc >= 75) return 'oklch(62% 0.17 145)';
            if (icc >= 50) return 'oklch(70% 0.15 85)';
            if (icc >= 30) return 'oklch(64% 0.17 55)';
            return 'oklch(60% 0.01 252)';
        },
        getLabel(icc: number) {
            if (icc >= 75) return "ХОРОШИЙ";
            if (icc >= 50) return "СРЕДНИЙ";
            if (icc >= 30) return "СЛАБЫЙ";
            return "ПЛОХОЙ";
        }
    },
    signal: {
        getColor(strength: number) {
            const s = strength * 100;
            if (s >= 85) return 'oklch(62% 0.17 145)';
            if (s >= 60) return 'oklch(70% 0.15 85)';
            if (s >= 30) return 'oklch(64% 0.17 55)';
            return 'oklch(60% 0.01 252)';
        },
        getLabel(strength: number) {
            const s = strength * 100;
            if (s >= 85) return "ЭТАЛОННЫЙ";
            if (s >= 60) return "УВЕРЕННЫЙ";
            if (s >= 30) return "УМЕРЕННЫЙ";
            return "СМЕШАННЫЙ";
        }
    },
    createRadar(type: 'radicals' | 'archetypes', ideal: Record<string, unknown>, actual: Record<string, unknown>) {
        const config = {
            radicals: {
                keys: ['paranoid', 'epileptoid', 'hysteroid', 'schizoid', 'hyperthymic', 'emotive', 'anxious'],
                labels: { paranoid: 'ПАРАНОЙЯЛЬНЫЙ', epileptoid: 'ЭПИЛЕПТОИД', hysteroid: 'ИСТЕРОИД', schizoid: 'ШИЗОИД', hyperthymic: 'ГИПЕРТИМ', emotive: 'ЭМОТИВ', anxious: 'ТРЕВОЖНЫЙ' }
            },
            archetypes: {
                keys: ['innocent', 'explorer', 'sage', 'caregiver', 'ruler', 'creator', 'hero', 'outlaw', 'magician', 'everyman', 'lover', 'jester'],
                labels: { innocent: 'ПРОСТОДУШНЫЙ', explorer: 'ИСКАТЕЛЬ', sage: 'МУДРЕЦ', caregiver: 'ЗАБОТЛИВЫЙ', ruler: 'ПРАВИТЕЛЬ', creator: 'ТВОРЕЦ', hero: 'ГЕРОЙ', outlaw: 'БУНТАРЬ', magician: 'МАГ', everyman: 'СЛАВНЫЙ МАЛЫЙ', lover: 'ЭСТЕТ', jester: 'ШУТ' }
            }
        }[type];
        const size = 360, center = size / 2, radius = 100, N = config.keys.length;
        
        const getPoints = (vals: Record<string, unknown>, isIdeal: boolean) => {
            return config.keys.map((key, i) => {
                let val = 0;
                const labelsMap = config.labels as Record<string, string>;
                const label = labelsMap[key].toLowerCase();
                const kL = key.toLowerCase();

                const normalizedVals = Object.keys(vals || {}).reduce((acc: Record<string, unknown>, k) => {
                    acc[k.toLowerCase()] = vals[k];
                    return acc;
                }, {});

                if (typeof normalizedVals[kL] === 'number') val = normalizedVals[kL];
                else if (isIdeal && vals) {
                    const lead = (vals.leading_radical || vals.basic_archetype || "").toLowerCase();
                    const aux = JSON.stringify(vals.auxiliary_radicals || vals.auxiliary_archetype || []).toLowerCase();
                    
                    if (lead.includes(label) || lead.includes(kL)) val = 100;
                    else if (aux.includes(label) || aux.includes(kL)) val = 45;
                }
                const r = (val / 100) * radius;
                const angle = (i * (360 / N) - 90) * (Math.PI / 180);
                return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
            });
        };

        const iPoints = getPoints(ideal, true);
        const aPoints = getPoints(actual, false);
        const polyPoints = aPoints.map(p => `${p.x},${p.y}`).join(' ');

        let quadrants = '';
        if (type === 'archetypes') {
            const qLabels = ['ИНДИВИДУАЛИЗМ', 'СТАБИЛЬНОСТЬ', 'ИЗМЕНЕНИЯ', 'ПРИНАДЛЕЖНОСТЬ'];
            const qColors = [
                'oklch(80% 0.12 90)',  // Individualism (Yellow)
                'oklch(45% 0.06 252)', // Stability (Blue)
                'oklch(60% 0.15 30)',  // Change (Red)
                'oklch(55% 0.12 60)'   // Belonging (Brown)
            ];
            const qPaths = [
                "M180,180 L109.3,109.3 A100,100 0 0,1 250.7,109.3 Z", // Top
                "M180,180 L250.7,109.3 A100,100 0 0,1 250.7,250.7 Z", // Right
                "M180,180 L250.7,250.7 A100,100 0 0,1 109.3,250.7 Z", // Bottom
                "M180,180 L109.3,250.7 A100,100 0 0,1 109.3,109.3 Z"  // Left
            ];

            qPaths.forEach((path, idx) => {
                const opacity = (idx === 0 || idx === 3) ? "0.25" : "0.2";
                quadrants += `<path d="${path}" fill="${qColors[idx]}" opacity="${opacity}" />`;
            });

            [270, 0, 90, 180].forEach((ang, idx) => {
                const dist = radius * 1.08;
                const lx = center + dist * Math.cos(ang * Math.PI / 180);
                const ly = center + dist * Math.sin(ang * Math.PI / 180);
                let rot = (ang === 0 || ang === 180) ? 90 : 0;
                if (ang === 180) rot = 270;
                
                // Specific high-contrast colors for labels
                let textColor = qColors[idx];
                if (idx === 0) textColor = 'oklch(70% 0.15 90)'; // Denser Yellow
                if (idx === 3) textColor = 'oklch(50% 0.1 60)';  // Denser Brown

                quadrants += `<text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="middle" style="font-size: 8px; font-weight: 900; letter-spacing: 0.1em; opacity: 0.9; fill: ${textColor}" transform="rotate(${rot}, ${lx}, ${ly})">${qLabels[idx]}</text>`;
            });
        }

        let grid = `<circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="rgba(0,0,0,0.4)" stroke-width="1.2" />`;
        [0.25, 0.5, 0.75].forEach(f => {
            grid += `<circle cx="${center}" cy="${center}" r="${radius * f}" fill="none" stroke="rgba(0,0,0,0.2)" stroke-width="0.8" />`;
        });
        config.keys.forEach((_, i) => {
            const angle = (i * (360 / N) - 90) * (Math.PI / 180);
            grid += `<line x1="${center}" y1="${center}" x2="${center + radius * Math.cos(angle)}" y2="${center + radius * Math.sin(angle)}" stroke="rgba(0,0,0,0.4)" stroke-width="1.2" />`;
        });

        let idealPath = '';
        iPoints.forEach((p, i) => {
            const next = iPoints[(i + 1) % N];
            idealPath += `<line x1="${p.x}" y1="${p.y}" x2="${next.x}" y2="${next.y}" stroke="oklch(34.25% 0.057 252.12)" stroke-width="3" stroke-opacity="0.7" stroke-dasharray="4,2" />`;
            idealPath += `<circle cx="${p.x}" cy="${p.y}" r="3" fill="oklch(34.25% 0.057 252.12)" fill-opacity="0.7" />`;
        });

        let labels = '';
        config.keys.forEach((key, i) => {
            const angle = (i * (360 / N) - 90) * (Math.PI / 180);
            const lx = center + (radius + 40) * Math.cos(angle);
            const ly = center + (radius + 40) * Math.sin(angle);
            const label = (config.labels as Record<string, string>)[key];
            if (label === 'СЛАВНЫЙ МАЛЫЙ') {
                labels += `<g><text x="${lx - 15}" y="${ly - 5}" text-anchor="middle" dominant-baseline="middle" style="font-size: 9px; font-weight: 800; fill: oklch(34.25% 0.057 252.12); text-transform: uppercase;">СЛАВНЫЙ</text><text x="${lx - 15}" y="${ly + 5}" text-anchor="middle" dominant-baseline="middle" style="font-size: 9px; font-weight: 800; fill: oklch(34.25% 0.057 252.12); text-transform: uppercase;">МАЛЫЙ</text></g>`;
            } else {
                if (label === 'ЗАБОТЛИВЫЙ') lx += 15;
                labels += `<text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="middle" style="font-size: 9px; font-weight: 800; fill: oklch(34.25% 0.057 252.12); text-transform: uppercase;">${label}</text>`;
            }
        });

        return `
            <svg viewBox="0 0 ${size} ${size}" style="width: 100%; height: auto; overflow: visible;">
                <defs>
                    <linearGradient id="grad-${type}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="oklch(64.13% 0.17 48.74)" stop-opacity="0.4" />
                        <stop offset="100%" stop-color="oklch(64.13% 0.17 48.74)" stop-opacity="0.1" />
                    </linearGradient>
                </defs>
                ${quadrants}
                ${grid}
                <polygon points="${polyPoints}" fill="url(#grad-${type})" stroke="oklch(64.13% 0.17 48.74)" stroke-width="4" />
                ${idealPath}
                ${labels}
            </svg>
        `;
    },
    createVector(vectors: Record<string, unknown>) {
        const size = 360, center = size / 2, radius = 100;
        const axes = [
            { a: 'rationality', b: 'emotionality', lA: 'РАЦИОНАЛЬНОСТЬ', lB: 'ЭМОЦИОНАЛЬНОСТЬ' },
            { a: 'stability', b: 'change', lA: 'СТАБИЛЬНОСТЬ', lB: 'ИЗМЕНЕНИЯ' },
            { a: 'mastery', b: 'service', lA: 'МАСТЕРСТВО', lB: 'СЛУЖЕНИЕ' },
            { a: 'individualism', b: 'belonging', lA: 'ИНДИВИДУАЛИЗМ', lB: 'ПРИНАДЛЕЖНОСТЬ' }
        ];
        const _drawArrow = (x1: number, y1: number, x2: number, y2: number, color: string, width: number, isDashed = false) => {
            const head = 12, angle = Math.atan2(y2 - y1, x2 - x1);
            const dash = isDashed ? 'stroke-dasharray="4,2" stroke-opacity="0.5"' : '';
            return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" ${dash} />
                    <path d="M${x2},${y2} L${x2 - head * Math.cos(angle - Math.PI / 6)},${y2 - head * Math.sin(angle - Math.PI / 6)} M${x2},${y2} L${x2 - head * Math.cos(angle + Math.PI / 6)},${y2 - head * Math.sin(angle + Math.PI / 6)}" stroke="${color}" stroke-width="${width}" fill="none" ${dash} />`;
        };

        let grid = `<circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="rgba(0,0,0,0.4)" stroke-width="1.2" />`;
        [0.25, 0.5, 0.75].forEach(f => {
            grid += `<circle cx="${center}" cy="${center}" r="${radius * f}" fill="none" stroke="rgba(0,0,0,0.2)" stroke-width="0.8" />`;
        });
        axes.forEach((_, i) => {
            const angle = (i * 45 - 90) * (Math.PI / 180);
            grid += `<line x1="${center + radius * Math.cos(angle)}" y1="${center + radius * Math.sin(angle)}" x2="${center - radius * Math.cos(angle)}" y2="${center - radius * Math.sin(angle)}" stroke="rgba(0,0,0,0.4)" stroke-width="1.2" />`;
        });

        // Use direct actual scores from vectors.actual
        const actualAxes = vectors.vectors?.actual || {};
        const idealAxes = vectors.vectors?.ideal || {};

        let idealArrow = '';
        let idealDir = null;
        for (const [k, v] of Object.entries(idealAxes)) { if ((v as number) >= 80) { idealDir = k; break; } }
        if (idealDir) {
            const idx = axes.findIndex(ax => ax.a === idealDir || ax.b === idealDir);
            if (idx !== -1) {
                const isB = axes[idx].b === idealDir, angle = (idx * 45 - 90) * (Math.PI / 180), mult = isB ? -1 : 1;
                idealArrow = _drawArrow(center, center, center + 0.9 * radius * mult * Math.cos(angle), center + 0.9 * radius * mult * Math.sin(angle), 'oklch(34.25% 0.057 252.12)', 2.5, true);
            }
        }

        let actualArrows = '';
        axes.forEach((ax, i) => {
            const valA = actualAxes[ax.a] || 0;
            const valB = actualAxes[ax.b] || 0;
            if (valA > 5 || valB > 5) {
                const angle = (i * 45 - 90) * (Math.PI / 180);
                const pA = (valA / 100) * radius, pB = -(valB / 100) * radius;
                let sX, sY, eX, eY;
                if (valB >= valA) { 
                    sX = center + pA * Math.cos(angle); sY = center + pA * Math.sin(angle); 
                    eX = center + pB * Math.cos(angle); eY = center + pB * Math.sin(angle); 
                } else { 
                    sX = center + pB * Math.cos(angle); sY = center + pB * Math.sin(angle); 
                    eX = center + pA * Math.cos(angle); eY = center + pA * Math.sin(angle); 
                }
                actualArrows += _drawArrow(sX, sY, eX, eY, 'oklch(64.13% 0.17 48.74)', 4);
            }
        });

        let labels = '';
        axes.forEach((ax, i) => {
            const angle = (i * 45 - 90) * (Math.PI / 180);
            labels += `<text x="${center + (radius + 45) * Math.cos(angle)}" y="${center + (radius + 45) * Math.sin(angle)}" style="font-size: 9px; font-weight: 800; fill: oklch(34.25% 0.057 252.12); text-transform: uppercase;" text-anchor="middle">${ax.lA}</text>`;
            labels += `<text x="${center - (radius + 45) * Math.cos(angle)}" y="${center - (radius + 45) * Math.sin(angle)}" style="font-size: 9px; font-weight: 800; fill: oklch(34.25% 0.057 252.12); text-transform: uppercase;" text-anchor="middle">${ax.lB}</text>`;
        });

        return `
            <svg viewBox="0 0 ${size} ${size}" style="width: 100%; height: auto; overflow: visible;">
                ${grid}
                ${actualArrows}
                ${idealArrow}
                ${labels}
            </svg>
        `;
    }
};

function VerifyContent() {
  const searchParams = useSearchParams();
  const job_id = searchParams.get("id");
  const [data, setData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!job_id) { setError("Идентификатор анализа не указан"); setLoading(false); return; }
    async function fetchData() {
      try {
        const res = await fetch(`${BACKEND_URL}/analysis/public/${job_id}`);
        if (!res.ok) throw new Error("Анализ не найден или произошла ошибка сервера");
        const json = await res.json();
        if (json.status === "processing") setError("Анализ еще в процессе обработки. Попробуйте обновить страницу через минуту.");
        else if (json.status === "completed") setData(json);
        else setError(json.message || "Произошла ошибка при загрузке данных");
      } catch (err: unknown) { setError((err as Error).message); } finally { setLoading(false); }
    }
    fetchData();
  }, [job_id]);

  if (loading) return <div className={styles.loading}>ИНИЦИАЛИЗАЦИЯ ТЕРМИНАЛА...</div>;
  if (error) return <div className={styles.error}><h2>ОШИБКА ДОСТУПА</h2><p>{error}</p><Link href="/" className="btn-primary">На главную</Link></div>;
  if (!data) return null;

  const { product, analysis } = data;
  const iccColor = vpEngines.icc.getColor(analysis.icc);
  const vStyle = analysis.verdict.compliance === 1 ? { icon: '✅', label: 'СООТВЕТСТВУЕТ' } : analysis.verdict.compliance === -1 ? { icon: '❌', label: 'ПРОТИВОРЕЧИТ' } : { icon: '⚠️', label: 'ЧАСТИЧНО СООТВЕТСТВУЕТ' };
  const sStr = analysis.vectors.strength || 0;
  const analysisDate = data.timestamp ? new Date(data.timestamp).toLocaleDateString('ru-RU') : 'Дата не указана';
  
  // Construct absolute image URL
  const productImageUrl = product.image_url.startsWith('http') 
    ? product.image_url 
    : `${BASE_URL}${product.image_url}`;

  return (
    <div className={styles.container}>
      <div className={styles.stripe}></div>
      <div className={styles.headerPanel}>
        <div className={styles.headerTop}>
          <div className={styles.logoWrap}>
            <img src="/logo-vertical.png" className={styles.logoImg} alt="eyeCARD Logo" />
          </div>
          <div className={styles.titleBlock}><h2 className={styles.mainTitle}>СРАВНИТЕЛЬНЫЙ АНАЛИЗ</h2><p className={styles.mainSubtitle}>Целевой аудитории и Дизайна карточки</p></div>
          <div className={styles.dateBlock}><span className={styles.labelTech}>Дата анализа</span><br /><span className={styles.valueTech}>{analysisDate}</span></div>
        </div>
        <div className={styles.metaRow}><div className={styles.metaItem}><span className={styles.valueTech}>{product.platform}</span></div><div className={styles.metaItem}><span className={styles.valueTech}>{product.sku}</span></div></div>
        <h1 className={styles.productName}>{product.name}</h1>
        <div className={styles.instrumentalRow}>
          <div className={styles.iccHeaderCard}>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginBottom: "10px" }}><span className={styles.labelTech}>Когнитивный комфорт:</span><span className={styles.valueTech} style={{ color: iccColor }}>{vpEngines.icc.getLabel(analysis.icc)}</span></div>
            <div className={styles.iccBarBg}><div className={styles.iccBarFill} style={{ width: `${analysis.icc}%`, backgroundColor: iccColor }}></div></div>
          </div>
          <div className={styles.legendCard}>
            <span className={styles.legendItem}><i className={`${styles.dot} ${styles.dotIdeal}`}></i> ИДЕАЛ (ЦЕЛЕВАЯ АУДИТОРИЯ)</span>
            <span className={styles.legendItem}><i className={`${styles.dot} ${styles.dotActual}`}></i> ФАКТ (ТЕКУЩИЙ ДИЗАЙН)</span>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className={styles.moduleCard}>
            <h3 className={styles.moduleTitle}>Карточка товара</h3>
            <div className={styles.propsList}>{product.features.map((f, i) => <div key={i} className={styles.propItem}>{typeof f === 'string' ? f : <><span className={styles.propK}>{f.label || f.name || f.key}:</span>{f.value}</>}</div>)}</div>
            <div className={styles.imgWrap}><img src={productImageUrl} alt="Product" /></div>
          </div>
          <div className={styles.moduleCard}>
            <h3 className={styles.moduleTitle}>РАДИКАЛЫ</h3>
            <div className={styles.radarContainer} dangerouslySetInnerHTML={{ __html: vpEngines.createRadar('radicals', analysis.ideal.radicals, analysis.actual.radicals) }} />
            <div className={styles.evidenceBox}>{analysis.ideal.radicals.radical_evidence}</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className={styles.moduleCard}>
            <h3 className={styles.moduleTitle}>СМЫСЛЫ</h3>
            <div className={styles.radarContainer} dangerouslySetInnerHTML={{ __html: vpEngines.createVector(analysis) }} />
            <div className={styles.signalBadge}><span className={styles.labelTech}>СИГНАЛ:</span><span className={styles.valueTech} style={{ color: vpEngines.signal.getColor(sStr) }}>{vpEngines.signal.getLabel(sStr)}</span></div>
            <div className={styles.evidenceBox}>{analysis.ideal.axis_evidence}</div>
          </div>
          <div className={styles.moduleCard}>
            <h3 className={styles.moduleTitle}>АРХЕТИПЫ</h3>
            <div className={styles.radarContainer} dangerouslySetInnerHTML={{ __html: vpEngines.createRadar('archetypes', analysis.ideal.archetypes, analysis.actual.archetypes) }} />
            <div className={styles.evidenceBox}>{analysis.ideal.archetype_evidence}</div>
          </div>
        </div>
      </div>

      <div className={styles.verdictWrap}>
        <div className={styles.verdictCard}>
          <div className={styles.verdictHeader}><span className={styles.verdictIcon}>{vStyle.icon}</span><span className={styles.verdictStatus}>{vStyle.label}</span></div>
          <p className={styles.verdictDesc}>{analysis.verdict.justification}</p>
          <div className={styles.influenceBox}><span style={{ fontSize: "24px" }}>🎯</span><div className={styles.influenceText}><b>ВЛИЯНИЕ НА КОНВЕРСИЮ</b><br />{analysis.verdict.efficiency}</div></div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.qrRow}>
          <div className={styles.qrItem}><div className={styles.qrBox}>QR</div><span className={styles.qrLabel}>Методика</span></div>
          <div className={styles.qrItem}><div className={styles.qrBox}>QR</div><span className={styles.qrLabel}>Проверить</span></div>
          <div className={styles.qrItem}><div className={styles.qrBox}>QR</div><span className={styles.qrLabel}>Сайт</span></div>
          <div className={styles.qrItem}><div className={styles.qrBox}>QR</div><span className={styles.qrLabel}>Расширение</span></div>
        </div>
      </div>
      <div className={styles.bottomBar}>WWW.EYECARD.RU // INSTRUMENTAL TERMINAL v19.4 // JOB_ID: {job_id?.toUpperCase()}</div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className={styles.loading}>ЗАГРУЗКА ЯДРА...</div>}>
      <VerifyContent />
    </Suspense>
  );
}
