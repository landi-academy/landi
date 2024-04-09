'use client';
import React, { useEffect, useRef, useState } from 'react';
import { getReviewsPictures } from "@/libs/apis";
import { ReviewsPictures } from "@/types/reviewsPictures";
import styles from './Reviews.module.scss';
import ImageSlider from '../ImageSlider/ImageSlider';
import ModalOnScroll from '../ModalOnScroll/ModalOnScroll';

const Reviews = () => {
  const [reviews, setReviews] = useState<ReviewsPictures | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const reviewsRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getReviewsPictures();
      setReviews(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Убедимся, что модальное окно еще не показывалось в этой сессии
    const isModalShown = sessionStorage.getItem('isModalShown') === 'true';
    
    if (reviews && !isModalShown) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !sessionStorage.getItem('isModalShown')) {
            setShowPopup(true);
            sessionStorage.setItem('isModalShown', 'true'); // Помечаем, что модальное окно было показано
          }
        },
        { threshold: 0.3 }
      );

      if (reviewsRef.current) {
        observer.observe(reviewsRef.current);
      }

      return () => observer.disconnect(); // Используем disconnect для чистки
    }
  }, [reviews]); // Зависимость от reviews гарантирует, что этот эффект проверит условие после загрузки отзывов

  if (!reviews) return <div>Loading...</div>;

  return (
    <>
      <section ref={reviewsRef} id='reviews' className={styles.reviews}>
        <h2 className={styles.title}>Dostawaj takie opinie</h2>
        <div className={styles.reviewsWrapper}>
          <ImageSlider images={reviews.images} />
        </div>
      </section>
      {showPopup && (
        <ModalOnScroll
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default Reviews;