import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DateTimeSelector from "./DateTimeSelector";

interface AppointmentFormProps {
  open?: boolean;
  onClose?: () => void;
  onSubmit?: (formData: AppointmentFormData) => void;
}

interface AppointmentFormData {
  name: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  reason: string;
}

const AppointmentForm = ({
  open = true,
  onClose = () => {},
  onSubmit = () => {},
}: AppointmentFormProps) => {
  const [formData, setFormData] = React.useState<AppointmentFormData>({
    name: "",
    email: "",
    phone: "",
    date: new Date(),
    time: "9:00 AM",
    reason: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-900">
            Book an Appointment
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="John Doe"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="john@example.com"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="(555) 555-5555"
                className="mt-1"
              />
            </div>

            <DateTimeSelector
              selectedDate={formData.date}
              selectedTime={formData.time}
              onDateChange={(date) =>
                setFormData({ ...formData, date: date || new Date() })
              }
              onTimeChange={(time) => setFormData({ ...formData, time })}
            />

            <div>
              <Label htmlFor="reason">Reason for Visit</Label>
              <Textarea
                id="reason"
                value={formData.reason}
                onChange={(e) =>
                  setFormData({ ...formData, reason: e.target.value })
                }
                placeholder="Please briefly describe your symptoms or reason for visit"
                className="mt-1"
                rows={4}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" style={{ backgroundColor: "#FF9F1C" }}>
              Book Appointment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentForm;
