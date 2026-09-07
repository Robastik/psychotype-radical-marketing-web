'use client';

import { useState, useSyncExternalStore } from 'react';
import styles from './CookieConsent.module.css';

const CONSENT_KEY = 'cookie-consent';

function getServerSnapshot() {
  return 'accepted';
}

function getSnapshot() {
  if (typeof window === 'undefined') {
    return 'accepted';
  }
  try {
    return localStorage.getItem(CONSENT_KEY) || 'pending';
  } catch {
    return 'pending';
  }
}

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

export default function CookieConsent() {
  const storedConsent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    try {
      localStorage.setItem(CONSENT_KEY, 'accepted');
    } catch {
      // ignore write errors
    }
    setAccepted(true);
  };

  if (accepted || storedConsent === 'accepted') {
    return null;
  }

  return (
    <div className={styles.banner} role="region" aria-label="Уведомление о cookies">
      <div className={styles.content}>
        <p className={styles.text}>
          Мы используем файлы cookies для улучшения работы сайта и большего удобства его использования.
          Более подробную информацию об использовании файлов cookies и правилах обработки персональных
          данных можно найти{' '}
          <a href="/privacy" className={styles.link}>
            здесь
          </a>
          . Продолжая пользоваться сайтом, Вы подтверждаете, что были проинформированы об использовании
          файлов cookies и согласны с нашими правилами обработки персональных данных. Вы можете отключить
          файлы cookies в настройках Вашего браузера.
        </p>
        <button
          type="button"
          className={styles.confirmBtn}
          onClick={handleAccept}
          aria-label="Принимаю использование cookies"
        >
          Принимаю
        </button>
      </div>
    </div>
  );
}
