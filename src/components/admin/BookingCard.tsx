import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function BookingCard({
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
}) {
  return (
    <Card className="border border-neutral-200 shadow-sm">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-bold text-neutral-900">#{booking.booking_id}</p>
            <p className="text-sm text-muted-foreground">{booking.customer_name}</p>
            <p className="text-sm mt-1">
              <span className="font-medium">Route:</span> {booking.route}
            </p>
            <p className="text-sm">
              <span className="font-medium">Vehicle:</span> {booking.vehicle}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onView}>
              View
            </Button>
            {showActions && onConfirm && onCancel && (
              <>
                <Button size="sm" onClick={onConfirm} className="bg-green-600 hover:bg-green-700">
                  Confirm
                </Button>
                <Button size="sm" variant="destructive" onClick={onCancel}>
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}