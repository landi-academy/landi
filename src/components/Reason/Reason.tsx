'use client';
import { Caveat } from "next/font/google";
import { getWhySection } from "@/libs/apis"
import { WhySection } from "@/types/whySection"
import Image from "next/image"
import styles from './Reason.module.scss';
import { RichText } from "../RichText/RichText";
import { PortableText } from '@portabletext/react'
import { useEffect, useState } from 'react';
import { urlFor } from "@/libs/sanity";

const caveat = Caveat({ weight: ['400', '700'], subsets: ["latin"] });

const Reason = () => {

  const [reason, setReason] = useState<WhySection | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getWhySection();
      setReason(data);
    };
    fetchData();
  }, []);

  if (!reason) return <div>Loading...</div>;

  return (
    <section id="reason" className={styles.reason}>
      <div className="container">
        {/* <h2 className={styles.title}>{reason.title}</h2> */}
        <div className={styles.reasonWrapper}>
          <div className={styles.reasonContent}>
            <div className={styles.reasonFlex}>
              <PortableText
                value={reason.bodyLeft}
                components={RichText}
              />
            </div>
            <div className={styles.reasonFlex}>
              <div className={styles.imageBlock}>
                <Image
                  src={urlFor(reason.image).url()}
                  width={350}
                  height={350}
                  alt="landi academy"
                  className={styles.img}
                />
              </div>
              {/* <div className={styles.priceBlock}>
                <p className={`${styles.priceOld} ${caveat.className}`}>{reason.priceOld} zł</p>
                <p className={`${styles.priceNew} ${caveat.className}`}>{reason.priceNew} zł</p>
              </div> */}
              <div className={styles.buttonBlock}>
                <button className={styles.reasonBtn}>Zarejestruj się</button>
              </div>
            </div>
            <div className={styles.reasonFlex}>
              <PortableText
                value={reason.bodyRight}
                components={RichText}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Reason