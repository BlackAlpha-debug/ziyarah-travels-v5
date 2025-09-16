// src/pages/SelectCabPage.tsx
import { useSearchParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/navigation";
import WhatsAppButton from "@/components/WhatsappAppButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { quickCabs, normalizeCarNameForRoute } from "@/lib/quickCabs";
import { routes } from "@/lib/routes"; // ✅ Import routes

const SelectCabPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const from = searchParams.get("from") || "Unknown";
  const to = searchParams.get("to") || "Unknown";

  // ✅ FIXED: Find route by partial match of from/to in route name
  const route = routes.find((r) => {
    const lowerFrom = from.toLowerCase().trim();
    const lowerTo = to.toLowerCase().trim();
    const lowerRouteName = r.name.toLowerCase();
    return lowerRouteName.includes(lowerFrom) && lowerRouteName.includes(lowerTo);
  }) || null;

  // ✅ FIXED: normalizeCarNameForRoute returns original name — no modification!
  const getPriceForCab = (cabName: string) => {
    if (!route) return 0;
    const key = normalizeCarNameForRoute(cabName); // e.g., "Sonata"
    return route.prices[key as keyof typeof route.prices] || 0;
  };

  const handleSelectCab = (cabName: string, category: string) => {
    navigate(`/cab-booking?cab=${encodeURIComponent(cabName)}&category=${encodeURIComponent(category)}`);
  };

  const getCategoryBadgeStyle = (category: string) => {
    switch (category) {
      case "Economy":
        return "bg-green-500 text-white";
      case "Business":
        return "bg-blue-500 text-white";
      case "Premium":
        return "bg-purple-500 text-white";
      case "Group":
        return "bg-orange-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <main className="min-h-screen bg-neutral-50">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-12 px-6 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Select Your <span className="text-gold">Cab</span>
          </h1>
          <p className="text-xl text-neutral-200">
            From: <strong>{from}</strong> → To: <strong>{to}</strong>
          </p>
        </div>
      </section>

      {/* Cab Selection Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* ✅ Fallback UI if no route found */}
          {!route && (
            <div className="col-span-full text-center py-12 text-red-500 bg-red-50 rounded-lg border border-red-200">
              ❌ No pricing data available for "{from}" to "{to}". Please check your selection.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quickCabs.map((cab) => {
              const price = getPriceForCab(cab.name);

              // Optional: Hide cabs with zero price if route not found
              if (!route && price === 0) return null;

              return (
                <Card
                  key={cab.id}
                  className="hover:shadow-elegant transition-all duration-300 border-0 shadow-soft group"
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={cab.image}
                      alt={cab.name}
                      className="w-full h-full object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className={`px-3 py-1 rounded-full ${getCategoryBadgeStyle(cab.category)}`}>
                        {cab.category}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-xl font-bold text-neutral-900">
                        {cab.name}
                      </span>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gold" />
                        <span className="font-medium text-sm text-gold">
                          {cab.capacity} Passengers
                        </span>
                      </div>
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {cab.description}
                    </p>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg font-semibold text-gold">
                        {price} SAR
                      </span>
                    </div>

                    <Button
                      onClick={() => handleSelectCab(cab.name, cab.category)}
                      className="w-full bg-gold hover:bg-gold-dark text-white font-semibold"
                    >
                      Select This Cab
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <WhatsAppButton />
    </main>
  );
};

export default SelectCabPage;