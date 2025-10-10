// src/App.tsx
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

// Lazy load all pages (including new admin pages)
import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";

// Public pages
const About = lazy(() => import("./pages/About"));
const DestinationsPage = lazy(() => import("./pages/DestinationsPage"));
const PackagesPage = lazy(() => import("./pages/PackagesPage"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CabPage = lazy(() => import("./pages/CabsPage"));
const CabBookingPage = lazy(() => import("./pages/CabBookingPage"));
const SelectCabPage = lazy(() => import("./pages/SelectCabPage"));
const BookingConfirmationPage = lazy(() => import("./pages/BookingConfirmationPage"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin.tsx"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      {/* ✅ GLOBAL SEO: Preconnect & DNS Prefetch */}
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.ziyarah-travels.com" />

      {/* ✅ Schema.org: WebSite */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Ziyarah Travels",
          "url": "https://www.ziyarah-travels.com"
        })
      }} />

      {/* ✅ Schema.org: Organization */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Ziyarah Travels Transport Services",
          "url": "https://www.ziyarah-travels.com",
          "logo": "https://www.ziyarah-travels.com/main10.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+966559572454",
            "contactType": "Customer Service",
            "areaServed": "SA",
            "availableLanguage": ["English", "Arabic", "Urdu"]
          },
          "sameAs": [
            "https://twitter.com/ZiyarahTravels",
            "https://www.facebook.com/ZiyarahTravels",
            "https://www.instagram.com/ZiyarahTravels"
          ]
        })
      }} />

      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/destinations" element={<DestinationsPage />} />
              <Route path="/packages" element={<PackagesPage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cabs" element={<CabPage />} />
              <Route path="/select-cab" element={<SelectCabPage />} />
              <Route path="/cab-booking" element={<CabBookingPage />} />
              <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />

              {/* ✅ Admin Routes */}
              <Route path="/zaccessv" element={<AdminLogin />} />
              <Route path="/zaccessv/dashboard" element={<AdminDashboard />} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;