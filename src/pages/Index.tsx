import Navigation from "@/components/navigation";
import Hero from "@/components/Hero";

// ❌ Removed unused imports
// import Destinations from "@/components/Destinations";
// import Packages from "@/components/Packages";
// import Booking from "@/components/Booking";
// import Contact from "@/components/Contact";

const Index = () => {
  return (
    <main id="home" className="min-h-screen">
      <Navigation />
      <Hero />
      {/* ❌ Removed unused components */}
      
      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">Ziyarah Travels Transport Services</h3>
            <p className="text-neutral-300">
              Your trusted partner for pilgrimage transport in Saudi Arabia
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-sm text-neutral-400">
            <p>© Ziyarah Travels Transport Services. All rights reserved.</p>
            <div className="flex gap-4">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
              <span>•</span>
              <span>Contact Us</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
