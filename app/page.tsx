import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Gallery from "@/components/home/Gallery";
import About from "@/components/home/About";
import Testimonials from "@/components/home/Testimonials";
import BookingCTA from "@/components/home/BookingCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Gallery />
      <About />
      <Testimonials />
      <BookingCTA />
    </>
  );
}
