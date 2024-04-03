import { TfiClose } from "react-icons/tfi";
import ContactForm from '../ContactForm/ContactForm'
import styles from './ModalOnScroll.module.scss';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalOnScroll = ({ isOpen, onClose }: ModalProps) => {
  return (
    <div className={styles.overlay}>
      <div
        className={styles.modalOnScroll}
      >
        <button
          className={styles.closeBtn}
          onClick={onClose}
        >
          <TfiClose size={30} color="#fff" />
        </button>
        <div
          className={styles.modalOnScrollContent}
        >
          <h2 className={styles.title}>Zostaw swoje dane kontaktowe</h2>
          <p className={styles.description}>Oddzwonimy do Ciebie w ciągu 24 godzin</p>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}

export default ModalOnScroll;