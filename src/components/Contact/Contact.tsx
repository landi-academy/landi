import styles from './Contact.module.scss';
import { Contact as ContactType } from '@/types/contact';
import { getContact } from '@/libs/apis';
import Image from 'next/image';
import { urlFor } from '@/libs/sanity';
import ContactForm from '../ContactForm/ContactForm';


const Contact = async () => {

  const contact: ContactType = await getContact();

  return (
    <section className={styles.contact}>
      <div className="container">
        <div className={styles.contactWrapper}>
          <div className={`${styles.contactFlex} ${styles.contactContent}`}>
              <h1 className={styles.contactTitle}>{contact.contactTitle}</h1>
              <p className={styles.contactDescription}>{contact.contactDescription}</p>
              <ContactForm />
          </div>
          <div className={`${styles.contactFlex}  ${styles.contactImage}`}>
            <div className={styles.contactImageOverlay}></div>
            <Image
              src={urlFor(contact.contactImage).url()}
              width={500}
              height={500}
              alt={contact.contactTitle}
              className={styles.img}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact