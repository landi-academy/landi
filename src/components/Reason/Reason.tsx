'use client';
import { getWhySection } from "@/libs/apis"
import { WhySection } from "@/types/whySection"
import Image from "next/image"
import styles from './Reason.module.scss';
import { RichText } from "../RichText/RichText";
import { PortableText } from '@portabletext/react'
import { useEffect, useState } from 'react';
import { urlFor } from "@/libs/sanity";
import ScrollLink from "../ScrollLink/ScrollLink";
import BuyButton from "../BuyButton/BuyButton";
import Animation from "../Animation/Animation";

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
              <Animation>
                <div className={styles.imageBlock}>
                  <Image
                    src={urlFor(reason.image).url()}
                    width={350}
                    height={350}
                    alt="landi academy"
                    className={styles.img}
                  />
                  </div>
              </Animation>
              <div className={styles.buttonBlock}>
                {/* <ScrollLink href="#contact">
                  <button className={styles.reasonBtn}>Kup szkolenie</button>
                </ScrollLink> */}
                <BuyButton>Kup szkolenie</BuyButton>
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