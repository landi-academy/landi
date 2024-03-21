import { Big_Shoulders_Display } from "next/font/google";
import { LearningSection } from "@/types/learningSection";
import { getLearningSection } from "@/libs/apis";
import styles from './Learning.module.scss';
import AccordionBlock from "../AccordionBlock/AccordionBlock";
import Image from "next/image";
import { urlFor } from "@/libs/sanity";

const Learning = async () => {

  const learning: LearningSection = await getLearningSection();

  // Структурируем данные для AccordionBlock
  const sections = [
    { header: 'Część teoretyczna', items: learning?.theoryList ?? [] },
    { header: 'Część praktyczna', items: learning?.practiceList ?? [] },
  ];

  // console.log("image theory", learning.imageTheory);

  return (
    <section className={styles.learning}>
      {/* <div className="container">
        <div className={styles.learningWrapper}>
          <div className={styles.learningContent}>
            <h2 className={styles.learningTitle}>{learning.title}</h2>
            <p className={styles.learningDescription}>{learning.description}</p>
            <div className={styles.accordionWrapper}>
              <AccordionBlock sections={sections} />
            </div>
          </div>
        </div>
      </div> */}
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
            <div className={styles.subBlocks}>
              <div className={styles.subBlock}>
                <h3 className={styles.subBlockTitle}>1</h3>
                <p className={styles.subBlockText}>Blok</p>
              </div>
              <div className={styles.subBlock}>
                <h3 className={styles.subBlockTitle}>E-Book</h3>
                {/* <p className={styles.subBlockText}>Hours</p> */}
              </div>
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
            <div className={styles.subBlocks}>
              <div className={styles.subBlock}>
                <h3 className={styles.subBlockTitle}>2</h3>
                <p className={styles.subBlockText}>Blocks</p>
              </div>
              <div className={styles.subBlock}>
                <h3 className={styles.subBlockTitle}>1</h3>
                <p className={styles.subBlockText}>Day</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Learning