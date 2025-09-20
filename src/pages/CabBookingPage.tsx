// src/pages/CabBookingPage.tsx
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/navigation";
import WhatsAppButton from "@/components/WhatsappAppButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, MapPin, Phone, DollarSign, Mail, User, CheckCircle, MessageCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// ✅ Import EmailJS
import emailjs from "@emailjs/browser";
emailjs.init("awvJIls7xVUtlL1yt");

// ✅ WhatsApp API Credentials
const PHONE_ID = "780619091801476";
const TOKEN = "EAAYWCLCijuABPe0pYnxsdzoHA0HFzOnl5hIm39JdHR6sFjS34yHMAwQgfBa0UDyDEud9uAlj19lSZBqw5cDdoUzw6AZC5AZAX4skQa0UVKuW69GvgxltYzQyWdzg8vZCGuRcoTDqp1z5NLSoV1gVmZAKT0bapRIp5FeTjNW5pPMIJeLJFyKZApxA2AVP2cGbyTCTfbhkBw0IZAnfGsPKF80o9lExMlL5MZBq5osX";

// ✅ Define routes with exact pricing per vehicle model
const routes = [
  { name: "Jeddah Airport to Makkah Hotel", prices: { "Sonata": 250, "Camry": 250, "H1 Hyundai": 300, "Hyundai Staria": 350, "GMC": 400, "Hiace": 400 } },
  { name: "Jeddah Airport to Jeddah Hotel", prices: { "Sonata": 200, "Camry": 200, "H1 Hyundai": 250, "Hyundai Staria": 270, "GMC": 250, "Hiace": 300 } },
  { name: "Makkah Hotel to Madina Hotel", prices: { "Sonata": 500, "Camry": 500, "H1 Hyundai": 600, "Hyundai Staria": 650, "GMC": 800, "Hiace": 700 } },
  { name: "Jeddah Airport to Madina Hotel", prices: { "Sonata": 550, "Camry": 550, "H1 Hyundai": 700, "Hyundai Staria": 750, "GMC": 1000, "Hiace": 800 } },
  { name: "Madina Airport to Madina Hotel", prices: { "Sonata": 150, "Camry": 150, "H1 Hyundai": 200, "Hyundai Staria": 220, "GMC": 250, "Hiace": 300 } },
  { name: "Madina Hotel to Madina Airport", prices: { "Sonata": 100, "Camry": 100, "H1 Hyundai": 150, "Hyundai Staria": 170, "GMC": 200, "Hiace": 250 } },
  { name: "Jeddah to Taif and Return", prices: { "Sonata": 1000, "Camry": 1000, "H1 Hyundai": 1000, "Hyundai Staria": 1200, "GMC": 1500, "Hiace": 1500 } },
  { name: "Makkah to Taif and Return", prices: { "Sonata": 400, "Camry": 400, "H1 Hyundai": 500, "Hyundai Staria": 600, "GMC": 700, "Hiace": 700 } },
  { name: "Madina Hotel to Makkah Hotel", prices: { "Sonata": 500, "Camry": 500, "H1 Hyundai": 600, "Hyundai Staria": 700, "GMC": 800, "Hiace": 700 } },
  { name: "Makkah Hotel to Jeddah Airport", prices: { "Sonata": 200, "Camry": 200, "H1 Hyundai": 300, "Hyundai Staria": 350, "GMC": 400, "Hiace": 400 } }
];

// ✅ Helper: Normalize cab name
const normalizeCabName = (cabName: string): string => {
  const mapping: Record<string, string> = {
    "Camry": "Camry", "Sonata": "Sonata", "H1": "H1 Hyundai", "Hiace": "Hiace",
    "GMC Yukon ": "GMC", "Hyundai Staria": "Hyundai Staria", "Staria": "Hyundai Staria"
  };
  for (const [key, value] of Object.entries(mapping)) {
    if (cabName.includes(key)) return value;
  }
  const validKeys = ["Sonata", "Camry", "H1 Hyundai", "Hyundai Staria", "GMC", "Hiace"];
  return validKeys.includes(cabName) ? cabName : "Camry";
};

// ✅ Map internal category to customer-facing tier
const getCategoryTier = (category: string): string => {
  const mapping: Record<string, string> = {
    "economy": "Economy", "sedan": "Economy", "standard": "Economy", "basic": "Economy",
    "business": "Business", "executive": "Business", "camry": "Business", "sonata": "Business",
    "premium": "Premium", "luxury": "Premium", "gmc": "Premium", "hiace": "Premium",
    "staria": "Premium", "h1": "Premium", "van": "Premium", "mpv": "Premium"
  };
  const key = category.toLowerCase().trim();
  return mapping[key] || "Economy";
};

// ✅ Reusable Calendar Popover Component
const DatePickerPopover = ({
  value,
  onChange,
  label,
  required = false
}: {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  label: string;
  required?: boolean;
}) => (
  <div className="space-y-2">
    <Label>{label}{required ? " *" : ""}</Label>
    <Popover modal={false}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start text-left font-normal">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>Pick date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
          disabled={(date) => date < new Date()}
        />
      </PopoverContent>
    </Popover>
  </div>
);

const CabBookingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const selectedCab = searchParams.get('cab') || '';
  const cabCategory = searchParams.get('category') || '';
  const normalizedCab = normalizeCabName(selectedCab);
  const customerTier = getCategoryTier(cabCategory);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    preferredDate: null as Date | null,
    tripType: '',
    selectedRoute: '',
    vehiclePreference: selectedCab // ✅ NOT disabled — user can change
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getRoutePrice = (routeName: string) => {
    const route = routes.find(r => r.name === routeName);
    if (!route) return 0;
    return route.prices[normalizedCab as keyof typeof route.prices] || 0;
  };

  const sendWhatsAppMessage = async (
    to: string,
    firstName: string,
    bookingId: string,
    vehicle: string,
    category: string,
    route: string,
    tripType: string,
    price: string,
    preferredDate: string,
    phone: string,
    email: string
  ) => {
    const cleanPhone = to.replace(/\D/g, '');
    const formattedTo = '+' + cleanPhone;

    const url = `https://graph.facebook.com/v19.0/${PHONE_ID}/messages`;

    const cleanText = (text: string) => {
      return text
        .replace(/[\n\r\t]/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .trim();
    };

    const payload = {
      messaging_product: "whatsapp",
      to: formattedTo,
      type: "template",
      template: {
        name: "cabbooking_confirmation",
        language: { code: "en" },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: cleanText(firstName) },           // {{1}}
              { type: "text", text: cleanText(bookingId) },           // {{2}}
              { type: "text", text: cleanText(vehicle) },             // {{3}}
              { type: "text", text: cleanText(category) },            // {{4}}
              { type: "text", text: cleanText(route) },               // {{5}}
              { type: "text", text: cleanText(tripType) },            // {{6}}
              { type: "text", text: cleanText(price) },               // {{7}} — numeric
              { type: "text", text: cleanText(preferredDate) },       // {{8}}
              { type: "text", text: cleanText(phone) },               // {{9}}
              { type: "text", text: cleanText(email) }                // {{10}}
            ]
          }
        ]
      }
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const responseText = await response.text();
      if (!response.ok) {
        let errorData = { error: responseText };
        try { errorData = JSON.parse(responseText); } catch {}
        console.error("❌ WhatsApp API Error:", errorData);
        throw new Error(`Failed: ${response.status}`);
      }

      const result = JSON.parse(responseText);
      console.log("✅ WhatsApp sent:", result);
      return result;
    } catch (error) {
      console.error("❌ WhatsApp failed:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // ✅ Validation
    if (!formData.firstName || !formData.lastName || !formData.phoneNumber || !formData.preferredDate || !formData.email) {
      alert('Please fill in all required fields: First Name, Last Name, Phone, Email, and Preferred Date');
      setIsSubmitting(false);
      return;
    }

    if (!formData.tripType || !formData.selectedRoute) {
      alert('Please select trip type and route');
      setIsSubmitting(false);
      return;
    }

    const tripTypeLabel = formData.tripType === 'one-way' ? 'One Way' : 'Round Trip';
    const formattedDate = formData.preferredDate ? format(formData.preferredDate, "dd MMMM yyyy") : '';
    const finalPrice = getRoutePrice(formData.selectedRoute).toString();
    const bookingId = `BT${new Date().getTime().toString().slice(-6)}`;

    try {
      // ✅ Send WhatsApp
      await sendWhatsAppMessage(
        formData.phoneNumber,
        formData.firstName,
        bookingId,
        formData.vehiclePreference,
        customerTier,
        formData.selectedRoute,
        tripTypeLabel,
        finalPrice,
        formattedDate,
        formData.phoneNumber,
        formData.email
      );

      // ✅ Send Email (backup)
      await emailjs.send("service_xbv79li", "template_opvt35m", {
        booking_id: bookingId,
        vehicle: formData.vehiclePreference,
        route: formData.selectedRoute,
        trip_type: tripTypeLabel,
        preferred_date: formattedDate,
        price: `${finalPrice} SAR`,
        phone: formData.phoneNumber,
        email: formData.email,
        customer_name: `${formData.firstName} ${formData.lastName}`
      });

      // ✅ Redirect
      const urlParams = new URLSearchParams({
        vehicle: formData.vehiclePreference,
        route: formData.selectedRoute,
        trip_type: tripTypeLabel,
        preferred_date: formattedDate,
        price: `${finalPrice} SAR`,
        phone: formData.phoneNumber,
        email: formData.email,
        customer_name: `${formData.firstName} ${formData.lastName}`,
        booking_id: bookingId,
        category: customerTier
      });

      navigate(`/booking-confirmation?${urlParams.toString()}`);

      // ✅ Reset form
      setFormData({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        preferredDate: null,
        tripType: '',
        selectedRoute: '',
        vehiclePreference: selectedCab
      });

    } catch (error) {
      console.error("Booking submission failed:", error);
      alert("There was an issue processing your booking. Please try again or contact support.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-50">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Book Your <span className="text-gold">Cab</span>
            </h1>
            <p className="text-xl text-neutral-200 max-w-4xl mx-auto leading-relaxed">
              Reserve your sacred transport with us and focus on what matters most — your spiritual journey
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form + Sidebar */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-elegant opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-neutral-900">
                    Cab Booking Details
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Fill in your information and we'll contact you to confirm your booking
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name * <User className="w-4 h-4 inline ml-1 text-gold" /></Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          placeholder="Enter your first name"
                          required
                          className="h-12 border-neutral-200 focus:border-gold focus:ring-gold rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name * <User className="w-4 h-4 inline ml-1 text-gold" /></Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          placeholder="Enter your last name"
                          required
                          className="h-12 border-neutral-200 focus:border-gold focus:ring-gold rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address * <Mail className="w-4 h-4 inline ml-1 text-gold" /></Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your.email@example.com"
                          required
                          className="h-12 border-neutral-200 focus:border-gold focus:ring-gold rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number * <Phone className="w-4 h-4 inline ml-1 text-gold" /></Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                          placeholder="+966 5X XXX XXXX"
                          required
                          className="h-12 border-neutral-200 focus:border-gold focus:ring-gold rounded-xl"
                        />
                      </div>
                    </div>

                    {/* Trip Type + Vehicle */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Trip Type * <MapPin className="w-4 h-4 inline ml-1 text-gold" /></Label>
                        <Select
                          onValueChange={(value) => handleInputChange("tripType", value)}
                          value={formData.tripType}
                        >
                          <SelectTrigger className="h-12 border-neutral-200 focus:border-gold focus:ring-gold rounded-xl">
                            <SelectValue placeholder="Select trip type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="one-way">One Way</SelectItem>
                            <SelectItem value="two-way">Round Trip</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Vehicle Preference <MapPin className="w-4 h-4 inline ml-1 text-gold" /></Label>
                        <Select
                          onValueChange={(value) => handleInputChange("vehiclePreference", value)}
                          value={formData.vehiclePreference}
                        >
                          <SelectTrigger className="h-12 border-neutral-200 focus:border-gold focus:ring-gold rounded-xl">
                            <SelectValue placeholder="Choose vehicle" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Camry">Toyota Camry</SelectItem>
                            <SelectItem value="Sonata">Hyundai Sonata</SelectItem>
                            <SelectItem value="H1 Hyundai">Hyundai H1</SelectItem>
                            <SelectItem value="Hyundai Staria">Hyundai Staria</SelectItem>
                            <SelectItem value="GMC">GMC Yukon</SelectItem>
                            <SelectItem value="Hiace">Toyota Hiace</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Route + Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Route * <MapPin className="w-4 h-4 inline ml-1 text-gold" /></Label>
                        <Select
                          onValueChange={(value) => handleInputChange("selectedRoute", value)}
                          value={formData.selectedRoute}
                        >
                          <SelectTrigger className="h-12 border-neutral-200 focus:border-gold focus:ring-gold rounded-xl">
                            <SelectValue placeholder="Choose your route" />
                          </SelectTrigger>
                          <SelectContent>
                            {routes.map((route, idx) => (
                              <SelectItem key={idx} value={route.name}>
                                {route.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {formData.selectedRoute && (
                          <div className="flex items-center gap-2 mt-2 p-3 bg-green-50 rounded-xl">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span className="text-green-800 font-medium">
                              Price: <span className="text-gold">{getRoutePrice(formData.selectedRoute)} SAR</span>
                            </span>
                          </div>
                        )}
                      </div>
                      <DatePickerPopover
                        value={formData.preferredDate}
                        onChange={(date) => handleInputChange('preferredDate', date)}
                        label="Preferred Date *"
                        required={true}
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full bg-gold hover:bg-gold-dark text-white py-3 text-lg font-semibold rounded-lg transition-colors"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center space-x-2">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.133 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Sending Request...</span>
                        </span>
                      ) : (
                        "Submit Booking Request"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <Card className="border-0 shadow-soft opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">Need Immediate Assistance?</h3>
                  <div className="space-y-4">
                    {/* Phone Call Link */}
                    <a
                      href="tel:+923218203904"
                      className="flex items-center space-x-3 p-3 rounded-lg border border-transparent hover:border-green-400 hover:bg-green-50 hover:text-green-700 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out cursor-pointer group"
                    >
                      <Phone className="w-5 h-5 text-gold group-hover:rotate-12 transition-transform duration-300" />
                      <div>
                        <p className="font-medium group-hover:text-green-600 transition-colors">Call Us</p>
                        <p className="text-sm text-muted-foreground group-hover:text-green-500 transition-colors">
                          +923218203904
                        </p>
                      </div>
                    </a>

                    {/* WhatsApp Link */}
                    <a
                      href={`https://wa.me/+966559572454?text=${encodeURIComponent(
                        "Assalamu Alaikum, I'd like to book a cab for pilgrimage transport."
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 rounded-lg border border-transparent hover:border-green-400 hover:bg-green-50 hover:text-green-700 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out cursor-pointer group"
                    >
                      <MessageCircle className="w-5 h-5 text-gold group-hover:rotate-12 transition-transform duration-300 animate-pulse-slow" />
                      <div>
                        <p className="font-medium group-hover:text-green-600 transition-colors">WhatsApp</p>
                        <p className="text-sm text-muted-foreground group-hover:text-green-500 transition-colors">
                          +966559572454
                        </p>
                      </div>
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Why Book With Us */}
              <Card className="border-0 shadow-soft opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">Why Book With Us?</h3>
                  {[{
                    title: "Licensed & Insured",
                    desc: "Fully licensed transport service"
                  }, {
                    title: "Expert Local Drivers",
                    desc: "Knowledgeable about all holy sites"
                  }, {
                    title: "24/7 Support",
                    desc: "Round-the-clock assistance"
                  }, {
                    title: "Modern Fleet",
                    desc: "Clean, comfortable vehicles"
                  }].map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3 my-3">
                      <CheckCircle className="w-5 h-5 text-gold mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppButton />
    </main>
  );
};

export default CabBookingPage;