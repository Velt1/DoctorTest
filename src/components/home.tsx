// src/components/home.tsx
import React from "react";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import AppointmentForm from "./AppointmentForm";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

interface HomePageProps {
  doctorName?: string;
  specialty?: string;
}

const HomePage = ({
  doctorName = "Dr. Sarah Johnson",
  specialty = "Family Medicine Specialist",
}: HomePageProps) => {
  const [isAppointmentFormOpen, setIsAppointmentFormOpen] =
    React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();

  const handleBookAppointment = () => {
    setIsAppointmentFormOpen(true);
  };

  const handleCloseAppointmentForm = () => {
    setIsAppointmentFormOpen(false);
  };

  const checkTimeConflict = async (date: string, time: string) => {
    const { data: existingAppointments } = await supabase
      .from("appointments")
      .select("*")
      .eq("appointment_date", date)
      .eq("appointment_time", time);

    return existingAppointments && existingAppointments.length > 0;
  };

  const handleSubmitAppointment = async (formData: any) => {
    try {
      setIsSubmitting(true);

      // Validate required fields
      if (
        !formData.name ||
        !formData.email ||
        !formData.phone ||
        !formData.date ||
        !formData.time
      ) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast({
          title: "Error",
          description: "Please enter a valid email address",
          variant: "destructive",
        });
        return;
      }

      // Format date for database
      const formattedDate = formData.date.toISOString().split("T")[0];

      // Check for time conflicts
      const hasConflict = await checkTimeConflict(formattedDate, formData.time);
      if (hasConflict) {
        toast({
          title: "Time Slot Unavailable",
          description:
            "This time slot is already booked. Please select another time.",
          variant: "destructive",
        });
        return;
      }

      // Save to Supabase
      const { error } = await supabase.from("appointments").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        appointment_date: formattedDate,
        appointment_time: formData.time,
        reason: formData.reason,
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your appointment has been booked successfully.",
      });

      setIsAppointmentFormOpen(false);
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast({
        title: "Error",
        description: "Failed to book appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        doctorName={doctorName}
        specialty={specialty}
        onBookAppointment={handleBookAppointment}
      />

      <ServicesSection />

      <AppointmentForm
        open={isAppointmentFormOpen}
        onClose={handleCloseAppointmentForm}
        onSubmit={handleSubmitAppointment}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default HomePage;
