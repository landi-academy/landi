// Reviews.tsx
'use client';
import { useEffect, useState } from 'react';
import { getReviewsPictures } from "@/libs/apis";
import { ReviewsPictures } from "@/types/reviewsPictures";
import styles from './Reviews.module.scss';
import ImageSlider from '../ImageSlider/ImageSlider';

const Reviews = () => {
  const [reviews, setReviews] = useState<ReviewsPictures | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getReviewsPictures();
      setReviews(data);
    };
    fetchData();
  }, []);

  if (!reviews) return <div>Loading...</div>;

  return (
    <section id='reviews' className={styles.reviews}>
      {/* <div className="container"> */}
        <h2 className={styles.title}>Dostawaj takie opinie</h2>
        <div className={styles.reviewsWrapper}>
          <ImageSlider images={reviews.images} />
        </div>
      {/* </div> */}
    </section>
  );
};

export default Reviews;