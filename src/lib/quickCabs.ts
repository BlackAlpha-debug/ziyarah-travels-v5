// src/utils/quickCabs.ts
import camryImage from "@/assets/cabs/camry.jpg";
import sonataImage from "@/assets/cabs/sonata.avif";
import stariaImage from "@/assets/cabs/staria.webp";
import gmcImage from "@/assets/cabs/gmc2020.jpg";
import hiaceImage from "@/assets/cabs/hiace.avif";
import H1image from "@/assets/cabs/H1.avif";

export const quickCabs = [
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

// ✅ Map car name to route key (e.g., "Toyota Camry" → "Camry")
export const normalizeCarNameForRoute = (name: string): string => {
  const mapping: Record<string, string> = {
    "Toyota Camry": "Camry",
    "Hyundai Sonata": "Sonata",
    "Hyundai Staria": "Hyundai Staria",
    "GMC Yukon": "GMC",
    "Hyundai H1": "H1 Hyundai",
    "Toyota Hiace": "Hiace",
  };
  return mapping[name] || name;
};