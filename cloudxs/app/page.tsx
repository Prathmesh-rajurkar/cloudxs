import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import IntegrationSteps from "@/components/IntegrationSteps";
import Navbar from "@/components/Navbar";


export default function Home() {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <IntegrationSteps/>
      <Footer/>
    </div>
  );
}
