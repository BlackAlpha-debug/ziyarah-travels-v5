// src/pages/BookingConfirmationPage.tsx
import Navigation from "@/components/navigation";
import WhatsAppButton from "@/components/WhatsappAppButton";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const BookingConfirmationPage = () => {
  return (
    <main className="min-h-screen bg-black">
      <Navigation /><br /><br /><br /><br />

      {/* ✅ Main Content - Smooth, Elegant Entrance */}
      <section className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 space-y-8 animate-fadeInUp">
        {/* Checkmark Icon - Static, Centered, Clean — Adjusted margin for perfect alignment */}
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>

        {/* Title - Crisp, Centered, No Animation Distraction — Now perfectly close to checkmark */}
        <h1 className="text-5xl md:text-6xl font-bold text-center">
          <span className="text-white">Booking</span>
          <span className="text-gold"> Confirmed</span>
        </h1>

        {/* Subtitle - Calm, Readable, Professional */}
        <p className="text-center text-gray-300 max-w-2xl mb-12 leading-relaxed">
          Thank you for choosing Ziyarah Travels Transport Services. We have received your booking request and will contact you shortly to confirm the details.
        </p>

        {/* What's Next Box - Subtle Shadow, No Hover Scale — Pure Elegance */}
        <div className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full shadow-xl">
          <h2 className="text-2xl font-bold text-white text-center mb-6">What's Next?</h2>
          <ul className="space-y-4 text-gray-300 text-center">
            <li className="flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Our team will review your booking within 2 hours
            </li>
            <li className="flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              You'll receive a confirmation call or WhatsApp message
            </li>
            <li className="flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Payment details and schedule will be shared
            </li>
            <li className="flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Driver contact information will be provided 24 hours before
            </li>
          </ul>
        </div>

        {/* Buttons - Quiet, Refined, Visible */}
        <div className="flex flex-col sm:flex-row gap-4 mt-12">
          <Button 
            className="bg-gold text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors duration-300 font-medium shadow-lg shadow-gold/20"
            onClick={() => window.location.href = '/'}
          >
            Return Home
          </Button>

          {/* ✅ Clean, Visible, No Pulse — Just Sophisticated Contrast */}
        </div>
      </section>

      <WhatsAppButton />
    </main>
  );
};

export default BookingConfirmationPage;