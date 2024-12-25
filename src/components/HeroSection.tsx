import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";

interface HeroSectionProps {
  doctorName?: string;
  specialty?: string;
  onBookAppointment?: () => void;
}

const HeroSection = ({
  doctorName = "Dr. Sarah Johnson",
  specialty = "Family Medicine Specialist",
  onBookAppointment = () => {},
}: HeroSectionProps) => {
  return (
    <div className="relative w-full h-[600px] bg-white">
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30">
        <img
          src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80"
          alt="Doctor's office"
          className="w-full h-full object-cover mix-blend-overlay"
        />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center h-full max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Welcome to {doctorName}'s Practice
          </h1>

          <p className="text-xl sm:text-2xl text-white/90 mb-6">{specialty}</p>

          <p className="text-lg text-white/80 mb-8">
            Providing compassionate, comprehensive healthcare for you and your
            family
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-[#FF9F1C] hover:bg-[#FF9F1C]/90 text-white"
              onClick={onBookAppointment}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book Appointment
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            >
              <Clock className="mr-2 h-5 w-5" />
              View Office Hours
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
