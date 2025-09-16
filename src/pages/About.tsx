import Navigation from "../components/navigation";
import WhatsAppButton from "../components/WhatsappAppButton";
import { Card, CardContent } from "../components/ui/card";
import { Heart, Shield, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Heart,
    title: "Spiritual Care",
    description: "We understand the sacred nature of your journey and treat every pilgrimage with the utmost respect and reverence."
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Your safety is our top priority with modern vehicles, experienced drivers, and comprehensive insurance coverage."
  },
  {
    icon: Users,
    title: "Community Focus",
    description: "We serve the Muslim community with dedication, ensuring every pilgrim feels welcomed and supported."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Committed to providing exceptional service that honors the significance of your pilgrimage experience."
  }
];

const About = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About <span className="text-gold">Sacred Journey</span>
            </h1>
            <p className="text-xl text-neutral-200 max-w-4xl mx-auto leading-relaxed">
              Dedicated to serving pilgrims with honor, dignity, and excellence throughout their sacred journey in Saudi Arabia
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-neutral-900">
                Our <span className="text-gold">Mission</span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Sacred Journey Transport Services was founded with a singular purpose: to provide safe, comfortable, and respectful transportation for pilgrims visiting the holy sites of Saudi Arabia.
                </p>
                <p>
                  We recognize that your journey is not just a trip—it's a spiritual pilgrimage that deserves to be treated with the highest level of care and respect. Our team is committed to ensuring that your transportation needs are met with professionalism and understanding of Islamic values.
                </p>
                <p>
                  From the bustling streets of Makkah to the serene landscapes of Madinah, we are your trusted companion, facilitating seamless travel so you can focus on what matters most: your spiritual connection and worship.
                </p>
              </div>
            </div>
            <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <Card className="border-0 shadow-elegant">
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6">
                      <Heart className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-4">Serving with Purpose</h3>
                    <p className="text-muted-foreground">
                      Every journey we facilitate is an opportunity to serve Allah and support our fellow Muslims in their spiritual pursuits.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900">
              Our <span className="text-gold">Values</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide us in serving the pilgrim community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card 
                key={index}
                className="group hover:shadow-elegant transition-all duration-300 animate-fade-in-up border-0 shadow-soft"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900">
              Why Choose <span className="text-gold">Sacred Journey</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Local Expertise</h3>
                    <p className="text-muted-foreground">Our drivers are locals with deep knowledge of all pilgrimage sites and the most efficient routes.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Modern Fleet</h3>
                    <p className="text-muted-foreground">Well-maintained, air-conditioned vehicles equipped with all modern amenities for your comfort.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">24/7 Support</h3>
                    <p className="text-muted-foreground">Round-the-clock customer support to assist you throughout your pilgrimage journey.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <Card className="border-0 shadow-elegant bg-gradient-to-br from-gold/5 to-gold/10">
                <CardContent className="p-8 text-center">
                  <h3 className="text-3xl font-bold text-neutral-900 mb-6">Ready to Begin Your Journey?</h3>
                  <p className="text-muted-foreground mb-8 text-lg">
                    Let us take care of your transportation needs so you can focus on your spiritual experience.
                  </p>
                  <div className="space-y-4">
                    <Link to="/booking" className="block">
                      <button className="w-full bg-gold hover:bg-gold-dark text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300">
                        Book Your Transport
                      </button>
                    </Link>
                    <Link to="/contact" className="block">
                      <button className="w-full border border-gold text-gold hover:bg-gold hover:text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300">
                        Contact Us
                      </button>
                    </Link>
                  </div>
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

export default About;