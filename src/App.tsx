// src/App.tsx
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

// Lazy load other pages to improve initial load time
import { lazy, Suspense } from "react";
// ✅ IMPORT HELMET PROVIDER FOR SEO
import { HelmetProvider } from "react-helmet-async";

const About = lazy(() => import("./pages/About"));
const DestinationsPage = lazy(() => import("./pages/DestinationsPage"));
const PackagesPage = lazy(() => import("./pages/PackagesPage"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CabPage = lazy(() => import("./pages/CabsPage")); // ✅ Existing
const CabBookingPage = lazy(() => import("./pages/CabBookingPage"));
const SelectCabPage = lazy(() => import("./pages/SelectCabPage"));
const BookingConfirmationPage = lazy(() => import("./pages/BookingConfirmationPage")); // ✅ FIXED: IMPORT ADDED!

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      {/* ✅ GLOBAL SEO: Preconnect & DNS Prefetch for performance */}
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.ziyarah-travels.com" />

      {/* ✅ GLOBAL SCHEMA.ORG: WebSite + Organization */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Ziyarah Travels",
          "url": "https://www.ziyarah-travels.com",
          /*"potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.ziyarah-travels.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }*/
        })
      }} />

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
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/about"
              element={
                <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
                  <About />
                </Suspense>
              }
            />
            <Route
              path="/destinations"
              element={
                <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
                  <DestinationsPage />
                </Suspense>
              }
            />
            <Route
              path="/packages"
              element={
                <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
                  <PackagesPage />
                </Suspense>
              }
            />
            <Route
              path="/booking"
              element={
                <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
                  <BookingPage />
                </Suspense>
              }
            />
            <Route
              path="/contact"
              element={
                <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
                  <ContactPage />
                </Suspense>
              }
            />
            {/* ✅ Route for Cabs Listing Page */}
            <Route
              path="/cabs"
              element={
                <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
                  <CabPage />
                </Suspense>
              }
            />
            {/* ✅ NEW: Route for Selecting Cab after choosing route */}
            <Route
              path="/select-cab"
              element={
                <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading cab options...</div>}>
                  <SelectCabPage />
                </Suspense>
              }
            />
            {/* ✅ Route for Final Booking Form */}
            <Route
              path="/cab-booking"
              element={
                <Suspense fallback={<div>Loading booking form...</div>}>
                  <CabBookingPage />
                </Suspense>
              }
            />
            {/* ✅ CRITICAL: This was missing the import! Now fixed. */}
            <Route
              path="/booking-confirmation"
              element={
                <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading confirmation...</div>}>
                  <BookingConfirmationPage />
                </Suspense>
              }
            />

            {/* ❗ Catch-all route — KEEP THIS LAST */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;