// AccordionBlock.tsx
'use client';
import React, { useState } from 'react';
import styles from './AccordionBlock.module.scss';
import Image from 'next/image';
import shevronDown from '../../images/shevron-down.svg';

type Section = {
  header: string; // Заголовок для секции аккордеона
  items: Array<{
    label: string;
    subMenu: Array<{ subLabel: string }>;
  }>;
};

type AccordionProps = {
  sections: Section[]; // Массив секций
};

const AccordionBlock: React.FC<AccordionProps> = ({ sections }) => {
  const [openIndex, setOpenIndex] = useState(0); // Индекс открытой секции, 0 по умолчанию

  return (
    <div className={styles.accordion}>
      {sections.map((section, index) => (
        <div key={index}>
          <div
            className={styles.accordionHeader}
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)} // Переключение между открытием и закрытием секций
          >
            {section.header}
            <Image
              className={styles.chevron}
              src={shevronDown}
              alt="Chevron Down"
              style={{ transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)' }}
              width={30}
              height={30}
            />
          </div>
          <div
            className={styles.accordionContent}
            style={{
              maxHeight: openIndex === index ? '1000px' : '0',
              transition: 'max-height 0.5s ease',
              overflow: 'hidden',
            }}
          >
            <div className={styles.itemsWrapper}>
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className={styles.accordionItem}>
                  <h3 className={styles.itemLabel}>{item.label}</h3>
                  <ul className={styles.subItems}>
                    {item.subMenu?.map((sub) => (
                      <li className={styles.subLabel} key={sub.subLabel}>{sub.subLabel}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccordionBlock;
