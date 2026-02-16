import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import IntegrationSteps from "@/components/IntegrationSteps";
import Navbar from "@/components/Navbar";
import { getToken } from "@/utils/auth";


export default function Home() {
  const token = getToken() 
  console.log(token);
  
  return (
    <div>
      <Navbar isLoggedIn={!!token}/>
      <HeroSection/>
      <IntegrationSteps/>
      <Footer/>
    </div>
  );
}
