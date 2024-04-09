import { Caveat } from "next/font/google";
import styles from './Contact.module.scss';
import { Contact as ContactType } from '@/types/contact';
import { getContact } from '@/libs/apis';
import Image from 'next/image';
import { urlFor } from '@/libs/sanity';
import ContactForm from '../ContactForm/ContactForm';
import Link from "next/link";

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
            {/* <ContactForm /> */}
            <Link
              href="#"
              className={styles.buyLink}
            >
              Kupuj ze zniżką
            </Link>
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
          {/* <div className={`${styles.contactFlex}  ${styles.contactImage}`}>
            <Image
              src={urlFor(contact.contactImage).url()}
              width={500}
              height={500}
              alt={contact.contactTitle}
              className={styles.img}
            />
          </div> */}
        </div>
      </div>
    </section>
  )
}

export default Contact