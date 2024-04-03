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
    if (reviews) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setShowPopup(true);
          }
        },
        { threshold: 0.3 }
      );

      if (reviewsRef.current) {
        observer.observe(reviewsRef.current);
      }

      return () => {
        if (reviewsRef.current) {
          observer.unobserve(reviewsRef.current);
        }
      };
    }
  }, [reviews]);

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
          onFormSubmitSuccess={() => setShowPopup(false)} // Передача функции onClose как onFormSubmitSuccess
        />
      )}
    </>
  );
};

export default Reviews;