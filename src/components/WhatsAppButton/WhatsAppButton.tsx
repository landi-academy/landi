"use client";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import styles from "./WhatsAppButton.module.scss";

const WhatsAppButton = () => {
  const phone = "48604296556";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (typeof window !== "undefined") {
      const pageUrl = window.location.href;
      const message =
        "Dzień dobry! Interesuje mnie nanoplastia włosów. Proszę powiedzieć, kiedy macie wolne terminy?";
      const encodedText = encodeURIComponent(message);
      const finalUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedText}`;

      if (window.dataLayer) {
        window.dataLayer.push({
          event: "whatsapp_click",
          phone_number: phone,
          page_url: pageUrl,
        });
      }

      window.open(finalUrl, "_blank");
    }
  };

  return (
    <a
      href="#"
      onClick={handleClick}
      className={styles.whatsappButton}
      aria-label="Napisz do nas teraz"
    >
      <FaWhatsapp size={20} />
      <span className={styles.label}>Napisz do nas teraz</span>
    </a>
  );
};

export default WhatsAppButton;
