// src/pages/BookingPage.tsx
import Navigation from "../components/navigation";
import WhatsAppButton from "../components/WhatsappAppButton";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { CalendarIcon, CheckCircle, Phone, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { send } from "@emailjs/browser";
import Footer from "../components/Footer";
// ==================== DATA ====================

// ✅ NEW: Madinah Hotels for Ziyarat
const madinahHotels = [
  "Pullman Zamzam Madina",
  "Saja Al Madinah Hotel",
  "Al Manakha Rotana Madinah",
  "Sofitel Shahd Al Madinah Hotel",
  "Elaf Al Taqwa Hotel",
  "Madinah Hilton Hotel",
  "Dallah Taibah Hotel",
  "Anwar Al Madinah Mövenpick",
  "Crowne Plaza Madinah",
  "Taiba Madinah Hotel",
  "InterContinental Dar Al Iman Madinah",
  "Al Aqeeq Madinah Hotel",
  "The Oberoi Madina",
  "Emaar Royal Hotel",
  "Golden Tulip Al Shakreen",
  "Zaha Al Munawwarah Hotel",
  "View Al Madinah Hotel",
  "Belvedere Hotel",
  "Le Bosphorus Al Madinah Hotel",
  "Rua Al Hijrah Hotel"
];

const carModels = [
  "Hyundai Staria",
  "Toyota Camry",
  "Hiace",
  "Hyundai H1",
  "Hyundai Sonata",
  "GMC Yukon"
];

const packages = [
  { id: 0, name: "None", value: "none" },
  { id: 1, name: "Umrah Premium", value: "essential" },
  { id: 2, name: "Complete Hajj Journey", value: "hajj" },
  { id: 3, name: "Umrah Express", value: "umrah" },
  { id: 4, name: "Luxury Pilgrimage", value: "luxury" },
  { id: 5, name: "Madina City Ziyarat", value: "historical" },
  { id: 6, name: "Family Pilgrimage Package", value: "family" }
];

// ==================== COMPONENT ====================
const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get preselected package from URL
  const preselectedPackageId = searchParams.get("package");
  const preselectedPackage = packages.find(p => p.id?.toString() === preselectedPackageId);
  const initialPackageValue = preselectedPackage ? preselectedPackage.value : "none";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    package: initialPackageValue,
    pickup: "",
    destination: "",
    tripType: "",
    carModel: "",
    specialRequests: ""
  });

  // Umrah Express Dates
  const [umrahExpressDates, setUmrahExpressDates] = useState({
    jeddahToMakkah: undefined,
    makkahToMadinah: undefined,
    madinahToAirport: undefined
  });

  // Umrah Premium Dates
  const [umrahPremiumDates, setUmrahPremiumDates] = useState({
    jeddahToMakkah: undefined,
    makkahToMadinah: undefined,
    madinahToMakkah: undefined,
    makkahToJeddah: undefined
  });

  // ✅ NEW: Madina Ziyarat State
  const [madinahZiyarat, setMadinahZiyarat] = useState({
    pickup: "",
    date: undefined as Date | undefined,
    timing: ""
  });

  const [selectedVehicle, setSelectedVehicle] = useState<string>("");

  const handleInputChange = (field: string, value: string) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  // Reset Umrah AND Madina state when switching away
  useEffect(() => {
    if (formData.package !== "umrah" && formData.package !== "essential" && formData.package !== "historical") {
      setUmrahExpressDates({ jeddahToMakkah: undefined, makkahToMadinah: undefined, madinahToAirport: undefined });
      setUmrahPremiumDates({ jeddahToMakkah: undefined, makkahToMadinah: undefined, madinahToMakkah: undefined, makkahToJeddah: undefined });
      setMadinahZiyarat({ pickup: "", date: undefined, timing: "" });
      setSelectedVehicle("");
      // Clear fields not used in non-Umrah packages
      setFormData(prev => ({
        ...prev,
        pickup: "",
        destination: "",
        tripType: "",
        carModel: ""
      }));
    }
  }, [formData.package]);

  // ✅ UPDATED: WhatsApp sender for 10-parameter template
  const sendWhatsAppMessage = async (
    to: string,
    p1_firstName: string,
    p2_packageName: string,
    p3_bookingId: string,
    p4_route1: string,
    p5_route2: string,
    p6_route3: string,
    p7_route4: string,
    p8_vehicle: string,
    p9_specialRequests: string,
    p10_contact: string
  ) => {
    const PHONE_ID = "780619091801476";
    const TOKEN = "EAAYWCLCijuABPuTHBokaLTWnTilJ1BLWXD2H0J8ZBzMGomQqYPNKpQ7u8hnVZB8g5EmrzgC87RhUs6KfWErP3O1lFDZCqX8AoPzFsbQdZAO4AFkM2JsQOXLvaZBcnzsFKmZCxZCqakHbcmDmvvHcjSGx6ekqMWuKsZAr7foVM7w38J3ZBU99zZAWbb4I6QdfGvt9IenAZDZD";

    const cleanPhone = to.replace(/\D/g, '');
    const formattedTo = '+' + cleanPhone;
    const url = `https://graph.facebook.com/v22.0/${PHONE_ID}/messages`; // Fixed spacing

    const payload = {
      messaging_product: "whatsapp",
      to: formattedTo,
      type: "template",
      template: {
        name: "package_booking", // ✅ Correct template name
        language: { code: "en" },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: p1_firstName },
              { type: "text", text: p2_packageName },
              { type: "text", text: p3_bookingId },
              { type: "text", text: p4_route1 },
              { type: "text", text: p5_route2 },
              { type: "text", text: p6_route3 },
              { type: "text", text: p7_route4 },
              { type: "text", text: p8_vehicle },
              { type: "text", text: p9_specialRequests || "None" },
              { type: "text", text: p10_contact }
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
      console.log("📤 WhatsApp Raw Response:", responseText);

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

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    let bookingDetails = "";

    // --- NONE PACKAGE ---
    if (formData.package === "none") {
      const formattedDate = date ? format(date, "PPP") : "Not selected";
      bookingDetails = `
Package: None
Preferred Date: ${formattedDate}
Pickup: ${formData.pickup || "Not selected"}
Destination: ${formData.destination || "Not selected"}
Trip Type: ${formData.tripType || "Not selected"}
Vehicle: ${formData.carModel || "Not specified"}
      `.trim();
    }
    // --- UMRAH EXPRESS ---
    else if (formData.package === "umrah") {
      bookingDetails = `
Package: Umrah Express
Vehicle: ${selectedVehicle || "Not selected"}

Route Dates:
Jeddah Airport → Makkah Hotel: ${umrahExpressDates.jeddahToMakkah ? format(umrahExpressDates.jeddahToMakkah, "PPP") : "Not selected"}
Makkah Hotel → Madinah Hotel: ${umrahExpressDates.makkahToMadinah ? format(umrahExpressDates.makkahToMadinah, "PPP") : "Not selected"}
Madinah Hotel → Madinah Airport: ${umrahExpressDates.madinahToAirport ? format(umrahExpressDates.madinahToAirport, "PPP") : "Not selected"}
• End of journey
      `.trim();
    }
    // --- UMRAH PREMIUM ---
    else if (formData.package === "essential") {
      bookingDetails = `
Package: Umrah Premium
Vehicle: ${selectedVehicle || "Not selected"}

Route Dates:
Jeddah Airport → Makkah Hotel: ${umrahPremiumDates.jeddahToMakkah ? format(umrahPremiumDates.jeddahToMakkah, "PPP") : "Not selected"}
Makkah Hotel → Madinah: ${umrahPremiumDates.makkahToMadinah ? format(umrahPremiumDates.makkahToMadinah, "PPP") : "Not selected"}
Madinah Hotel → Makkah: ${umrahPremiumDates.madinahToMakkah ? format(umrahPremiumDates.madinahToMakkah, "PPP") : "Not selected"}
• Makkah Hotel → Jeddah Airport: ${umrahPremiumDates.makkahToJeddah ? format(umrahPremiumDates.makkahToJeddah, "PPP") : "Not selected"}
      `.trim();
    }
    // --- MADINA ZIYARAT ---
    else if (formData.package === "historical") {
      const formattedDate = madinahZiyarat.date ? format(madinahZiyarat.date, "PPP") : "Not selected";
      bookingDetails = `
Package: Madina City Ziyarat
Vehicle: ${selectedVehicle || "Not specified"}

Details:
Pickup: ${madinahZiyarat.pickup || "Not selected"}
Preferred Date: ${formattedDate}
Timing: ${madinahZiyarat.timing || "Not selected"}
• End of journey
      `.trim();
    }
    // --- OTHER PACKAGES ---
    else {
      const formattedDate = date ? format(date, "PPP") : "Not selected";
      const packageName = packages.find(p => p.value === formData.package)?.name || "Unknown";
      bookingDetails = `
Package: ${packageName}
Preferred Date: ${formattedDate}
Pickup Location: ${formData.pickup || "Not selected"}
(Destination, Trip Type, Vehicle included in package)
      `.trim();
    }

    const templateParams = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      bookingDetails: bookingDetails,
      specialRequests: formData.specialRequests === "" ? "No special requests specified" : formData.specialRequests,
    };

    try {
      setIsSubmitting(true);

      await send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_USER_ID
      );

      console.log("✅ Email sent successfully!");

      // ✅ NEW: WhatsApp Logic for 3 packages
      const bookingId = "ZT" + Math.floor(100000 + Math.random() * 900000);
      const formatDate = (d: Date | undefined) => d ? format(d, "d MMMM yyyy") : "Not selected";

      if (formData.package === "essential") {
        // Umrah Premium
        const r1 = `Jeddah-Makkah: ${formatDate(umrahPremiumDates.jeddahToMakkah)}`;
        const r2 = `Jeddah-Madinah: ${formatDate(umrahPremiumDates.makkahToMadinah)}`;
        const r3 = `Madina-Makkah: ${formatDate(umrahPremiumDates.madinahToMakkah)}`;
        const r4 = `• Makkah-Jeddah: ${formatDate(umrahPremiumDates.makkahToJeddah)}`;

        sendWhatsAppMessage(
          formData.phone,
          formData.firstName,
          "Umrah Premium",
          bookingId,
          r1, r2, r3, r4,
          selectedVehicle || "Not specified",
          formData.specialRequests,
          formData.phone
        );
      } 
      else if (formData.package === "umrah") {
        // Umrah Express
        const r1 = `Jeddah Airport-Makkah Hotel: ${formatDate(umrahExpressDates.jeddahToMakkah)}`;
        const r2 = `Makkah Hotel-Madinah Hotel: ${formatDate(umrahExpressDates.makkahToMadinah)}`;
        const r3 = `Madinah Hotel-Madinah Airport: ${formatDate(umrahExpressDates.madinahToAirport)}`;
        const r4 = `• End of journey`;

        sendWhatsAppMessage(
          formData.phone,
          formData.firstName,
          "Umrah Express",
          bookingId,
          r1, r2, r3, r4,
          selectedVehicle || "Not specified",
          formData.specialRequests,
          formData.phone
        );
      }
      else if (formData.package === "historical") {
        // Madina City Ziyarat
        const r1 = `Pickup: ${madinahZiyarat.pickup}`;
        const r2 = `Preferred Date: ${formatDate(madinahZiyarat.date)}`;
        const r3 = `Timing: ${madinahZiyarat.timing}`;
        const r4 = `• End of journey`;

        sendWhatsAppMessage(
          formData.phone,
          formData.firstName,
          "Madina City Ziyarat",
          bookingId,
          r1, r2, r3, r4,
          selectedVehicle || "Not specified",
          formData.specialRequests,
          formData.phone
        );
      }
      // Other packages: no WhatsApp

      navigate("/booking-confirmation", { replace: true });
    } catch (error) {
      console.error("❌ Failed to send email:", error);
      alert("There was an error submitting your request. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isUmrahPackage = formData.package === "umrah" || formData.package === "essential";

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
          />
        </PopoverContent>
      </Popover>
    </div>
  );

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Book Your <span className="text-gold">Journey</span>
            </h1>
            <p className="text-xl text-neutral-200 max-w-4xl mx-auto leading-relaxed">
              Reserve your sacred transport with us and focus on what matters most - your spiritual journey
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 px-6 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-elegant opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-neutral-900">
                    Booking Details
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
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          placeholder="Enter your first name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+966 XX XXX XXXX"
                          required
                        />
                      </div>
                    </div>

                    {/* === PACKAGE SELECTION ONLY === */}
                    <div className="space-y-2">
                      <Label>Package Type *</Label>
                      <Select
                        onValueChange={(value) => handleInputChange("package", value)}
                        value={formData.package}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select package" />
                        </SelectTrigger>
                        <SelectContent>
                          {packages.map(pkg => (
                            <SelectItem key={pkg.value} value={pkg.value}>
                              {pkg.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* === ONLY SHOW EXTRA FIELDS FOR UMRAH PACKAGES === */}

                    {/* For Umrah Express */}
                    {formData.package === "umrah" && (
                      <>
                        <div className="col-span-full">
                          <h4 className="text-lg font-semibold text-neutral-800 mb-4">Select Pickup Dates for Each Route</h4>
                        </div>
                        {Object.entries(umrahExpressDates).map(([key, value]) => {
                          const labels: Record<string, string> = {
                            jeddahToMakkah: "Jeddah Airport → Makkah Hotel",
                            makkahToMadinah: "Makkah Hotel → Madinah Hotel",
                            madinahToAirport: "Madinah Hotel → Madinah Airport"
                          };
                          return (
                            <DatePickerPopover
                              key={key}
                              value={value}
                              onChange={(d) => setUmrahExpressDates(prev => ({ ...prev, [key]: d }))}
                              label={labels[key]}
                              required={true}
                            />
                          );
                        })}
                        <div className="col-span-full space-y-2">
                          <Label>Vehicle Preference *</Label>
                          <Select onValueChange={setSelectedVehicle} value={selectedVehicle}>
                            <SelectTrigger><SelectValue placeholder="Choose vehicle" /></SelectTrigger>
                            <SelectContent>
                              {carModels.map(model => (
                                <SelectItem key={model} value={model}>
                                  {model}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}

                    {/* For Umrah Premium */}
                    {formData.package === "essential" && (
                      <>
                        <div className="col-span-full">
                          <h4 className="text-lg font-semibold text-neutral-800 mb-4">Select Pickup Dates for Each Route</h4>
                        </div>
                        {Object.entries(umrahPremiumDates).map(([key, value]) => {
                          const labels: Record<string, string> = {
                            jeddahToMakkah: "Jeddah Airport → Makkah Hotel",
                            makkahToMadinah: "Makkah Hotel → Madinah",
                            madinahToMakkah: "Madinah Hotel → Makkah",
                            makkahToJeddah: "Makkah Hotel → Jeddah Airport"
                          };
                          return (
                            <DatePickerPopover
                              key={key}
                              value={value}
                              onChange={(d) => setUmrahPremiumDates(prev => ({ ...prev, [key]: d }))}
                              label={labels[key]}
                              required={true}
                            />
                          );
                        })}
                        <div className="col-span-full space-y-2">
                          <Label>Vehicle Preference *</Label>
                          <Select onValueChange={setSelectedVehicle} value={selectedVehicle}>
                            <SelectTrigger><SelectValue placeholder="Choose vehicle" /></SelectTrigger>
                            <SelectContent>
                              {carModels.map(model => (
                                <SelectItem key={model} value={model}>
                                  {model}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}

                    {/* ✅ NEW: Madina City Ziyarat Fields */}
                    {formData.package === "historical" && (
                      <>
                        <div className="col-span-full space-y-4">
                          <h4 className="text-lg font-semibold text-neutral-800">Madina City Ziyarat Details</h4>
                          
                          <div className="space-y-2">
                            <Label>Pickup Location *</Label>
                            <Select
                              value={madinahZiyarat.pickup}
                              onValueChange={(v) => setMadinahZiyarat(prev => ({ ...prev, pickup: v }))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select hotel" />
                              </SelectTrigger>
                              <SelectContent>
                                {madinahHotels.map(hotel => (
                                  <SelectItem key={hotel} value={hotel}>
                                    {hotel}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <DatePickerPopover
                            label="Preferred Date *"
                            value={madinahZiyarat.date}
                            onChange={(d) => setMadinahZiyarat(prev => ({ ...prev, date: d }))}
                            required={true}
                          />

                          <div className="space-y-2">
                            <Label>Timing *</Label>
                            <Select
                              value={madinahZiyarat.timing}
                              onValueChange={(v) => setMadinahZiyarat(prev => ({ ...prev, timing: v }))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select timing" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Morning (8:00 AM - 12:00 PM)">Morning (8:00 AM - 12:00 PM)</SelectItem>
                                <SelectItem value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM - 4:00 PM)</SelectItem>
                                <SelectItem value="Evening (4:00 PM - 8:00 PM)">Evening (4:00 PM - 8:00 PM)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="col-span-full space-y-2">
                            <Label>Vehicle Preference *</Label>
                            <Select onValueChange={setSelectedVehicle} value={selectedVehicle}>
                              <SelectTrigger><SelectValue placeholder="Choose vehicle" /></SelectTrigger>
                              <SelectContent>
                                {carModels.map(model => (
                                  <SelectItem key={model} value={model}>
                                    {model}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Special Requests — shown for all */}
                    <div className="space-y-2">
                      <Label htmlFor="requests">Special Requests or Notes</Label>
                      <Textarea
                        id="requests"
                        value={formData.specialRequests}
                        onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                        placeholder="Any special requirements, accessibility needs, or additional information..."
                        rows={4}
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

            {/* Sidebar — unchanged */}
            <div className="space-y-6">
              {/* Contact Info */}
              <Card className="border-0 shadow-soft opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">Need Immediate Assistance?</h3>
                  <div className="space-y-4">
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

                    <a
                      href={`https://wa.me/+966559572454?text=${encodeURIComponent(
                        "Assalamu Alaikum, I'd like to inquire about your pilgrimage transport services."
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
      <Footer/>
      <WhatsAppButton />
    </main>
  );
};

export default BookingPage;