// src/pages/admin/AdminDashboard.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { isAdminLoggedIn, logoutAdmin } from "@/lib/adminAuth";
import emailjs from "@emailjs/browser";
import { sendWhatsAppMessage } from "@/lib/utils";

emailjs.init("awvJIls7xVUtlL1yt");

const BookingCard = ({
  booking,
  onView,
  onConfirm,
  onCancel,
  showActions = false,
}: {
  booking: any;
  onView: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  showActions?: boolean;
}) => (
  <Card className="border border-neutral-200/60 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
    <CardContent className="p-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-lg text-neutral-900 truncate">
              #{booking.booking_id}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              booking.status === "confirmed"
                ? "bg-green-100 text-green-800"
                : booking.status === "canceled"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground truncate">{booking.customer_name}</p>
          <p className="text-sm mt-2 text-neutral-700">
            <span className="font-medium">Route:</span> {booking.route}
          </p>
          <p className="text-sm text-neutral-700">
            <span className="font-medium">Vehicle:</span> {booking.vehicle}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={onView}
            className="border-neutral-300 text-neutral-700 hover:bg-neutral-100"
          >
            View
          </Button>
          {showActions && onConfirm && onCancel && (
            <>
              <Button
                size="sm"
                onClick={onConfirm}
                className="bg-green-600 hover:bg-green-700 text-white shadow-sm"
              >
                Confirm
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={onCancel}
                className="border-red-500 text-red-600 hover:bg-red-50 hover:border-red-600"
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);

// ✅ Inline BookingDetailModal
const BookingDetailModal = ({
  isOpen,
  onClose,
  booking,
}: {
  isOpen: boolean;
  onClose: () => void;
  booking: any;
}) => {
  if (!booking) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-neutral-900">
            Booking Details
          </DialogTitle>
          <p className="text-muted-foreground">#{booking.booking_id}</p>
        </DialogHeader>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          {Object.entries(booking)
            .filter(([key]) => key !== "timestamp") // optional: hide timestamp
            .map(([key, value]) => (
              <div key={key} className="break-words">
                <span className="font-medium text-neutral-700 capitalize">
                  {key.replace(/_/g, " ")}:
                </span>{" "}
                <span className="text-neutral-900">{String(value)}</span>
              </div>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate("/zaccessv", { replace: true });
      return;
    }

    const stored = localStorage.getItem("ziyarah_bookings");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const withStatus = parsed.map((b: any) => ({
          ...b,
          status: b.status || "pending",
        }));
        setBookings(withStatus);
      } catch (e) {
        console.error("Failed to parse bookings", e);
        setBookings([]);
      }
    }
  }, [navigate]);

  const updateBookingStatus = async (id: string, status: "confirmed" | "canceled") => {
    const updated = bookings.map((b) =>
      b.booking_id === id ? { ...b, status } : b
    );
    setBookings(updated);
    localStorage.setItem("ziyarah_bookings", JSON.stringify(updated));

    const booking = updated.find((b) => b.booking_id === id);
    if (status === "confirmed" && booking) {
      try {
        await sendWhatsAppMessage(
          booking.phone,
          booking.customer_name.split(" ")[0],
          booking.booking_id,
          booking.vehicle,
          booking.category,
          booking.route,
          booking.trip_type,
          booking.price.replace(" SAR", ""),
          booking.preferred_date,
          booking.phone,
          booking.email
        );

        await emailjs.send("service_xbv79li", "template_097whrj", {
          booking_id: booking.booking_id,
          vehicle: booking.vehicle,
          route: booking.route,
          trip_type: booking.trip_type,
          preferred_date: booking.preferred_date,
          price: booking.price,
          phone: booking.phone,
          email: booking.email,
          customer_name: booking.customer_name,
        });
      } catch (error) {
        alert("Confirmation messages failed, but booking was updated.");
        console.error("Confirmation error:", error);
      }
    }
  };

  const filteredBookings = (status: string) =>
    bookings.filter((b) => b.status === status);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Ziyarah Admin</h1>
            <p className="text-sm text-muted-foreground">Manage pilgrimage bookings</p>
          </div>
          <Button
            variant="ghost"
            onClick={() => {
              logoutAdmin();
              navigate("/zaccessv", { replace: true });
            }}
            className="text-red-600 hover:bg-red-50 hover:text-red-700 font-medium"
          >
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-900">Booking Management</h2>
          <p className="text-muted-foreground">Review and manage all customer requests</p>
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-neutral-100 p-1 rounded-xl">
            <TabsTrigger
              value="pending"
              className="data-[state=active]:bg-white data-[state=active]:text-gold data-[state=active]:shadow-sm rounded-lg transition-all"
            >
              Pending ({filteredBookings("pending").length})
            </TabsTrigger>
            <TabsTrigger
              value="confirmed"
              className="data-[state=active]:bg-white data-[state=active]:text-gold data-[state=active]:shadow-sm rounded-lg transition-all"
            >
              Confirmed ({filteredBookings("confirmed").length})
            </TabsTrigger>
            <TabsTrigger
              value="canceled"
              className="data-[state=active]:bg-white data-[state=active]:text-gold data-[state=active]:shadow-sm rounded-lg transition-all"
            >
              Canceled ({filteredBookings("canceled").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6 space-y-5">
            {filteredBookings("pending").length === 0 ? (
              <Card className="border-dashed border-neutral-300 bg-neutral-50">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No pending bookings at the moment.</p>
                </CardContent>
              </Card>
            ) : (
              filteredBookings("pending").map((booking) => (
                <BookingCard
                  key={booking.booking_id}
                  booking={booking}
                  onView={() => {
                    setSelectedBooking(booking);
                    setModalOpen(true);
                  }}
                  onConfirm={() => updateBookingStatus(booking.booking_id, "confirmed")}
                  onCancel={() => updateBookingStatus(booking.booking_id, "canceled")}
                  showActions={true}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="confirmed" className="mt-6 space-y-5">
            {filteredBookings("confirmed").length === 0 ? (
              <Card className="border-dashed border-neutral-300 bg-neutral-50">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No confirmed bookings yet.</p>
                </CardContent>
              </Card>
            ) : (
              filteredBookings("confirmed").map((booking) => (
                <BookingCard
                  key={booking.booking_id}
                  booking={booking}
                  onView={() => {
                    setSelectedBooking(booking);
                    setModalOpen(true);
                  }}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="canceled" className="mt-6 space-y-5">
            {filteredBookings("canceled").length === 0 ? (
              <Card className="border-dashed border-neutral-300 bg-neutral-50">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No canceled bookings.</p>
                </CardContent>
              </Card>
            ) : (
              filteredBookings("canceled").map((booking) => (
                <BookingCard
                  key={booking.booking_id}
                  booking={booking}
                  onView={() => {
                    setSelectedBooking(booking);
                    setModalOpen(true);
                  }}
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>

      <BookingDetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        booking={selectedBooking}
      />
    </div>
  );
}