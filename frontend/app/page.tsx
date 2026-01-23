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
import ResumeLearning from "@/components/ResumeLearning";
import SubjectProgress from "@/components/SubjectProgress";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProgramsSection />
      <section className="mx-auto max-w-6xl px-6 py-10">
        <ResumeLearning />
      </section>
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
