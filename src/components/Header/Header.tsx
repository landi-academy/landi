// Navbar.tsx
'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { getHeader } from "@/libs/apis";
import { urlFor } from "@/libs/sanity";
import { motion } from 'framer-motion';
import { Header as HeaderType } from "@/types/header";
import styles from "./Header.module.scss";

const Header = () => {
  const [navbarData, setNavbarData] = useState<HeaderType | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const fetchData = async () => {
    try {
      const data: HeaderType = await getHeader();
      setNavbarData(data);
    } catch (error) {
      console.error('Error fetching Navbar data:', error);
    }
  };

  useEffect(() => {
    fetchData();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenSubMenu(null);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(`.${styles.menuItem}`)) {
        setOpenSubMenu(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setOpenSubMenu(null);
  };

  const toggleSubMenu = (label: string) => {
    setOpenSubMenu(openSubMenu === label ? null : label);
  };

  // Функция закрытия меню при клике на ссылку
  const handleLinkClick = () => {
    if (isMobile) {
      setIsMenuOpen(false);
      setOpenSubMenu(null);
    }
  };

  if (!navbarData) {
    return null;
  }

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={`${styles.headerWrapper} ${isMenuOpen ? styles.menuOpen : ''}`}>
          <div className={styles.logo}>
            <Link  className={styles.logoLink} onClick={handleLinkClick} href="/">
              <Image
                alt="Orzel Realty Logo"
                src={urlFor(navbarData.logo).url()}
                width={200}
                height={200}
                className={styles.logoImage}
              />
            </Link>
          </div>

          {isMobile && (
            <div className={styles.burgerIcon} onClick={toggleMenu}>
              <div className={`${styles.bar} ${isMenuOpen ? styles.rotateBar1 : ''}`} />
              <div className={`${styles.bar} ${isMenuOpen ? styles.hideBar : ''}`} />
              <div className={`${styles.bar} ${isMenuOpen ? styles.rotateBar2 : ''}`} />
            </div>
          )}

          {(isMobile && isMenuOpen) || !isMobile ? (
            <motion.nav
              className={`${styles.navbar} ${isMenuOpen ? styles.open : ''}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ul className={styles.menuItems}>
                {navbarData.menuItems.map((menuItem, index) => (
                  <li key={index} className={styles.menuItem} onClick={() => toggleSubMenu(menuItem.label)}>
                    <Link className={styles.menuItemLink} onClick={handleLinkClick} href={menuItem.link}>
                      {menuItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;