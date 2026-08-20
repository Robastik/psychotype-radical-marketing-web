"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./passport.module.css";

const BASE_URL = "https://eyecard-api-634368981577.us-central1.run.app";
const BACKEND_URL = `${BASE_URL}/api/v1`;

type FeatureItem = string | { label?: string; name?: string; key?: string; value?: string | number };

/* =========================================================================
   ФИРМЕННЫЙ QR-ГЕНЕРАТОР eyeCARD (Segno Style: Cobalt + Orange)
   ========================================================================= */
const BRAND_COLORS = {
  cobalt: "#1C3E61", // --dark & --finder-dark
  orange: "#F27318", // --align-dark & --timing-dark
  white: "#FFFFFF",  // --light
};

const QR_GF_EXP = new Array(512);
const QR_GF_LOG = new Array(256);
let _gx = 1;
for (let i = 0; i < 255; i++) {
  QR_GF_EXP[i] = _gx;
  QR_GF_EXP[i + 255] = _gx;
  QR_GF_LOG[_gx] = i;
  _gx = (_gx << 1) ^ (_gx >= 128 ? 0x11d : 0);
}
QR_GF_LOG[0] = 0;

function gfMult(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return QR_GF_EXP[QR_GF_LOG[a] + QR_GF_LOG[b]];
}

function getRsGeneratorPoly(ecLen: number): number[] {
  let poly = [1];
  for (let i = 0; i < ecLen; i++) {
    const next = [1, QR_GF_EXP[i]];
    const res = new Array(poly.length + 1).fill(0);
    for (let j = 0; j < poly.length; j++) {
      for (let k = 0; k < next.length; k++) {
        res[j + k] ^= gfMult(poly[j], next[k]);
      }
    }
    poly = res;
  }
  return poly;
}

function calculateReedSolomon(data: number[], ecLen: number): number[] {
  const gen = getRsGeneratorPoly(ecLen);
  const info = [...data, ...new Array(ecLen).fill(0)];
  for (let i = 0; i < data.length; i++) {
    const coef = info[i];
    if (coef !== 0) {
      for (let j = 0; j < gen.length; j++) {
        info[i + j] ^= gfMult(gen[j], coef);
      }
    }
  }
  return info.slice(data.length);
}

interface QRVersionSpec {
  version: number;
  dataCapacity: number;
  blocks: { count: number; dataCount: number; ecCount: number }[];
  align: number[];
}

// Таблица версий для Error Correction Level H (высокая надежность)
const QR_VERSIONS_H: QRVersionSpec[] = [
  { version: 1, dataCapacity: 9, blocks: [{ count: 1, dataCount: 9, ecCount: 17 }], align: [] },
  { version: 2, dataCapacity: 16, blocks: [{ count: 1, dataCount: 16, ecCount: 28 }], align: [6, 18] },
  { version: 3, dataCapacity: 26, blocks: [{ count: 2, dataCount: 13, ecCount: 22 }], align: [6, 22] },
  { version: 4, dataCapacity: 36, blocks: [{ count: 4, dataCount: 9, ecCount: 16 }], align: [6, 26] },
  { version: 5, dataCapacity: 46, blocks: [{ count: 2, dataCount: 11, ecCount: 22 }, { count: 2, dataCount: 12, ecCount: 22 }], align: [6, 30] },
  { version: 6, dataCapacity: 60, blocks: [{ count: 4, dataCount: 15, ecCount: 28 }], align: [6, 34] },
  { version: 7, dataCapacity: 66, blocks: [{ count: 4, dataCount: 13, ecCount: 26 }, { count: 1, dataCount: 14, ecCount: 26 }], align: [6, 22, 38] },
  { version: 8, dataCapacity: 86, blocks: [{ count: 4, dataCount: 14, ecCount: 26 }, { count: 2, dataCount: 15, ecCount: 26 }], align: [6, 24, 42] },
  { version: 9, dataCapacity: 100, blocks: [{ count: 4, dataCount: 12, ecCount: 24 }, { count: 4, dataCount: 13, ecCount: 24 }], align: [6, 26, 46] },
  { version: 10, dataCapacity: 122, blocks: [{ count: 6, dataCount: 15, ecCount: 28 }, { count: 2, dataCount: 16, ecCount: 28 }], align: [6, 28, 50] }
];

function generateBrandQRCodeSvg(text: string): string {
  const utf8Bytes: number[] = [];
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if (code < 0x80) utf8Bytes.push(code);
    else if (code < 0x800) utf8Bytes.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f));
    else utf8Bytes.push(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
  }

  // Подбор версии (минимум v9 для точного соответствия скрипту или автоподбор при длинном URL)
  let verSpec = QR_VERSIONS_H.find(v => v.version === 9) || QR_VERSIONS_H[QR_VERSIONS_H.length - 1];
  for (const v of QR_VERSIONS_H) {
    const charLenBits = v.version < 10 ? 8 : 16;
    const maxBytes = Math.floor((v.dataCapacity * 8 - 4 - charLenBits) / 8);
    if (utf8Bytes.length <= maxBytes && v.version >= 9) {
      verSpec = v;
      break;
    }
  }

  const bitBuffer: boolean[] = [];
  const putBits = (val: number, len: number) => {
    for (let i = len - 1; i >= 0; i--) bitBuffer.push(((val >>> i) & 1) === 1);
  };

  putBits(0b0100, 4); // Byte mode
  putBits(utf8Bytes.length, verSpec.version < 10 ? 8 : 16);
  for (const b of utf8Bytes) putBits(b, 8);

  const totalDataBits = verSpec.dataCapacity * 8;
  const rem = totalDataBits - bitBuffer.length;
  if (rem > 0) putBits(0, Math.min(4, rem));
  while (bitBuffer.length % 8 !== 0) bitBuffer.push(false);

  const rawCodewords: number[] = [];
  for (let i = 0; i < bitBuffer.length; i += 8) {
    let byte = 0;
    for (let b = 0; b < 8; b++) if (bitBuffer[i + b]) byte |= 0x80 >>> b;
    rawCodewords.push(byte);
  }

  let pad = 0xec;
  while (rawCodewords.length < verSpec.dataCapacity) {
    rawCodewords.push(pad);
    pad = pad === 0xec ? 0x11 : 0xec;
  }

  const dataBlocks: number[][] = [];
  const ecBlocks: number[][] = [];
  let offset = 0;
  for (const block of verSpec.blocks) {
    for (let b = 0; b < block.count; b++) {
      const d = rawCodewords.slice(offset, offset + block.dataCount);
      offset += block.dataCount;
      dataBlocks.push(d);
      ecBlocks.push(calculateReedSolomon(d, block.ecCount));
    }
  }

  const finalStream: number[] = [];
  const maxD = Math.max(...dataBlocks.map(d => d.length));
  for (let i = 0; i < maxD; i++) {
    for (const d of dataBlocks) if (i < d.length) finalStream.push(d[i]);
  }
  const maxEC = Math.max(...ecBlocks.map(e => e.length));
  for (let i = 0; i < maxEC; i++) {
    for (const e of ecBlocks) if (i < e.length) finalStream.push(e[i]);
  }

  const allBits: boolean[] = [];
  for (const byte of finalStream) {
    for (let i = 7; i >= 0; i--) allBits.push(((byte >>> i) & 1) === 1);
  }

  const size = verSpec.version * 4 + 17;
  const matrix: (boolean | null)[][] = Array.from({ length: size }, () => new Array(size).fill(null));
  const reserved: boolean[][] = Array.from({ length: size }, () => new Array(size).fill(false));
  
  // Типизация модулей для раздельной раскраски
  const moduleTypes: ("finder" | "timing" | "align" | "data")[][] = Array.from(
    { length: size },
    () => new Array(size).fill("data")
  );

  const setFinder = (r0: number, c0: number) => {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const mr = r0 + r, mc = c0 + c;
        if (mr >= 0 && mr < size && mc >= 0 && mc < size) {
          if (r >= 0 && r <= 6 && c >= 0 && c <= 6) {
            matrix[mr][mc] = (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4));
            moduleTypes[mr][mc] = "finder";
          } else {
            matrix[mr][mc] = false;
          }
          reserved[mr][mc] = true;
        }
      }
    }
  };

  setFinder(0, 0);
  setFinder(0, size - 7);
  setFinder(size - 7, 0);

  // Timing lines
  for (let i = 8; i < size - 8; i++) {
    if (!reserved[6][i]) { matrix[6][i] = i % 2 === 0; reserved[6][i] = true; moduleTypes[6][i] = "timing"; }
    if (!reserved[i][6]) { matrix[i][6] = i % 2 === 0; reserved[i][6] = true; moduleTypes[i][6] = "timing"; }
  }

  // Alignment patterns
  for (const ar of verSpec.align) {
    for (const ac of verSpec.align) {
      if ((ar <= 8 && ac <= 8) || (ar <= 8 && ac >= size - 9) || (ar >= size - 9 && ac <= 8)) continue;
      for (let r = -2; r <= 2; r++) {
        for (let c = -2; c <= 2; c++) {
          matrix[ar + r][ac + c] = (Math.abs(r) === 2 || Math.abs(c) === 2 || (r === 0 && c === 0));
          reserved[ar + r][ac + c] = true;
          moduleTypes[ar + r][ac + c] = "align";
        }
      }
    }
  }

  matrix[size - 8][8] = true;
  reserved[size - 8][8] = true;

  for (let i = 0; i < 9; i++) {
    reserved[8][i] = true; reserved[i][8] = true;
    reserved[8][size - 1 - i] = true; reserved[size - 1 - i][8] = true;
  }

  let bitIdx = 0;
  let up = true;
  for (let right = size - 1; right > 0; right -= 2) {
    const col1 = right <= 6 ? right - 1 : right;
    const cols = [col1, col1 - 1];
    const rowList = up ? Array.from({ length: size }, (_, i) => size - 1 - i) : Array.from({ length: size }, (_, i) => i);
    for (const r of rowList) {
      for (const c of cols) {
        if (!reserved[r][c]) {
          matrix[r][c] = bitIdx < allBits.length ? allBits[bitIdx++] : false;
        }
      }
    }
    up = !up;
  }

  const maskFn = (mask: number, r: number, c: number) => {
    switch (mask) {
      case 0: return (r + c) % 2 === 0;
      case 1: return r % 2 === 0;
      case 2: return c % 3 === 0;
      case 3: return (r + c) % 3 === 0;
      case 4: return (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0;
      case 5: return ((r * c) % 2) + ((r * c) % 3) === 0;
      case 6: return (((r * c) % 2) + ((r * c) % 3)) % 2 === 0;
      case 7: return (((r + c) % 2) + ((r * c) % 3)) % 2 === 0;
      default: return false;
    }
  };

  const getFormatBits = (mask: number) => {
    const data = (0b10 << 3) | mask; // EC Level H = 0b10
    let r = data << 10;
    for (let i = 4; i >= 0; i--) {
      if ((r >> (i + 10)) & 1) r ^= (0x537 << i);
    }
    return ((data << 10) | r) ^ 0x5412;
  };

  let minPenalty = Infinity;
  let bestGrid: boolean[][] = [];

  for (let mask = 0; mask < 8; mask++) {
    const grid: boolean[][] = matrix.map((row, r) =>
      row.map((val, c) => (reserved[r][c] ? Boolean(val) : (maskFn(mask, r, c) ? !val : Boolean(val))))
    );

    const fBits = getFormatBits(mask);
    const getB = (idx: number) => ((fBits >> idx) & 1) === 1;

    for (let i = 0; i <= 5; i++) grid[8][i] = getB(i);
    grid[8][7] = getB(6); grid[8][8] = getB(7); grid[7][8] = getB(8);
    for (let i = 9; i <= 14; i++) grid[14 - i][8] = getB(i);
    for (let i = 0; i <= 6; i++) grid[size - 1 - i][8] = getB(i);
    for (let i = 7; i <= 14; i++) grid[8][size - 15 + i] = getB(i);

    let penalty = 0;
    for (let r = 0; r < size; r++) {
      let count = 0, last = null;
      for (let c = 0; c < size; c++) {
        if (grid[r][c] === last) count++;
        else { if (count >= 5) penalty += 3 + (count - 5); last = grid[r][c]; count = 1; }
      }
      if (count >= 5) penalty += 3 + (count - 5);
    }
    if (penalty < minPenalty) {
      minPenalty = penalty;
      bestGrid = grid;
    }
  }

  // Граница 4 модуля (-b 4)
  const margin = 4;
  const totalSize = size + margin * 2;
  
  let pathCobalt = "";
  let pathOrange = "";

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (bestGrid[r][c]) {
        const d = `M${c + margin},${r + margin}h1v1h-1z `;
        const type = moduleTypes[r][c];
        if (type === "align" || type === "timing") {
          pathOrange += d;
        } else {
          pathCobalt += d;
        }
      }
    }
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalSize} ${totalSize}" shape-rendering="crispEdges" style="width: 100%; height: 100%; display: block;" class="qr-svg-inline">
      <rect width="${totalSize}" height="${totalSize}" fill="${BRAND_COLORS.white}" />
      ${pathCobalt ? `<path d="${pathCobalt.trim()}" fill="${BRAND_COLORS.cobalt}" />` : ""}
      ${pathOrange ? `<path d="${pathOrange.trim()}" fill="${BRAND_COLORS.orange}" />` : ""}
    </svg>
  `.trim();
}

interface AnalysisData {
  status: string;
  job_id: string;
  product: {
    name: string;
    platform: string;
    sku: string;
    image_url: string;
    features: FeatureItem[];
  };
  analysis: {
    icc: number;
    actual: {
      radicals?: Record<string, unknown>;
      archetypes?: Record<string, unknown>;
      [key: string]: unknown;
    };
    ideal: {
      radicals?: Record<string, unknown> & { radical_evidence?: string };
      archetypes?: Record<string, unknown> & { archetype_evidence?: string };
      axis_evidence?: string;
      archetype_evidence?: string;
      [key: string]: unknown;
    };
    vectors: {
      strength?: number;
      actual?: Record<string, number>;
      ideal?: Record<string, number>;
      vectors?: {
        actual?: Record<string, number>;
        ideal?: Record<string, number>;
      };
      [key: string]: unknown;
    };
    verdict: {
      compliance: number;
      justification?: string;
      efficiency?: string;
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
    createQRCodeSVG(data: string) {
        return generateBrandQRCodeSvg(data);
    },
    createRadar(type: 'radicals' | 'archetypes', ideal: Record<string, unknown> = {}, actual: Record<string, unknown> = {}) {
        const config: { keys: string[]; labels: Record<string, string> } = {
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
                const label = config.labels[key]?.toLowerCase() || '';
                const kL = key.toLowerCase();

                const normalizedVals = Object.keys(vals || {}).reduce((acc: Record<string, unknown>, k) => {
                    acc[k.toLowerCase()] = vals[k];
                    return acc;
                }, {});

                if (typeof normalizedVals[kL] === 'number') {
                    val = normalizedVals[kL] as number;
                } else if (isIdeal && vals) {
                    const lead = String(vals.leading_radical || vals.basic_archetype || "").toLowerCase();
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
                
                let textColor = qColors[idx];
                if (idx === 0) textColor = 'oklch(70% 0.15 90)';
                if (idx === 3) textColor = 'oklch(50% 0.1 60)';

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
            let lx = center + (radius + 40) * Math.cos(angle);
            const ly = center + (radius + 40) * Math.sin(angle);
            const label = config.labels[key];
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
    createVector(vectorsData: AnalysisData['analysis']) {
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

        const actualAxes = vectorsData.vectors?.actual || vectorsData.vectors?.vectors?.actual || {};
        const idealAxes = vectorsData.vectors?.ideal || vectorsData.vectors?.vectors?.ideal || {};

        let idealArrow = '';
        let idealDir = null;
        for (const [k, v] of Object.entries(idealAxes)) {
            if (typeof v === 'number' && v >= 80) {
                idealDir = k;
                break;
            }
        }
        if (idealDir) {
            const idx = axes.findIndex(ax => ax.a === idealDir || ax.b === idealDir);
            if (idx !== -1) {
                const isB = axes[idx].b === idealDir, angle = (idx * 45 - 90) * (Math.PI / 180), mult = isB ? -1 : 1;
                idealArrow = _drawArrow(center, center, center + 0.9 * radius * mult * Math.cos(angle), center + 0.9 * radius * mult * Math.sin(angle), 'oklch(34.25% 0.057 252.12)', 2.5, true);
            }
        }

        let actualArrows = '';
        axes.forEach((ax, i) => {
            const valA = Number(actualAxes[ax.a]) || 0;
            const valB = Number(actualAxes[ax.b]) || 0;
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
    if (!job_id) { return; }
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

  if (!job_id) { return <div className={styles.error}><h2>ОШИБКА ДОСТУПА</h2><p>Идентификатор анализа не указан</p><Link href="/" className="btn-primary">На главную</Link></div>; }
  if (loading) return <div className={styles.loading}>ИНИЦИАЛИЗАЦИЯ ТЕРМИНАЛА...</div>;
  if (error) return <div className={styles.error}><h2>ОШИБКА ДОСТУПА</h2><p>{error}</p><Link href="/" className="btn-primary">На главную</Link></div>;
  if (!data) return null;

  const { product, analysis } = data;
  const iccColor = vpEngines.icc.getColor(analysis.icc);
  const timestamp = data.timestamp || new Date().toISOString();
  const analysisDate = new Date(timestamp).toLocaleDateString('ru-RU');
  const vStyle = analysis.verdict.compliance === 1 ? { icon: '✅', label: 'СООТВЕТСТВУЕТ' } : analysis.verdict.compliance === -1 ? { icon: '❌', label: 'ПРОТИВОРЕЧИТ' } : { icon: '⚠️', label: 'ЧАСТИЧНО СООТВЕТСТВУЕТ' };
  const sStr = Number(analysis.vectors.strength) || 0;
  
  const productImageUrl = product.image_url.startsWith('http') 
    ? product.image_url 
    : `${BASE_URL}${product.image_url}`;

  const verifyUrl = typeof window !== "undefined" && window.location.href 
    ? window.location.href 
    : `https://eyecard.ru/verify?id=${job_id}`;

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
            <div className={styles.propsList}>{product.features?.map((f, i) => <div key={i} className={styles.propItem}>{typeof f === 'string' ? f : <><span className={styles.propK}>{f.label || f.name || f.key}:</span>{f.value}</>}</div>)}</div>
            <div className={styles.imgWrap}><img src={productImageUrl} alt="Product" /></div>
          </div>
          <div className={styles.moduleCard}>
            <h3 className={styles.moduleTitle}>РАДИКАЛЫ</h3>
            <div className={styles.radarContainer} dangerouslySetInnerHTML={{ __html: vpEngines.createRadar('radicals', analysis.ideal.radicals, analysis.actual.radicals) }} />
            <div className={styles.evidenceBox}>{analysis.ideal.radicals?.radical_evidence}</div>
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
          <div className={styles.qrItem}>
            <div 
              className={styles.qrBox} 
              dangerouslySetInnerHTML={{ __html: vpEngines.createQRCodeSVG('https://eyecard.ru/#methodology') }} 
            />
            <span className={styles.qrLabel}>Методика</span>
          </div>
          <div className={styles.qrItem}>
            <div 
              className={styles.qrBox} 
              dangerouslySetInnerHTML={{ __html: vpEngines.createQRCodeSVG(verifyUrl) }} 
            />
            <span className={styles.qrLabel}>Проверить</span>
          </div>
          <div className={styles.qrItem}>
            <div 
              className={styles.qrBox} 
              dangerouslySetInnerHTML={{ __html: vpEngines.createQRCodeSVG('https://eyecard.ru') }} 
            />
            <span className={styles.qrLabel}>Сайт</span>
          </div>
          <div className={styles.qrItem}>
            <div 
              className={styles.qrBox} 
              dangerouslySetInnerHTML={{ __html: vpEngines.createQRCodeSVG('https://eyecard.ru/extension') }} 
            />
            <span className={styles.qrLabel}>Расширение</span>
          </div>
          <div className={styles.qrItem}>
            <div 
              className={styles.qrBox} 
              dangerouslySetInnerHTML={{ __html: vpEngines.createQRCodeSVG('https://eyecard.ru/gallery') }} 
            />
            <span className={styles.qrLabel}>Галерея</span>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>WWW.EYECARD.RU                                    JOB_ID: {job_id?.toUpperCase()}</div>
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
