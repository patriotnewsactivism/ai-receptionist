import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import VoicePlayground from "@/components/VoicePlayground";
import KnowledgeBase from "@/components/KnowledgeBase";
import LiveQA from "@/components/LiveQA";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080810]">
      <Navbar />
      <Hero />
      <Features />
      <VoicePlayground />
      <KnowledgeBase />
      <LiveQA />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
