import About from "@/components/About/About";
import Contact from "@/components/Contact/Contact";
import Learning from "@/components/Learning/Learning";
import Offer from "@/components/Offer/Offer";
import Reason from "@/components/Reason/Reason";
import Reviews from "@/components/Reviews/Reviews";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";

export default function Home() {
  return (
    <main>
      <Offer />
      <About />
      <Reason />
      <Learning />
      <Reviews />
      <Contact />
      <WhatsAppButton />
    </main>
  );
}
