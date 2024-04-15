'use client';

import { FC, useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import styles from './ContactCertificate.module.scss';

export type FormData = {
  name: string;
  email: string;
  agreedToPolicy: boolean;
};

export interface ContactFormProps {
  onFormSubmitSuccess?: () => void; // Функция обратного вызова для успешной отправки
}

const ContactCertificate: FC<ContactFormProps> = ({ onFormSubmitSuccess }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [filled, setFilled] = useState({ name: false, phone: false, email: false });

    useEffect(() => {
    const interval = setInterval(() => {
      ['name', 'phone', 'email'].forEach(field => {
        const input = document.getElementById(field) as HTMLInputElement;
        if (input && input.value) {
          setFilled(f => ({ ...f, [field]: true }));
        }
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilled(prev => ({ ...prev, [name]: value.trim() !== '' }));
  };

  const initialValues: FormData = {
    name: '',
    email: '',
    agreedToPolicy: false,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Imię jest wymagane'),
    email: Yup.string().email('Nieprawidłowy адрес email').required('Email jest wymagany'),
    agreedToPolicy: Yup.boolean()
      .required('Wymagana zgoda')
      .oneOf([true], 'Wymagana jest zgoda na przetwarzanie danych osobowych'),
  });

  const onSubmit = async (values: FormData, { setSubmitting, resetForm }: FormikHelpers<FormData>) => {
    setSubmitting(true);
    try {
      const response = await axios.post('/api/email-cert', values);
      if (response.data.message === 'Email sent') {
        setMessage('Dziękuję! Wkrótce wyślę e-mailem Twój osobisty certyfikat :)');
        resetForm({});
        setFilled({ name: false, phone: false, email: false }); // Reset the filled state
        setTimeout(() => {
          onFormSubmitSuccess && onFormSubmitSuccess();
        }, 5000);
      } else {
        throw new Error('Server responded with an error');
      }
    } catch (error) {
      setMessage('Wystąpił błąd podczas wysyłania formularza');
    } finally {
      setSubmitting(false);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };


  return (
    <>
      {message && (
        <div className={styles.popup}>
          {message}
        </div>
      )}
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className={styles.inputWrapper}>
              <label htmlFor='name' className={`${styles.label} ${filled.name ? styles.filled : ''}`}>Imię i nazwisko (dla certyfikatu)</label>
              <Field id='name' name='name' type='text' className={`${styles.inputField} w-full rounded-md`} onBlur={handleBlur} />
              <ErrorMessage name='name' component='div' className={styles.error} />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor='email' className={`${styles.label} ${filled.email ? styles.filled : ''}`}>E-mail (gdzie wysłać zaświadczenie)</label>
              <Field id='email' name='email' type='email' className={`${styles.inputField} w-full rounded-md`} onBlur={handleBlur} />
              <ErrorMessage name='email' component='div' className={styles.error} />
            </div>
            <div className={styles.customCheckbox}>
              <Field type="checkbox" name="agreedToPolicy" id="agreedToPolicy" />
              <label htmlFor="agreedToPolicy">Wyrażam zgodę na wysyłanie informacji handlowych i reklamowych na podany przeze mnie adres e-mail</label>
            </div>
            <div>
              <button type='submit' className={styles.sentBtn} disabled={isSubmitting}>Uzyskać certyfikat</button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ContactCertificate;