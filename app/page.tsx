import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import AIConsulting from "@/components/AIConsulting";
import Products from "@/components/Products";
import Training from "@/components/Training";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";

export default function Home() {
  return (
    <main>
      <CursorGlow />
      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <AIConsulting />
      <Products />
      <Training />
      <Contact />
      <Footer />
    </main>
  );
}
