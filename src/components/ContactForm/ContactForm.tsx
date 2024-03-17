'use client';

import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { sendEmail } from '@/utils/send-email';

import styles from './ContactForm.module.scss';

export type FormData = {
  name: string;
  phone: string;
  email: string;
};

const ContactForm: FC = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [nameFilled, setNameFilled] = useState(false);
  const [phoneFilled, setPhoneFilled] = useState(false);
  const [emailFilled, setEmailFilled] = useState(false);

  function onSubmit(data: FormData) {
    sendEmail(data);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<boolean>>) => {
    const value = event.target.value;
    if (value.trim() !== '') {
      setState(true);
    } else {
      setState(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputWrapper}>
        <label htmlFor='name' className={`${styles.label} ${nameFilled ? styles.filled : ''}`}>
          Imię
        </label>
        <input
          id='name'
          type='text'
          className={`${styles.inputField} w-full rounded-md`}
          {...register('name', { required: true })}
          onChange={(e) => handleInputChange(e, setNameFilled)}
        />
      </div>
      <div className={styles.inputWrapper}>
        <label htmlFor='phone' className={`${styles.label} ${phoneFilled ? styles.filled : ''}`}>
          Telefon
        </label>
        <input
          id='phone'
          type='phone'
          className={`${styles.inputField} w-full rounded-md`}
          {...register('phone', { required: true })}
          onChange={(e) => handleInputChange(e, setPhoneFilled)}
        />
      </div>
      <div className={styles.inputWrapper}>
        <label htmlFor='email' className={`${styles.label} ${emailFilled ? styles.filled : ''}`}>
          E-mail
        </label>
        <input
          id='email'
          type='email'
          className={`${styles.inputField} w-full rounded-md`}
          {...register('email', { required: true })}
          onChange={(e) => handleInputChange(e, setEmailFilled)}
        />
      </div>
      <div>
        <button className={styles.sentBtn}>
          Wyślij wiadomość
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
