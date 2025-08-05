import { Big_Shoulders_Display } from "next/font/google";
import { LearningSection } from "@/types/learningSection";
import { getLearningSection } from "@/libs/apis";
import styles from "./Learning.module.scss";
import AccordionBlock from "../AccordionBlock/AccordionBlock";
import Image from "next/image";
import { urlFor } from "@/libs/sanity";
import Carousel from "../Carousel/Carousel";
import Animation from "../Animation/Animation";

const Learning = async () => {
  const learning: LearningSection = await getLearningSection();

  return (
    <section id="learning" className={styles.learning}>
      <div className="container">
        <h2 className={styles.learningMainTitle}>{learning.title}</h2>
        <p className={styles.learningDescription}>{learning.description}</p>
      </div>
      <div className={styles.learningWrapper}>
        <Animation>
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
                          <li className={styles.subLabel} key={sub._key}>
                            {sub.subLabel}
                          </li>
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
                className={styles.picture}
              />
            </div>
          </div>
        </Animation>
        {/* <Animation>
          <div className={styles.learningBlock}>
            <div className={styles.learningImage}>
              <Image
                src={urlFor(learning.imagePractice).url()}
                alt="Praktyka"
                width={1000}
                height={1000}
                className={styles.picture}
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
          </Animation>
        <Animation>
          <div className={styles.learningBlock}>
            <div className={styles.learningContent}>
              <div className={styles.learningText}>
                <h3 className={styles.learningTitle}>Certyfikat</h3>
                <ul>
                  {learning?.certificateList.map((item) => (
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
                src={urlFor(learning.imageCertificate).url()}
                alt="Serfitikat"
                width={1000}
                height={1000}
                className={styles.picture}
              />
            </div>
            <div className={styles.certificateImage}>
              <Image
                src={urlFor(learning.imageCertificate).url()}
                alt="Serfitikat"
                width={1000}
                height={1000}
                className={styles.picture}
              />
            </div>
          </div>
        </Animation> */}
      </div>
      <div className={styles.gallery}>
        <div className="container">
          <h2 className={styles.galleryTitle}>Tak zmienią się Twoje włosy</h2>
        </div>
        <Carousel images={learning.images} />
      </div>
    </section>
  );
};

export default Learning;
