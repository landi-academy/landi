// 'use client';
import { Caveat } from "next/font/google";
import styles from './Contact.module.scss';
import { Contact as ContactType } from '@/types/contact';
import { getContact } from '@/libs/apis';
import BuyButton from "../BuyButton/BuyButton";

const caveat = Caveat({ weight: ['400', '700'], subsets: ["latin"] });

const Contact = async () => {

  const contact: ContactType = await getContact();

  return (
    <section id='contact' className={styles.contact}>
      <div className="container">
        <div className={styles.contactWrapper}>
          <div className={`${styles.contactFlex} ${styles.contactContent}`}>
              <h1 className={styles.contactTitle}>{contact.contactTitle}</h1>
              <p className={styles.contactDescription}>{contact.contactDescription}</p>
            {/* <button
              className={styles.buyLink}
            >
              Kup ze zniżką
            </button> */}
            <BuyButton>Kup ze zniżką</BuyButton>
          </div>
          <div className={styles.contactFlex}>
            <ul className={styles.contactBulletList}>
              {contact?.contactBulletList.map((item) => (
                <li className={styles.itemLabel} key={item._key}>
                  {item.label}
                </li>
              ))}
            </ul>
            <p className={styles.shortText}>{contact.shortText}</p>
              <div className={styles.priceBlock}>
                <p className={`${styles.priceOld} ${caveat.className}`}>{contact.priceOld} zł</p>
                <p className={`${styles.priceNew} ${caveat.className}`}>{contact.priceNew} zł</p>
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact