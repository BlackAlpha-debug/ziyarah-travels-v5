import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/navigation";
import WhatsAppButton from "@/components/WhatsappAppButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@//components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, MapPin, Phone, DollarSign, Mail, User } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// ✅ Import EmailJS (optional — you can remove if not needed)
import emailjs from "@emailjs/browser";
emailjs.init("awvJIls7xVUtlL1yt");

// ✅ WhatsApp Business API Credentials
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

const CabBookingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const selectedCab = searchParams.get('cab') || '';
  const cabCategory = searchParams.get('category') || '';
  const normalizedCab = normalizeCabName(selectedCab);
  const customerTier = getCategoryTier(cabCategory);

  const [formData, setFormData] = useState({
    customerName: '', // ✅ ADDED for {{1}}
    tripType: '',
    phoneNumber: '',
    email: '',
    preferredDate: null as Date | null,
    selectedRoute: ''
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // ✅ Validation (now includes customerName)
    if (!formData.customerName || !formData.phoneNumber || !formData.preferredDate || !formData.email) {
      alert('Please fill in all required fields: Name, Phone, Email, and Preferred Date');
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
    const finalPrice = getRoutePrice(formData.selectedRoute); // ✅ Always numeric for WhatsApp API

    // ✅ Generate Booking ID
    const bookingId = `BT${new Date().getTime().toString().slice(-6)}`;

    // ✅ Prepare data for WhatsApp & Email
    const whatsappParams = {
      messaging_product: "whatsapp",
      to: formData.phoneNumber.replace(/\D/g, ""), // ✅ Remove non-digits for WhatsApp API
      type: "template",
      template: {
        name: "cabbooking_confirmation",
        language: { code: "en" },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: formData.customerName },           // {{1}}
              { type: "text", text: bookingId },                       // {{2}}
              { type: "text", text: selectedCab },                     // {{3}}
              { type: "text", text: customerTier },                    // {{4}}
              { type: "text", text: formData.selectedRoute },          // {{5}}
              { type: "text", text: tripTypeLabel },                   // {{6}}
              { type: "text", text: finalPrice.toString() },           // {{7}} — numeric SAR
              { type: "text", text: formattedDate },                   // {{8}}
              { type: "text", text: formData.phoneNumber },            // {{9}}
              { type: "text", text: formData.email }                   // {{10}}
            ]
          }
        ]
      }
    };

    try {
      // ✅ 1. Send WhatsApp via Business API
      const waResponse = await fetch(`https://graph.facebook.com/v19.0/${PHONE_ID}/messages`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(whatsappParams)
      });

      if (!waResponse.ok) {
        const error = await waResponse.json();
        throw new Error(`WhatsApp API Error: ${JSON.stringify(error)}`);
      }

      // ✅ 2. Optional: Send Email via EmailJS
      await emailjs.send("service_xbv79li", "template_opvt35m", {
        booking_id: bookingId,
        vehicle: selectedCab,
        route: formData.selectedRoute,
        trip_type: tripTypeLabel,
        preferred_date: formattedDate,
        price: `${finalPrice} SAR`,
        phone: formData.phoneNumber,
        email: formData.email,
        customer_name: formData.customerName
      });

      // ✅ 3. Redirect to confirmation page
      const urlParams = new URLSearchParams({
        vehicle: selectedCab,
        route: formData.selectedRoute,
        trip_type: tripTypeLabel,
        preferred_date: formattedDate,
        price: `${finalPrice} SAR`,
        phone: formData.phoneNumber,
        email: formData.email,
        customer_name: formData.customerName,
        booking_id: bookingId,
        category: customerTier
      });

      navigate(`/booking-confirmation?${urlParams.toString()}`);

      // ✅ Reset form
      setFormData({
        customerName: '',
        tripType: '',
        phoneNumber: '',
        email: '',
        preferredDate: null,
        selectedRoute: ''
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

      <section className="pt-32 pb-12 px-6 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Book Your <span className="text-gold">Cab</span>
          </h1>
          <p className="text-xl text-neutral-200">
            Selected: <strong className="text-gold">{selectedCab}</strong> • Category: <strong className="text-gold">{customerTier}</strong>
          </p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-elegant border-0 rounded-2xl">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl text-neutral-900 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-gold" />
                Booking Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <form onSubmit={handleSubmit} className="space-y-8">

                {/* ✅ Customer Name */}
                <div className="space-y-2">
                  <Label htmlFor="customerName" className="text-base font-semibold text-neutral-700 flex items-center gap-2">
                    <User className="w-4 h-4 text-gold" />
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="customerName"
                    placeholder="Enter your full name"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange('customerName', e.target.value)}
                    className="h-12 border-neutral-200 focus:border-gold focus:ring-gold rounded-xl"
                  />
                </div>

                {/* Trip Type */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold text-neutral-700">
                    Trip Type <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.tripType}
                    onValueChange={(value) => handleInputChange('tripType', value)}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="one-way" id="one-way" />
                      <Label htmlFor="one-way" className="font-medium">One Way</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="two-way" id="two-way" />
                      <Label htmlFor="two-way" className="font-medium">Round Trip</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Route Selection */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold text-neutral-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gold" />
                    Select Route <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.selectedRoute}
                    onValueChange={(value) => handleInputChange('selectedRoute', value)}
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
                        Price for {selectedCab}: <span className="text-gold">{getRoutePrice(formData.selectedRoute)} SAR</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base font-semibold text-neutral-700 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gold" />
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+966 5X XXX XXXX"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className="h-12 border-neutral-200 focus:border-gold focus:ring-gold rounded-xl"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-semibold text-neutral-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gold" />
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="h-12 border-neutral-200 focus:border-gold focus:ring-gold rounded-xl"
                  />
                </div>

                {/* Preferred Date */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold text-neutral-700 flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-gold" />
                    Preferred Date <span className="text-red-500">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "h-12 w-full justify-start text-left font-normal border-neutral-200 focus:border-gold focus:ring-gold rounded-xl",
                          !formData.preferredDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-gold" />
                        {formData.preferredDate ? format(formData.preferredDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.preferredDate}
                        onSelect={(date) => handleInputChange('preferredDate', date)}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Vehicle Preference (Readonly) */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold text-neutral-700">Vehicle</Label>
                  <Input
                    value={formData.vehiclePreference || selectedCab}
                    placeholder="Vehicle preference"
                    className="h-12 border-neutral-200 focus:border-gold focus:ring-gold rounded-xl"
                    disabled
                  />
                  <p className="text-sm text-muted-foreground">
                    Selected: {selectedCab} → Matched as: {normalizedCab} → Tier: {customerTier}
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-neutral-200">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gold hover:bg-gold-dark text-white text-lg font-semibold h-14 rounded-xl"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Confirm Booking"}
                  </Button>
                  <p className="text-sm text-muted-foreground text-center mt-3">
                    You will receive a WhatsApp confirmation instantly and a call within 30 minutes.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <WhatsAppButton />
    </main>
  );
};

export default CabBookingPage;