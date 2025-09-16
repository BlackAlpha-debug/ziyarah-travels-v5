import Navigation from "../components/navigation";
import WhatsAppButton from "../components/WhatsappAppButton";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

// Import destination images
import makkahImage from "@/assets/destinations/Umrah-Pakistan.webp";
import minaImage from "@/assets/destinations/Mina.webp";
import mountUhudImage from "@/assets/destinations/Mount-Uhud.webp";
import qubaImage from "@/assets/destinations/quba mosque.webp";
import masjidQiblataynImage from "@/assets/destinations/mosque al-qiblatayn.jpg";
import madinahMunawaraImage from "@/assets/destinations/madinah-al-munawara.jpg";
import beereshifa from "@/assets/destinations/bg-beer-e-shifa.jpg";
import alghars from "@/assets/destinations/al ghars.webp";
import jabalThawrImage from "@/assets/destinations/cave hira.webp";
import valleyJinImage from "@/assets/destinations/jin.webp";

const destinations = [
  {
    id: 1,
    name: "Holy Makkah",
    description: "The sacred city home to the Holy Kaaba and the Grand Mosque. Experience the spiritual heart of Islam where millions gather for pilgrimage.",
    image: makkahImage,
    highlights: ["Grand Mosque (Masjid al-Haram)", "Holy Kaaba", "Zamzam Well", "Safa and Marwah", "Abraj Al-Bait Clock Tower"],
    duration: "Full Day",
    category: "Primary Holy Site"
  },
  {
   id: 2,
   name: "Al-Ghars Well",
   description: "A historic well in Medina where the Prophet Muhammad (PBUH) drank water and requested to be washed with its water after his passing.",
   image: alghars,
   highlights: ["Historic Water Source", "Prophet’s (PBUH) Visit", "Located in Medina", "Spiritual Significance"],
   duration: "Short Visit",
   category: "Islamic Heritage"
  },
  {
    id: 3,
    name: "Madinah Al-Munawwarah",
    description: "The illuminated city of the Prophet (PBUH). Visit the Prophet's Mosque and sacred historical sites that shaped Islamic history.",
    image: madinahMunawaraImage,
    highlights: ["Prophet's Mosque (Masjid an-Nabawi)", "Rawdah Sharif", "Islamic University", "Old Bazaar", "Uhud Battlefield"],
    duration: "Full Day",
    category: "Primary Holy Site"
  },
    {
    id: 7,
    name: "Majid-e-Quba",
    description: "The first mosque built by Prophet Muhammad (PBUH) upon his arrival in Madinah. A place of immense spiritual reward.",
    image: qubaImage,
    highlights: ["Original Foundation", "Modern Architecture", "Prayer Halls", "Historical Displays"],
    duration: "2-3 Hours",
    category: "Mosque"
  },
  {
    id: 6,
    name: "Mount Uhud",
    description: "Historic mountain near Madinah, site of the famous Battle of Uhud. A place of great significance in Islamic history.",
    image: mountUhudImage,
    highlights: ["Uhud Cemetery", "Archers Hill", "Battlefield Sites", "Commemorative Areas"],
    duration: "Half Day",
    category: "Historical Site"
  },
  {
    id: 11,
    name: "Masjid al-Qiblatayn",
    description: "The mosque of two Qiblas where the direction of prayer was changed from Jerusalem to Makkah during Prophet's time.",
    image: masjidQiblataynImage,
    highlights: ["Two Mihrab Directions", "Historical Significance", "Beautiful Architecture", "Prayer Experience"],
    duration: "1-2 Hours",
    category: "Mosque"
  },
  {
    id: 4,
    name: "Mina Valley",
    description: "The tent city where pilgrims stay during Hajj, featuring modern facilities and the site of sacred rituals including stoning.",
    image: minaImage,
    highlights: ["Tent City", "Jamarat Bridge", "Jamarat Pillars", "Modern Facilities", "Emergency Services"],
    duration: "Half Day",
    category: "Hajj Site"
  },
  {
  id: 5,
  name: "Be'er Shifa",
  description: "A historic well in Medina known for its healing properties and association with the Prophet Muhammad (PBUH).",
  image: beereshifa,
  highlights: ["Historic Well", "Healing Properties", "Prophet’s (PBUH) Association", "Spiritual Significance"],
  duration: "Short Visit",
  category: "Islamic Heritage"
  },
  {
    id: 8,
    name: "wadiy-e-Jin",
    description: "A significant historical valley known for its heritage and cultural importance during the pilgrimage journey.",
    image: valleyJinImage,
    highlights: ["Historic Landmarks", "Cultural Heritage", "Scenic Pathways", "Resting Spots"],
    duration: "Half Day",
    category: "Hajj Site"
  },
  {
    id: 9,
    name: "Jabal Thawr",
    description: "The mountain with the cave where Prophet Muhammad (PBUH) and Abu Bakr took refuge during their migration to Madinah.",
    image: jabalThawrImage,
    highlights: ["Cave Thawr", "Climbing Experience", "Historical Context", "Spiritual Significance"],
    duration: "Half Day",
    category: "Historical Site"
  }
];

const categories = ["All", "Primary Holy Site", "Hajj Site", "Historical Site", "Mosque"];

const DestinationsPage = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Sacred <span className="text-gold">Destinations</span>
            </h1>
            <p className="text-xl text-neutral-200 max-w-4xl mx-auto leading-relaxed">
              Explore all the holy sites and sacred places that form the heart of your pilgrimage journey in Saudi Arabia
            </p>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-20 px-6 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <Card 
                key={destination.id} 
                className="group hover:shadow-elegant transition-all duration-300 animate-fade-in-up border-0 shadow-soft"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-gold text-white px-3 py-1 rounded-full text-sm font-medium">
                      {destination.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {destination.name}
                    </h3>
                    <div className="flex items-center text-white/80 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {destination.duration}
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                    {destination.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-neutral-900 text-sm">Key Highlights:</h4>
                    <div className="space-y-1">
                      {destination.highlights.slice(0, 3).map((highlight, idx) => (
                        <div key={idx} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-2 h-2 bg-gold rounded-full mr-2 flex-shrink-0"></div>
                          {highlight}
                        </div>
                      ))}
                      {destination.highlights.length > 3 && (
                        <div className="text-xs text-muted-foreground italic">
                          +{destination.highlights.length - 3} more highlights
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Link to="/booking">
                    <Button 
                      variant="outline" 
                      className="w-full border-gold text-gold hover:bg-gold hover:text-white"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Book Transport
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900">
              Ready to Visit These <span className="text-gold">Sacred Places</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let us handle your transportation while you focus on your spiritual journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking">
                <Button className="bg-gold hover:bg-gold-dark text-white px-8 py-3">
                  Book Your Journey
                </Button>
              </Link>
              <Link to="/packages">
                <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white px-8 py-3">
                  View Packages
                </Button>
              </Link>
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

export default DestinationsPage;