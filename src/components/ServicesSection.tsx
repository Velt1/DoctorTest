import React from "react";
import { Card } from "@/components/ui/card";
import {
  Stethoscope,
  Heart,
  Brain,
  Baby,
  Pill,
  Activity,
  Syringe,
  Microscope,
} from "lucide-react";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ServicesSectionProps {
  services?: Service[];
}

const DEFAULT_SERVICES: Service[] = [
  {
    icon: <Stethoscope className="w-8 h-8 text-[#FF9F1C]" />,
    title: "General Medicine",
    description: "Comprehensive primary care for patients of all ages",
  },
  {
    icon: <Heart className="w-8 h-8 text-[#FF9F1C]" />,
    title: "Cardiology",
    description: "Expert care for heart and cardiovascular conditions",
  },
  {
    icon: <Brain className="w-8 h-8 text-[#FF9F1C]" />,
    title: "Neurology",
    description: "Specialized treatment for neurological disorders",
  },
  {
    icon: <Baby className="w-8 h-8 text-[#FF9F1C]" />,
    title: "Pediatrics",
    description: "Dedicated care for children and adolescents",
  },
  {
    icon: <Pill className="w-8 h-8 text-[#FF9F1C]" />,
    title: "Internal Medicine",
    description: "Diagnosis and treatment of adult diseases",
  },
  {
    icon: <Activity className="w-8 h-8 text-[#FF9F1C]" />,
    title: "Preventive Care",
    description: "Regular check-ups and health maintenance",
  },
  {
    icon: <Syringe className="w-8 h-8 text-[#FF9F1C]" />,
    title: "Emergency Care",
    description: "Immediate medical attention for urgent conditions",
  },
  {
    icon: <Microscope className="w-8 h-8 text-[#FF9F1C]" />,
    title: "Laboratory Services",
    description: "Comprehensive diagnostic testing and analysis",
  },
];

const ServicesSection = ({
  services = DEFAULT_SERVICES,
}: ServicesSectionProps) => {
  return (
    <section className="w-full min-h-[600px] bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a comprehensive range of medical services to meet all your
            healthcare needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
