'use client';

import { FC, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { sendEmail } from '@/utils/send-email';

import styles from './ContactForm.module.scss';

export type FormData = {
  name: string;
  phone: string;
  email: string;
};

const ContactForm: FC = () => {

  const [message, setMessage] = useState<string | null>(null);

  const initialValues: FormData = {
    name: '',
    phone: '',
    email: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Imię jest wymagane'),
    phone: Yup.string().required('Telefon jest wymagany'),
    email: Yup.string().email('Nieprawidłowy adres email').required('Email jest wymagany'),
  });

    const onSubmit = async (values: FormData, { setSubmitting, resetForm }: FormikHelpers<FormData>) => {
    try {
      await sendEmail(values);
      setMessage('Otrzymałem Twoją wiadomość i wkrótce się z Tobą skontaktuję. Poczekaj chwilę :)');
      resetForm();
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
              <label htmlFor='name' className={styles.label}>Imię</label>
              <Field id='name' name='name' type='text' className={`${styles.inputField} w-full rounded-md`} />
              <ErrorMessage name='name' component='div' className={styles.error} />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor='phone' className={styles.label}>Telefon</label>
              <Field id='phone' name='phone' type='tel' className={`${styles.inputField} w-full rounded-md`} />
              <ErrorMessage name='phone' component='div' className={styles.error} />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor='email' className={styles.label}>E-mail</label>
              <Field id='email' name='email' type='email' className={`${styles.inputField} w-full rounded-md`} />
              <ErrorMessage name='email' component='div' className={styles.error} />
            </div>
            <div>
              <button type='submit' className={styles.sentBtn} disabled={isSubmitting}>Wyślij wiadomość</button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ContactForm;