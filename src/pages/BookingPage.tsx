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

// ==================== DATA ====================
const pickupLocations = [
  "Jeddah Airport", "Madinah Airport", "Makkah Hotels", "Madinah Hotels",
  "Jeddah Hotels", "Al-Haram Area", "Prophet's Mosque Area", "Aziziyah District",
  "Al-Hijra District", "Ajyad District", "Al-Misfalah District", "Al-Jamiah District",
  "King Abdulaziz International Airport", "Prince Mohammed bin Abdulaziz Airport"
];

const destinations = [
  "Holy Makkah", "Al-Ghars Well", "Madinah Al-Munawwarah", "Quba Mosque",
  "Mount Uhud", "Masjid al-Qiblatayn", "Mina Valley", "Be'er Shifa",
  "Valley Jin", "Jabal Thawr"
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
  const navigate = useNavigate(); // 👈 NEW: For redirection
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
  } as Record<string, Date | undefined>);

  // Umrah Premium Dates
  const [umrahPremiumDates, setUmrahPremiumDates] = useState({
    jeddahToMakkah: undefined,
    makkahToMadinah: undefined,
    madinahToMakkah: undefined,
    makkahToJeddah: undefined
  } as Record<string, Date | undefined>);

  const [selectedVehicle, setSelectedVehicle] = useState<string>("");

  const handleInputChange = (field: string, value: string) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  // Reset Umrah state when switching package
  useEffect(() => {
    if (formData.package !== "umrah" && formData.package !== "essential") {
      setUmrahExpressDates({ jeddahToMakkah: undefined, makkahToMadinah: undefined, madinahToAirport: undefined });
      setUmrahPremiumDates({ jeddahToMakkah: undefined, makkahToMadinah: undefined, madinahToMakkah: undefined, makkahToJeddah: undefined });
      setSelectedVehicle("");
    }
  }, [formData.package]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
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
• Jeddah Airport → Makkah Hotel: ${umrahExpressDates.jeddahToMakkah ? format(umrahExpressDates.jeddahToMakkah, "PPP") : "Not selected"}
• Makkah Hotel → Madinah Hotel: ${umrahExpressDates.makkahToMadinah ? format(umrahExpressDates.makkahToMadinah, "PPP") : "Not selected"}
• Madinah Hotel → Madinah Airport: ${umrahExpressDates.madinahToAirport ? format(umrahExpressDates.madinahToAirport, "PPP") : "Not selected"}
      `.trim();
    }
    // --- UMRAH PREMIUM ---
    else if (formData.package === "essential") {
      bookingDetails = `
Package: Umrah Premium
Vehicle: ${selectedVehicle || "Not selected"}

Route Dates:
• Jeddah Airport → Makkah Hotel: ${umrahPremiumDates.jeddahToMakkah ? format(umrahPremiumDates.jeddahToMakkah, "PPP") : "Not selected"}
• Makkah Hotel → Madinah: ${umrahPremiumDates.makkahToMadinah ? format(umrahPremiumDates.makkahToMadinah, "PPP") : "Not selected"}
• Madinah Hotel → Makkah: ${umrahPremiumDates.madinahToMakkah ? format(umrahPremiumDates.madinahToMakkah, "PPP") : "Not selected"}
• Makkah Hotel → Jeddah Airport: ${umrahPremiumDates.makkahToJeddah ? format(umrahPremiumDates.makkahToJeddah, "PPP") : "Not selected"}
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
      
      // ✅ REDIRECT TO CONFIRMATION PAGE — CLEAN & SEPARATED
      navigate("/booking-confirmation", { replace: true });

    } catch (error) {
      console.error("❌ Failed to send email:", error);
      alert("There was an error submitting your request. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isUmrahPackage = formData.package === "umrah" || formData.package === "essential";
  const isNonePackage = formData.package === "none";
  const isOtherPackage = !isNonePackage && !isUmrahPackage;

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
                          placeholder="50 123 4567"
                          required
                        />
                      </div>
                    </div>

                    {/* === PACKAGE + DATE ROW === */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Package Type */}
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

                      {/* Preferred Date (for None and Other packages) */}
                      {(isNonePackage || isOtherPackage) && (
                        <div className="space-y-2">
                          <Label>Preferred Date *</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start text-left font-normal">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                            </PopoverContent>
                          </Popover>
                        </div>
                      )}
                    </div>

                    {/* === CONDITIONAL FIELDS === */}

                    {/* For "None" Package — Show Trip Type & Vehicle */}
                    {isNonePackage && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label>Pickup Location *</Label>
                            <Select
                              onValueChange={(value) => handleInputChange("pickup", value)}
                              value={formData.pickup}
                              required
                            >
                              <SelectTrigger><SelectValue placeholder="Select pickup" /></SelectTrigger>
                              <SelectContent>
                                {pickupLocations.map(location => (
                                  <SelectItem key={location} value={location}>
                                    {location}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Destination *</Label>
                            <Select
                              onValueChange={(value) => handleInputChange("destination", value)}
                              value={formData.destination}
                              required
                            >
                              <SelectTrigger><SelectValue placeholder="Select destination" /></SelectTrigger>
                              <SelectContent>
                                {destinations.map(dest => (
                                  <SelectItem key={dest} value={dest}>
                                    {dest}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label>Trip Type *</Label>
                            <Select
                              onValueChange={(value) => handleInputChange("tripType", value)}
                              value={formData.tripType}
                              required
                            >
                              <SelectTrigger><SelectValue placeholder="Select trip type" /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="one-way">One Way</SelectItem>
                                <SelectItem value="round-trip">Round Trip</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Vehicle Preference</Label>
                            <Select
                              onValueChange={(value) => handleInputChange("carModel", value)}
                              value={formData.carModel}
                            >
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

                    {/* For Other Packages (Hajj, Luxury, etc.) — Only Pickup */}
                    {isOtherPackage && (
                      <div className="space-y-2">
                        <Label>Pickup Location *</Label>
                        <Select
                          onValueChange={(value) => handleInputChange("pickup", value)}
                          value={formData.pickup}
                          required
                        >
                          <SelectTrigger><SelectValue placeholder="Select pickup location" /></SelectTrigger>
                          <SelectContent>
                            {pickupLocations.map(location => (
                              <SelectItem key={location} value={location}>
                                {location}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* For Umrah Express — Show Route Dates + Vehicle Selection */}
                    {formData.package === "umrah" && (
                      <>
                        <div className="col-span-full">
                          <h4 className="text-lg font-semibold text-neutral-800 mb-4">Select Pickup Dates for Each Route</h4>
                        </div>
                        {Object.entries(umrahExpressDates).map(([key, value]) => {
                          const labels: Record<string, string> = {
                            jeddahToMakkah: "Jeddah Airport → Makkah Hotel *",
                            makkahToMadinah: "Makkah Hotel → Madinah Hotel *",
                            madinahToAirport: "Madinah Hotel → Madinah Airport *"
                          };
                          return (
                            <div key={key} className="space-y-2">
                              <Label>{labels[key]}</Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {value ? format(value, "PPP") : <span>Pick date</span>}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={value}
                                    onSelect={(d) => setUmrahExpressDates(prev => ({ ...prev, [key]: d }))}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                          );
                        })}
                        <div className="col-span-full space-y-2">
                          <Label>Vehicle Preference *</Label>
                          <Select onValueChange={setSelectedVehicle} value={selectedVehicle}>
                            <SelectTrigger><SelectValue placeholder="Choose vehicle" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Hyundai Staria">Hyundai Staria</SelectItem>
                              <SelectItem value="Hyundai H1">Hyundai H1</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}

                    {/* For Umrah Premium — Show Route Dates + Vehicle Selection */}
                    {formData.package === "essential" && (
                      <>
                        <div className="col-span-full">
                          <h4 className="text-lg font-semibold text-neutral-800 mb-4">Select Pickup Dates for Each Route</h4>
                        </div>
                        {Object.entries(umrahPremiumDates).map(([key, value]) => {
                          const labels: Record<string, string> = {
                            jeddahToMakkah: "Jeddah Airport → Makkah Hotel *",
                            makkahToMadinah: "Makkah Hotel → Madinah *",
                            madinahToMakkah: "Madinah Hotel → Makkah *",
                            makkahToJeddah: "Makkah Hotel → Jeddah Airport *"
                          };
                          return (
                            <div key={key} className="space-y-2">
                              <Label>{labels[key]}</Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {value ? format(value, "PPP") : <span>Pick date</span>}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={value}
                                    onSelect={(d) => setUmrahPremiumDates(prev => ({ ...prev, [key]: d }))}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                          );
                        })}
                        <div className="col-span-full space-y-2">
                          <Label>Vehicle Preference *</Label>
                          <Select onValueChange={setSelectedVehicle} value={selectedVehicle}>
                            <SelectTrigger><SelectValue placeholder="Choose vehicle" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Hyundai Staria">Hyundai Staria</SelectItem>
                              <SelectItem value="Hyundai H1">Hyundai H1</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}

                    {/* Special Requests — ALWAYS SHOWS NOW — FIXED */}
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

                    {/* PROFESSIONAL LOADING BUTTON — SVG SPINNER INSIDE ONLY */}
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
                    {/* ❌ NO EXTRA LOADING ANIMATION BELOW — REMOVED AS REQUESTED */}
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
                      href={`https://wa.me/923218203904?text=${encodeURIComponent(
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
                          +923218203904
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

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">Sacred Journey Transport Services</h3>
            <p className="text-neutral-300">Your trusted partner for pilgrimage transport in Saudi Arabia</p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-sm text-neutral-400">
            <p>© Ziyarah Travels Transport Services. All rights reserved.</p>
            <div className="flex gap-4">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
              <span>•</span>
              <Link to="/contact" className="hover:text-gold transition-colors">Contact Us</Link>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </main>
  );
};

export default BookingPage;