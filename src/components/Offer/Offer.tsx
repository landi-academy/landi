import { Roboto, Give_You_Glory, Gochi_Hand, Fuzzy_Bubbles } from "next/font/google";
import { OfferSection } from '@/types/offerSection';
import { getOfferSection } from '@/libs/apis';
import styles from './Offer.module.scss';
import Image from 'next/image';
import { urlFor } from '@/libs/sanity';

import bgImage from '@/images/bg-img.png'

const roboto = Roboto({ weight: ['100', '300', '400', '700', '900'], subsets: ["latin"] });
const giveYouGlory = Give_You_Glory({ weight: ['400'], subsets: ["latin"] });
const gochiHand = Gochi_Hand({ weight: ['400'], subsets: ["latin"] });
const fuzzyBubbles = Fuzzy_Bubbles({ weight: ['400', '700'], subsets: ["latin"] });


const Offer = async () => {

  const offer: OfferSection = await getOfferSection();
  
  // console.log("offer", offer.bulletsList);

  return (
    <section id='offer' className={styles.offer}>
      <div className="container">
        <div className={styles.offerWrapper}>
          <div className={styles.offerContent}>
            <p className={`${styles.offerPreTitle} ${fuzzyBubbles.className}`}>{offer.preTitle}</p>
            <h1 className={styles.offerTitle}>{offer.title}</h1>
            <ul className={styles.offerList}>
              {offer.offersList.map((offerItem, index) => (
                <li key={index} className={styles.offerItem}>{offerItem.text}</li>
              ))}
            </ul>
            <p className={styles.offerDescription}>{offer.description}</p>
            <div className={styles.priceBlock}>
              <p className={`${styles.priceOld} ${fuzzyBubbles.className}`}>{offer.priceOld} zł</p>
              <p className={`${styles.priceNew} ${fuzzyBubbles.className}`}>{offer.priceNew} zł</p>
            </div>
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
              {offer.bulletsList.map((bullet, index) => (
                <div key={bullet._key} className={`${styles.highlight} ${styles[`highlight${index + 1}`]}`}>
                  <div className={styles.highlightText}>
                    {bullet.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}

export default Offer;