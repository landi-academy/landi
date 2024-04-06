'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { urlFor } from '@/libs/sanity';
import styles from './Carousel.module.scss';
import Slider from 'react-infinite-logo-slider';

type Props = {
  images: {
    _key: string;
    url: string;
  }[];
};

const Carousel: React.FC<Props> = ({ images }) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateWindowWidth = () => {
      setIsDesktop(window.innerWidth > 768); // Предположим, что десктоп начинается от 768px
    };

    window.addEventListener('resize', updateWindowWidth);
    updateWindowWidth(); // Инициализация при монтировании

    return () => window.removeEventListener('resize', updateWindowWidth);
  }, []);

  return (
    <Slider
      width="300px"
      duration={30}
      spacing={0}
      pauseOnHover={true}
      blurBorders={isDesktop} // Условно применяем blurBorders
      blurBoderColor={'#ffffff'}
      className={styles.slider}
    >
      {images.map((image) => (
        <Slider.Slide key={image._key}>
          <div className={styles.gridItem}>
            <Image
              className={styles.image}
              src={urlFor(image).url()}
              width={300}
              height={300}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="Gallery image"
            />
          </div>
        </Slider.Slide>
      ))}
    </Slider>
  );
};

export default Carousel;
