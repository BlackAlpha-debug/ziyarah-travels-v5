import { Button } from "./ui/button";
import heroImage from "@/assets/destinations/main5.jpeg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 gradient-hero opacity-70"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
          Ziyara Travels
          <span className="block text-gold">Transport Services</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-neutral-100 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          Premium pilgrimage transport services for your spiritual journey to the holy lands of Makkah and Madinah
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <Button 
            variant="default" 
            size="lg" 
            className="bg-gold hover:bg-gold-dark text-white px-8 py-3 text-lg shadow-elegant"
            onClick={() => navigate('/booking')}
          >
            Book Your Journey
          </Button>
          <Button 
            size="lg"
            className="bg-white text-gold hover:bg-gold hover:text-white px-8 py-3 text-lg transition-colors duration-300"
            onClick={() => navigate('/packages')}
          >
            View Packages
          </Button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;