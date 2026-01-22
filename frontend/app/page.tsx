import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SubjectExplorer from "@/components/SubjectExplorer";
import ProgramsSection from "@/components/home/ValuePropsSection";
import AIVideoHero from "@/components/home/VideoProps";
import ServiceSection from "@/components/home/ServiceSection";
import FAQSection from "@/components/home/FAQSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProgramsSection />
      <SubjectExplorer />
      <AIVideoHero />
      <ServiceSection />
      <FAQSection />
      <TestimonialSection />
      <NewsletterSection />
      <Footer />
    </>
  );
}
