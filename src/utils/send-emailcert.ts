import { FormData } from "@/components/ContactForm/ContactForm";

export function sendEmail(data: FormData) {
  const apiEndpoint = '/api/email-cert';

  fetch(apiEndpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      alert(response.message);
    })
    .catch((err) => {
      alert(err);
    });
}