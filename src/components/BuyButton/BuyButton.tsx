'use client';
import React from 'react';
import styles from './BuyButton.module.scss'; // Создайте соответствующий CSS модуль для стилей

const BuyButton = ({ children }: any) => {
  const handleBuyClick = async () => {
    // Здесь отправляем запрос к вашему API для создания сессии Stripe Checkout
    const response = await fetch('/api/checkout', { method: 'POST' });
    const session = await response.json();

    // Перенаправляем пользователя на URL оплаты
    window.location.href = session.url;
  };

  return (
    <button
      className={styles.buyButton}
      onClick={handleBuyClick}
    >
      {children}
    </button>
  );
};

export default BuyButton;
