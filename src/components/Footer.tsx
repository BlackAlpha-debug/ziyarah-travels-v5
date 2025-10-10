// src/components/Footer.tsx
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-2">Sacred Journey Transport Services</h3>
          <p className="text-neutral-300">
            Your trusted partner for pilgrimage transport in Saudi Arabia
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-sm text-neutral-400">
          <p>Ziyarah Travels Transport Services.</p>
          <div className="flex gap-4">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <Link to="/contact" className="hover:text-gold transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;