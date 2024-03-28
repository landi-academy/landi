import { Big_Shoulders_Display } from "next/font/google";
import { LearningSection } from "@/types/learningSection";
import { getLearningSection } from "@/libs/apis";
import styles from './Learning.module.scss';
import AccordionBlock from "../AccordionBlock/AccordionBlock";
import Image from "next/image";
import { urlFor } from "@/libs/sanity";
import Carousel from "../Carousel/Carousel";

const Learning = async () => {

  const learning: LearningSection = await getLearningSection();

  // Структурируем данные для AccordionBlock
  const sections = [
    { header: 'Część teoretyczna', items: learning?.theoryList ?? [] },
    { header: 'Część praktyczna', items: learning?.practiceList ?? [] },
  ];

  return (
    <section className={styles.learning}>
      <div className="container">
        <h2 className={styles.learningMainTitle}>{learning.title}</h2>
        <p className={styles.learningDescription}>{learning.description}</p>
      </div>
      <div className={styles.learningWrapper}>
        <div className={styles.learningBlock}>
          <div className={styles.learningContent}>
            <div className={styles.learningText}>
              <h3 className={styles.learningTitle}>Część teoretyczna</h3>
              <ul>
                {learning?.theoryList.map((item) => (
                  <li className={styles.itemLabel} key={item._key}>
                    {item.label}
                    <ul className={styles.subItems}>
                      {item.subMenu?.map((sub) => (
                        <li className={styles.subLabel} key={sub._key}>{sub.subLabel}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.learningImage}>
            <Image
              src={urlFor(learning.imageTheory).url()}
              alt="Teoria"
              width={1000}
              height={1000}
            />
          </div>
        </div>
        <div className={styles.learningBlock}>
          <div className={styles.learningImage}>
            <Image
              src={urlFor(learning.imagePractice).url()}
              alt="Praktyka"
              width={1000}
              height={1000}
            />
          </div>
          <div className={styles.learningContent}>
            <div className={styles.learningText}>
              <h3 className={styles.learningTitle}>Część praktyczna</h3>
              <ul>
                {learning?.practiceList.map((item) => (
                  <li className={styles.itemLabel} key={item._key}>
                    {item.label}
                    <ul className={styles.subItems}>
                      {item.subMenu?.map((sub) => (
                        <li className={styles.subLabel} key={sub._key}>{sub.subLabel}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.gallery}>
        <h2 className={styles.galleryTitle}>Nauczysz się to robić</h2>
        <Carousel images={learning.images} />
      </div>
      <div className={styles.certificate}>
        <h2 className={styles.certificateTitle}>Certyfikat</h2>
        <Image
          src={urlFor(learning.imageCertificate).url()}
          alt="Certyfikat"
          width={1000}
          height={1000}
        />
      </div>
    </section>
  )
}

export default Learning