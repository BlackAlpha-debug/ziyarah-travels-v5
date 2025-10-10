import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function BookingDetailModal({
  isOpen,
  onClose,
  booking,
}: {
  isOpen: boolean;
  onClose: () => void;
  booking: any;
}) {
  if (!booking) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Booking Details - #{booking.booking_id}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
          {Object.entries(booking).map(([key, value]) => (
            <div key={key} className="break-words">
              <span className="font-medium capitalize">{key.replace(/_/g, " ")}:</span> {String(value)}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}