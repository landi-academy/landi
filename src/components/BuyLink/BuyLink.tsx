"use client";
import React from "react";
import styles from "./BuyLink.module.scss"; // Создайте соответствующий CSS модуль для стилей
import Link from "next/link";

const BuyLink = ({ children }: any) => {
  return (
    <Link
      href="http://landiroom.booksy.com/h/"
      target="_blank"
      className={styles.buyButton}
    >
      {children}
    </Link>
  );
};

export default BuyLink;
