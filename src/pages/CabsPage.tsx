import Navigation from "@/components/navigation";
import WhatsAppButton from "../components/WhatsappAppButton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import camryImage from "@/assets/cabs/camry.jpg";
import sonataImage from "@/assets/cabs/sonata.avif";
import stariaImage from "@/assets/cabs/staria.webp";
import gmcImage from "@/assets/cabs/gmc2020.jpg";
import hiaceImage from "@/assets/cabs/hiace.avif";
import H1image from "@/assets/cabs/H1.avif";

// Enhanced quickCabs with richer descriptions
const quickCabs = [
  {
    id: 1,
    name: "Toyota Camry",
    category: "Economy",
    capacity: 4,
    image: camryImage,
    description: "The Toyota Camry offers a perfect blend of fuel efficiency, smooth ride, and modern tech. Ideal for couples or small families traveling between holy sites or airports. Spacious trunk for luggage and whisper-quiet cabin for peaceful reflection.",
    features: [
      "2.5L 4-Cylinder Engine (Fuel Efficient)",
      "Apple CarPlay & Android Auto",
      "Dual-Zone Climate Control",
      "Heated Front Seats",
      "Rearview Camera & Parking Sensors",
      "Leather-Wrapped Steering Wheel",
      "Quiet Cabin Technology",
      "USB Charging Ports (Front & Rear)",
      "24/7 Roadside Assistance"
    ],
    basePrice: 100
  },
  {
    id: 2,
    name: "Hyundai Staria",
    category: "Business",
    capacity: 6,
    image: stariaImage,
    description: "Step into the future of group travel with the Hyundai Staria — a spaceship-like premium MPV with first-class lounge seating, mood lighting, and panoramic views. Perfect for families or small groups seeking a VIP pilgrimage experience.",
    features: [
      "Futuristic Lounge Seating (Captain Chairs)",
      "Panoramic Roof & Ambient Lighting",
      "Dual 10.25” Touchscreens",
      "Premium Bose Sound System",
      "Power Sliding Doors",
      "Auto Climate with Air Purifier",
      "Wireless Charging + USB-C Ports",
      "360° Camera + Parking Assist",
      "Priority Lane Access & Dedicated Driver"
    ],
    basePrice: 150
  },
  {
    id: 3,
    name: "Hyundai Sonata",
    category: "Economy",
    capacity: 4,
    image: sonataImage,
    description: "Elegant, spacious, and packed with safety tech — the Hyundai Sonata is perfect for pilgrims seeking comfort without compromise. Its panoramic sunroof lets in natural light during daytime travel, and its plush seats ensure you arrive refreshed.",
    features: [
      "2.5L Smartstream Engine",
      "10.25” Touchscreen Infotainment",
      "Wireless Phone Charging",
      "Panoramic Sunroof",
      "Blind-Spot Collision Avoidance",
      "Heated & Ventilated Front Seats",
      "Ambient Mood Lighting",
      "Smart Cruise Control",
      "9 Airbags & Advanced Safety Suite"
    ],
    basePrice: 100
  },
  {
    id: 4,
    name: "GMC Yukon",
    category: "Premium",
    capacity: 6,
    image: gmcImage,
    description: "Command the road in luxury with the GMC Yukon — a full-size SUV with palatial rear seating, premium leather, and advanced tech. Ideal for executives, large families, or those who value space, silence, and supreme comfort on long journeys.",
    features: [
      "5.3L V8 Engine (Powerful & Smooth)",
      "Hand-Stitched Leather Seats",
      "Heated & Cooled 2nd Row Seats",
      "Rear Entertainment System (Dual Screens)",
      "Tri-Zone Climate Control",
      "Magnetic Ride Control Suspension",
      "Power-Folding 3rd Row",
      "Wireless Headphones Included",
      "VIP Concierge Service Available"
    ],
    basePrice: 200
  },
  {
    id: 6,
    name: "Hyundai H1",
    category: "Business",
    capacity: 8,
    image: H1image,
    description: "The Hyundai H1 strikes the perfect balance between MPV comfort and van practicality. With captain seats, sliding doors, and generous legroom, it’s ideal for medium-sized families or business groups who want comfort without the bulk.",
    features: [
      "3.5L V6 Smooth Powertrain",
      "Captain Seats with Armrests",
      "Dual Sliding Doors (Left & Right)",
      "Rear Privacy Glass",
      "Built-in Cooler Box",
      "Rear USB & 12V Sockets",
      "Parking Guidance System",
      "Cabin Air Filter & Ionizer",
      "Priority Booking & Flexible Scheduling"
    ],
    basePrice: 160
  },
  {
    id: 5,
    name: "Toyota Hiace",
    category: "Group",
    capacity: 14,
    image: hiaceImage,
    description: "The ultimate group transporter — the Toyota Hiace comfortably seats 14 with overhead luggage racks, individual reading lights, and AC vents for every row. Perfect for tour groups, extended families, or mosque delegations traveling together.",
    features: [
      "High Roof for Standing Room",
      "Overhead Luggage Compartments",
      "Individual Reading Lights & Vents",
      "Front & Rear AC Systems",
      "USB Charging at Every Seat",
      "Step-Free Entry & Exit",
      "Wheelchair Accessible Option",
      "Onboard PA System for Guide",
      "Dedicated Group Coordinator"
    ],
    basePrice: 180
  },

];

const CabsPage = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleExpand = (cabId: number) => {
    setExpandedCard(expandedCard === cabId ? null : cabId);
  };

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* ✅ HEADER SECTION WITH BLACK GRADIENT BACKGROUND — MATCHING CAB BOOKING PAGE */}
      <section className="pt-32 pb-12 px-6 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Our <span className="text-gold">Premium Fleet</span>
          </h2>
          <p className="text-xl text-neutral-200 max-w-3xl mx-auto">
            Experience unmatched comfort and reliability with our curated selection of vehicles — designed for every pilgrimage need.
          </p>
        </div>
      </section>

      {/* ✅ OUR CABS GRID — NOW ON WHITE BACKGROUND */}
      <section className="py-20 px-6 bg-background border-b">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quickCabs.map((cab, index) => (
              <Card
                key={cab.id}
                className={`relative group hover:shadow-elegant transition-all duration-300 border-0 shadow-soft ${
                  cab.category === "Business" ? "ring-2 ring-gold" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {cab.category === "Business" && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gold text-white px-4 py-1 z-10">
                    Most Popular
                  </Badge>
                )}

                <CardContent className="p-8">
                  {/* Car Image - Taller */}
                  <div className="relative overflow-hidden rounded-xl mb-6">
                    <img
                      src={cab.image}
                      alt={cab.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <Badge
                      className={`absolute top-3 right-3 text-xs py-1.5 px-3 font-medium ${
                        cab.category === "Economy"
                          ? "bg-green-500"
                          : cab.category === "Business"
                          ? "bg-blue-500"
                          : cab.category === "Premium"
                          ? "bg-purple-500"
                          : "bg-orange-500"
                      }`}
                    >
                      {cab.category}
                    </Badge>
                  </div>

                  {/* Car Info */}
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">{cab.name}</h3>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      <span className="font-medium">{cab.capacity} passengers</span>
                    </div>
                    <div className="text-gold font-bold">
                      From {cab.basePrice} SAR/hr
                    </div>
                  </div>

                  {/* Full Description */}
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    {cab.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mb-6">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(cab.id);
                      }}
                      variant="outline"
                      size="sm"
                      className="flex-1 border-gold text-gold hover:bg-gold hover:text-white font-medium"
                    >
                      {expandedCard === cab.id ? (
                        <>
                          Less Details <ChevronUp className="w-4 h-4 ml-1" />
                        </>
                      ) : (
                        <>
                          View More Details <ChevronDown className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </Button>
                    <Link
                      to={`/cab-booking?cab=${encodeURIComponent(
                        cab.name
                      )}&category=${cab.category}&price=${cab.basePrice}`}
                    >
                      <Button size="sm" className="bg-gold hover:bg-gold-dark text-white font-medium">
                        Book Now
                      </Button>
                    </Link>
                  </div>

                  {/* Expanded Details */}
                  {expandedCard === cab.id && (
                    <div className="border-t pt-6 mt-6 animate-fade-in">
                      <h4 className="font-semibold text-neutral-800 mb-4 flex items-center">
                        <span className="inline-block w-2 h-2 bg-gold rounded-full mr-2"></span>
                        Full Specifications & Features
                      </h4>
                      <div className="grid grid-cols-1 gap-3 mb-6">
                        {cab.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      {/* ✅ REMOVED: Starting Rate Box */}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-16 px-6">
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
              <Link to="/contact" className="hover:text-gold transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </main>
  );
};

export default CabsPage;