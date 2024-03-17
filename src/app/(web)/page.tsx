import About from "@/components/About/About";
import Contact from "@/components/Contact/Contact";
import Offer from "@/components/Offer/Offer";
import Reason from "@/components/Reason/Reason";
import Reviews from "@/components/Reviews/Reviews";

export default function Home() {
  return (
    <main>
      <Offer />
      <About />
      <Reason />
      <Reviews />
      <Contact />
    </main>
  );
}
