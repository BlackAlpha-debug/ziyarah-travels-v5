import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Assalamu Alaikum, I'd like to inquire about your pilgrimage transport services.");
    const phoneNumber = "+966559572454"; 
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-2xl transition-all duration-300 hover:scale-110"
      size="icon"
    >
      <MessageCircle className="w-6 h-6" />
    </Button>
  );
};

export default WhatsAppButton;