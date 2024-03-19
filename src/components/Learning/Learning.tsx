import { LearningSection } from "@/types/learningSection";
import { getLearningSection } from "@/libs/apis";
import styles from './Learning.module.scss';
import AccordionBlock from "../AccordionBlock/AccordionBlock";

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
        <div className={styles.learningWrapper}>
          <div className={styles.learningContent}>
            <h2 className={styles.learningTitle}>{learning.title}</h2>
            <p className={styles.learningDescription}>{learning.description}</p>
            <div className={styles.accordionWrapper}>
              <AccordionBlock sections={sections} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Learning