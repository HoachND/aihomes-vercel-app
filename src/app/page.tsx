import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import CEO from "@/components/CEO";
import Commitment from "@/components/Commitment";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Widgets from "@/components/Widgets";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 smooth-scroll">
      <Navbar />
      <Hero />
      <About />
      <CEO />
      <Commitment />
      <Testimonials />
      <Projects />
      <ContactForm />
      <Footer />
      <Widgets />
    </main>
  );
}
