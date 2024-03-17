// ImageSlider.tsx
'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "swiper/css/effect-coverflow";
import Image from 'next/image';
import { urlFor } from "@/libs/sanity";
import { SanityImage } from "@/types/reviewsPictures"; // Обновите импорт типа, если необходимо
import styles from './ImageSlider.module.scss';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type ImageSliderProps = {
  images: SanityImage[]; // Используйте обновленный тип
};

const ImageSlider = ({ images }: ImageSliderProps) => {
  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={false}
        slidesPerView={2.9}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Navigation]}
        navigation={{
          nextEl: '.nextBtn',
          prevEl: '.prevBtn',
        }}
        spaceBetween={40}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          1024: {
            slidesPerView: 2.9,
            spaceBetween: 40
          },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={image._key || index}> {/* Использование index как запасного ключа */}
            <div className={styles.imageContainer}>
              {image.asset && ( // Проверка наличия image.asset
                <Image
                  src={urlFor(image.asset).url()}
                  layout="fill" 
                  objectFit="contain" 
                  alt={image.alt || 'Review image'}
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="navButtons">
        <button className="prevBtn">
          <FaChevronLeft fontSize="1.5em" />
        </button>
        <button className="nextBtn">
          <FaChevronRight fontSize="1.5em" />
        </button>
      </div>
    </>
  );
};

export default ImageSlider;