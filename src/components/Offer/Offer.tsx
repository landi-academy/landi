import { OfferSection } from '@/types/offerSection';
import { getOfferSection } from '@/libs/apis';
import styles from './Offer.module.scss';
import Image from 'next/image';
import { urlFor } from '@/libs/sanity';

import bgImage from '@/images/bg-img.png'

const Offer = async () => {

  const offer: OfferSection = await getOfferSection();

  return (
    <section className={styles.offer}>
      <div className="container">
        <div className={styles.offerWrapper}>
          <div className={styles.offerContent}>
            <h1 className={styles.offerTitle}>
              <span className={styles.firstWordTitle}>{offer.title.split(' ')[0]}</span>
              {/* Проверяем, есть ли в заголовке более одного слова, и если да, добавляем оставшийся текст */}
              {offer.title.split(' ').length > 1 ? ` ${offer.title.split(' ').slice(1).join(' ')}` : ''}
            </h1>
            <p className={styles.offerDescription}>{offer.description}</p>
            <ul className={styles.offerList}>
              {offer.offersList.map((offerItem, index) => (
                <li key={index} className={styles.offerItem}>{offerItem.text}</li>
              ))}
            </ul>
            <button className={styles.offerButton}>{offer.textButton}</button>
          </div>
          <div className={styles.offerImage}>
            <Image
              src={urlFor(offer.image).url()}
              width={500}
              height={500}
              alt={offer.name}
              className={styles.img}
            />
            <Image className={styles.imageBg} src={bgImage} alt="bg" />
            <div className={styles.lineBlock}>
              <svg className={styles.line} xmlns="http://www.w3.org/2000/svg" width="291" height="581" viewBox="0 0 291 581" fill="none">
                <path d="M291 580C130.837 580 1 450.386 1 290.5C1 130.614 130.837 1 291 1" stroke="url(#paint0_linear_67_63)" strokeOpacity="0.6" strokeWidth="1.5"></path> <defs> <linearGradient id="paint0_linear_67_63" x1="146" y1="1" x2="146" y2="509" gradientUnits="userSpaceOnUse"> <stop stopColor="white"></stop> <stop offset="1" stopColor="white" stopOpacity="0"></stop> </linearGradient> </defs>
              </svg>
              <div className={`${styles.highlight} ${styles.highlight1}`}></div>
              <div className={`${styles.highlight} ${styles.highlight2}`}></div>
              <div className={`${styles.highlight} ${styles.highlight3}`}></div>
              <div className={`${styles.highlight} ${styles.highlight4}`}></div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}

export default Offer;