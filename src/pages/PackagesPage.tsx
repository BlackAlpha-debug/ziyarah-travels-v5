import Navigation from "../components/navigation";
import WhatsAppButton from "../components/WhatsappAppButton";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { CheckCircle, Star, ArrowRight, ArrowLeftRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// Fallback select
const FallbackSelect = ({ value, onChange, children, placeholder }) => (
  <select
    value={value}
    onChange={onChange}
    className="w-full p-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gold bg-white"
  >
    <option value="" disabled>{placeholder}</option>
    {children}
  </select>
);

// Routes with prices per vehicle type (in SAR)
const routes = [
  {
    name: "Jeddah Airport to Makkah Hotel",
    prices: { sedan: 250, h1: 300, gmc2018: 400, gmc2025: 500 }
  },
  {
    name: "Jeddah Airport to Jeddah Hotel",
    prices: { sedan: 100, h1: 150, gmc2018: 250, gmc2025: 350 }
  },
  {
    name: "Makkah Hotel to Madina Hotel",
    prices: { sedan: 500, h1: 600, gmc2018: 800, gmc2025: 1000 }
  },
  {
    name: "Jeddah Airport to Madina Hotel",
    prices: { sedan: 700, h1: 800, gmc2018: 1200, gmc2025: 1600 }
  },
  {
    name: "Madina Airport to Madina Hotel",
    prices: { sedan: 150, h1: 200, gmc2018: 200, gmc2025: 300 }
  },
  {
    name: "Madina Hotel to Madina Airport",
    prices: { sedan: 150, h1: 200, gmc2018: 200, gmc2025: 300 }
  },
  {
    name: "Makkah Ziyarat",
    prices: { sedan: 150, h1: 200, gmc2018: 250, gmc2025: 400 }
  },
  {
    name: "Madina Ziyarat",
    prices: { sedan: 150, h1: 200, gmc2018: 250, gmc2025: 400 }
  },
  {
    name: "Jeddah to Taif and Return",
    prices: { sedan: 700, h1: 800, gmc2018: 1000, gmc2025: 1300 }
  },
  {
    name: "Makkah to Taif and Return",
    prices: { sedan: 450, h1: 500, gmc2018: 600, gmc2025: 900 }
  },
  {
    name: "Madina Hotel to Makkah Hotel",
    prices: { sedan: 500, h1: 600, gmc2018: 800, gmc2025: 1000 }
  },
  {
    name: "Makkah Hotel to Jeddah Airport",
    prices: { sedan: 200, h1: 250, gmc2018: 300, gmc2025: 400 }
  }
];

// Vehicle types with icons
const vehicles = [
  { type: "sedan", label: "Sonata", multiplier: 1 },
  { type: "sedan", label: "Camry", multiplier: 1 },
  { type: "h1", label: "Hyundai H1 Staria", multiplier: 1 },
  { type: "gmc2018", label: "GMC 2018", multiplier: 1 },
  { type: "gmc2025", label: "GMC 2025", multiplier: 1 }
];

// Updated Packages
const packages = [
  // Umrah Express
  {
    id: 3,
    name: "Umrah Express",
    price: "900 SAR",
    description: "Direct transport for Umrah pilgrims with seamless airport and hotel transfers.",
    features: [
      "Jeddah Airport to Makkah Hotel",
      "Makkah Hotel to Madinah Hotel",
      "Madinah Hotel to Madinah Airport",
      "Hyundai H1 Staria",
      "Air-Conditioned Vehicles",
      "Friendly & Experienced Drivers",
      "Flexible Scheduling"
    ],
    popular: false,
    rating: 4.7,
    bookings: 189
  },

  // Umrah Premium
  {
    id: 1,
    name: "Umrah Premium",
    price: "1,500 SAR",
    description: "Complete Umrah journey with round-trip airport and inter-city transfers.",
    features: [
      "Jeddah Airport to Makkah Hotel",
      "Makkah Hotel to Madinah",
      "Madinah Hotel to Makkah",
      "Makkah Hotel to Jeddah Airport",
      "Hyundai H1 Staria",
      "Air-Conditioned Vehicles",
      "Flexible Scheduling"
    ],
    popular: false,
    rating: 4.9,
    bookings: 423
  },

  // Madina City Ziyarat
  {
    id: 5,
    name: "Madina City Ziyarat",
    price: "400 SAR",
    description: "Spiritual tour of key historical sites in and around Madinah.",
    features: [
      "Quba Masjid",
      "Shuhada Uhud (Uhud Martyrs)",
      "Bir e Ghars (Al-Ghars Well)",
      "Bagh e Hazrat Usman",
      "Masjid al-Qiblatayn",
      "Masjid al-Jummah"
    ],
    popular: false,
    rating: 4.6,
    bookings: 215
  },

  // Family Pilgrimage Package
  {
    id: 6,
    name: "Family Pilgrimage Package",
    price: "1,684 SAR",
    description: "Family-friendly package designed for comfort and convenience with children and elderly considerations.",
    features: [
      "Family-Sized Vehicles",
      "Child Safety Equipment",
      "Elderly Care Assistance",
      "Rest Stop Coordination",
      "Flexible Schedule",
      "Medical Support On-Call"
    ],
    popular: false,
    rating: 4.8,
    bookings: 334
  },

  // Complete Hajj Journey
  {
    id: 2,
    name: "Complete Hajj Journey",
    price: "2,246 SAR",
    description: "Comprehensive package covering all Hajj sites with premium comfort and 24/7 support.",
    features: [
      "All Sacred Sites Transport",
      "Mina Valley Accommodation Transfer",
      "Arafat Day Special Service",
      "Jamarat Bridge Access",
      "24/7 Support Service",
      "Premium Vehicles"
    ],
    popular: false,
    rating: 4.9,
    bookings: 567
  }
];

// Custom Package Card
const CustomPackageCard = () => {
  const [tripType, setTripType] = useState("one-way");
  const [selectedRoute, setSelectedRoute] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (!selectedRoute || !selectedVehicle) {
      setTotalPrice(0);
      return;
    }

    const route = routes.find(r => r.name === selectedRoute);
    if (!route) return;

    let basePrice = route.prices[selectedVehicle];

    // Double for round-trip
    const finalPrice = tripType === "round-trip" ? basePrice * 2 : basePrice;
    setTotalPrice(finalPrice);
  }, [selectedRoute, selectedVehicle, tripType]);

  return (
    <Card className="relative group hover:shadow-elegant transition-all duration-300 animate-fade-in-up border-0 shadow-soft ring-2 ring-gold">
      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gold text-white px-4 py-1 z-10">
        Custom Route
      </Badge>

      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-neutral-900 mb-2">
          Book Your Route
        </CardTitle>
        <p className="text-muted-foreground">Choose route, vehicle & trip type</p>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Trip Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Trip Type</label>
          <div className="flex gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="trip"
                value="one-way"
                checked={tripType === "one-way"}
                onChange={() => setTripType("one-way")}
              />
              <ArrowRight className="w-4 h-4 text-gold mr-1" />
              <span>One Way</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="trip"
                value="round-trip"
                checked={tripType === "round-trip"}
                onChange={() => setTripType("round-trip")}
              />
              <ArrowLeftRight className="w-4 h-4 text-gold mr-1" />
              <span>Round Trip</span>
            </label>
          </div>
        </div>

        {/* Route */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Route</label>
          <FallbackSelect
            value={selectedRoute}
            onChange={(e) => setSelectedRoute(e.target.value)}
            placeholder="Choose your route"
          >
            {routes.map((route) => (
              <option key={route.name} value={route.name}>
                {route.name}
              </option>
            ))}
          </FallbackSelect>
        </div>

        {/* Vehicle */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Choose Vehicle</label>
          <FallbackSelect
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value)}
            placeholder="Select vehicle"
          >
            {vehicles.map((v) => (
              <option key={v.type} value={v.type}>
                {v.label}
              </option>
            ))}
          </FallbackSelect>
        </div>

        {/* Price */}
        <div className="pt-4 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total:</span>
            <span className="text-2xl font-bold text-gold">{totalPrice.toLocaleString()} SAR</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {tripType === "round-trip" ? "Round-trip" : "One-way"} • {selectedVehicle ? vehicles.find(v => v.type === selectedVehicle)?.label : ""}
          </p>
        </div>

        {/* Book Button */}
        <Link to="/booking" className="block mt-2">
          <Button
            className="w-full bg-gold hover:bg-gold-dark text-white"
            disabled={!selectedRoute || !selectedVehicle}
          >
            Book This Route
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

// Main Page
const PackagesPage = () => {
  // Fixed order: Umrah Express | Custom | Umrah Premium
  const orderedPackages = [
    packages.find(p => p.name === "Umrah Express"),
    <CustomPackageCard key="custom" />,
    packages.find(p => p.name === "Umrah Premium"),
    ...packages.filter(p => !["Umrah Express", "Umrah Premium"].includes(p.name))
  ].filter(Boolean);

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Pilgrimage <span className="text-gold">Packages</span>
          </h1>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed text-neutral-200">
            Choose from our carefully crafted packages designed to enhance your spiritual journey with comfort and convenience
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-20 px-6 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {orderedPackages.map((pkg, index) => {
              if (typeof pkg === 'object' && 'key' in pkg && pkg.key === 'custom') {
                return pkg;
              }

              return (
                <Card
                  key={pkg.id}
                  className={`relative hover:shadow-elegant transition-all duration-300 animate-fade-in-up border-0 shadow-soft ${
                    pkg.popular ? "ring-2 ring-gold scale-105" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {pkg.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gold text-white px-4 py-1 z-10">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold text-neutral-900">{pkg.name}</CardTitle>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gold">{pkg.price}</span>
                    </div>
                    <div className="flex justify-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Star className="w-4 h-4 fill-gold text-gold mr-1" />
                        {pkg.rating}
                      </span>
                      <span>{pkg.bookings} bookings</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{pkg.description}</p>
                    <div className="space-y-2 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start text-sm">
                          <CheckCircle className="w-4 h-4 text-gold mr-2 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Link to={`/booking?package=${pkg.id}`}>
                    <Button
                      className={
                        pkg.popular
                          ? "w-full bg-gold hover:bg-gold-dark text-white"
                          : "w-full border-gold text-gold hover:bg-gold hover:text-white"
                      }
                      variant={pkg.popular ? "default" : "outline"}
                    >
                      Book Package
                    </Button>
                  </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-neutral-900 mb-6">
            Need Help <span className="text-gold">Choosing</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Not sure which package suits your needs? Contact our experts for personalized recommendations.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { title: "First Time Pilgrim?", text: "We recommend Umrah Express or Umrah Premium packages." },
            { title: "Traveling with Family?", text: "Our Family Pilgrimage Package offers comfort and care for all ages." },
            { title: "Want a Spiritual Tour?", text: "Madina City Ziyarat covers all key historical sites in Madinah." }
          ].map((item, i) => (
            <Card key={i} className="text-center border-0 shadow-soft">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-muted-foreground mb-4">{item.text}</p>
                <Link to="/contact">
                  <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white">
                    Contact Us
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-2">Sacred Journey Transport Services</h3>
          <p className="text-neutral-300 mb-8">Your trusted partner for pilgrimage transport in Saudi Arabia</p>
          <div className="flex flex-col md:flex-row justify-center gap-4 text-sm text-neutral-400">
            <p>© Ziyarah Travels Transport Services. All rights reserved.</p>
            <span>•</span>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <Link to="/contact" className="hover:text-gold">Contact Us</Link>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </main>
  );
};

export default PackagesPage;