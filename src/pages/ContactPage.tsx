import Navigation from "../components/navigation";
import WhatsAppButton from "../components/WhatsappAppButton";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Phone, MessageCircle, Mail, MapPin, Clock, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Initialize Leaflet map for Hafeez Center, Lahore
  useEffect(() => {
    // Fix marker icon paths for Vite/Webpack
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    // Updated Coordinates for Hafeez Center, Lahore, Pakistan
    const hafeezCenterLatLng: [number, number] = [31.5161, 74.3434];

    // Initialize the map
    const map = L.map('map').setView(hafeezCenterLatLng, 17);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add a marker with a popup
    L.marker(hafeezCenterLatLng)
      .addTo(map)
      .bindPopup("<b>Hafeez Center</b><br>Lahore, Pakistan")
      .openPopup();

    // Cleanup function to remove map on component unmount
    return () => {
      map.remove();
    };
  }, []);

  // Reusable contact button style
  const contactButtonClass = "text-gold font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 rounded-md p-1 transition-all";

  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Contact <span className="text-gold">Ziyarah Travels</span>
            </h1>
            <p className="text-xl text-neutral-200 max-w-4xl mx-auto leading-relaxed">
              We're here to help you plan your pilgrimage journey. Reach out to us for any questions or assistance.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-6 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            {/* PHONE */}
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer bg-white hover:bg-neutral-50">
              <CardContent className="p-6">
                <Phone className="w-12 h-12 text-gold mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Phone</h3>
                <p className="text-muted-foreground text-sm mb-3">Call us directly</p>
                <a href="tel:+966559572454" className={contactButtonClass}>
                  +966 55 957 2454
                </a>
              </CardContent>
            </Card>

            {/* WHATSAPP */}
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer bg-white hover:bg-neutral-50">
              <CardContent className="p-6">
                <MessageCircle className="w-12 h-12 text-gold mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-neutral-900 mb-2">WhatsApp</h3>
                <p className="text-muted-foreground text-sm mb-3">Quick messaging</p>
                <a href="https://wa.me/966559572454" className={contactButtonClass} target="_blank" rel="noopener noreferrer">
                  Message Us
                </a>
              </CardContent>
            </Card>

            {/* EMAIL */}
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer bg-white hover:bg-neutral-50">
              <CardContent className="p-6">
                <Mail className="w-12 h-12 text-gold mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Email</h3>
                <p className="text-muted-foreground text-sm mb-3">Send us details</p>
                <a href="mailto:Ziyarahtarvels.info@gmail.com" className={contactButtonClass}>
                  Ziyarahtarvels.info@gmail.com
                </a>
              </CardContent>
            </Card>

            {/* LOCATION */}
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer bg-white hover:bg-neutral-50">
              <CardContent className="p-6">
                <MapPin className="w-12 h-12 text-gold mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Location</h3>
                <p className="text-muted-foreground text-sm mb-3">Visit our office</p>
                <p className="text-gold font-medium text-sm">
                  Makkah, Saudi Arabia
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* LEFT COLUMN: Contact Form + Quick Actions */}
            <div className="space-y-8">
              {/* Contact Form */}
              {isSubmitted ? (
                <Card className="border-0 shadow-elegant">
                  <CardContent className="p-8 text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-neutral-900 mb-4">Message Sent Successfully!</h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                    <Button 
                      onClick={() => setIsSubmitted(false)}
                      variant="outline" 
                      className="border-gold text-gold hover:bg-gold hover:text-white"
                    >
                      Send Another Message
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-0 shadow-elegant">
                  <CardContent className="p-8">
                    <h2 className="text-3xl font-bold text-neutral-900 mb-6">Send Us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
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
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="+966 50 123 4567"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject *</Label>
                          <Input
                            id="subject"
                            value={formData.subject}
                            onChange={(e) => handleInputChange("subject", e.target.value)}
                            placeholder="What is this regarding?"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          placeholder="Please provide details about your inquiry..."
                          rows={6}
                          required
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-gold hover:bg-gold-dark text-white py-3 text-lg font-semibold"
                      >
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* ✅ MOVED: Quick Actions Section */}
            </div>

            {/* RIGHT COLUMN: Map and Business Hours */}
            <div className="space-y-8">
              {/* Map */}
              <Card className="border-0 shadow-elegant">
                <CardContent className="p-0">
                  <div id="map" className="h-80 w-full rounded-lg" style={{ zIndex: 0 }}></div>
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card className="border-0 shadow-elegant">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
                    <Clock className="w-6 h-6 mr-2 text-gold" />
                    Business Hours
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                      <span className="font-medium">Saturday - Thursday</span>
                      <span className="text-muted-foreground">8:00 AM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                      <span className="font-medium">Friday</span>
                      <span className="text-muted-foreground">2:00 PM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="font-medium">Emergency Support</span>
                      <span className="text-gold font-medium">24/7 Available</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900">
              Frequently Asked <span className="text-gold">Questions</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Quick answers to common questions about our services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-soft">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-neutral-900 mb-3">How far in advance should I book?</h3>
                <p className="text-muted-foreground text-sm">
                  We recommend booking at least 3-7 days in advance, especially during Hajj and Umrah seasons.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-neutral-900 mb-3">Are your drivers experienced?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, all our drivers are licensed professionals with extensive knowledge of pilgrimage routes and sites.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-neutral-900 mb-3">What payment methods do you accept?</h3>
                <p className="text-muted-foreground text-sm">
                  We accept cash, bank transfers, and major credit cards. Payment details will be shared upon booking confirmation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-neutral-900 mb-3">Can I cancel or modify my booking?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, cancellations and modifications are possible with advance notice. Terms vary by package and timing.
                </p>
              </CardContent>
            </Card>
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
              <span className="text-gold">Contact Us</span>
            </div>
          </div>
        </div>
      </footer>
      <WhatsAppButton />
    </main>
  );
};

export default ContactPage;