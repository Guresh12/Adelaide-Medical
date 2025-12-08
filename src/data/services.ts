import { Home, Pill, Activity, Heart, Bandage, HeartPulse, Stethoscope } from "lucide-react";

export const services = [
  {
    id: "home-nursing",
    icon: Home,
    title: "Home Nursing Care",
    description: "Comprehensive nursing care in the comfort of your home. Our skilled nurses provide personalized medical attention, health monitoring, and compassionate support.",
    features: ["24/7 availability", "Skilled nursing professionals", "Personalized care plans"],
  },
  {
    id: "medication-management",
    icon: Pill,
    title: "Medication Management",
    description: "Expert medication administration and management to ensure proper dosing, timing, and monitoring of all prescribed medications.",
    features: ["Medication scheduling", "Drug interaction monitoring", "Refill coordination"],
  },
  {
    id: "post-surgery",
    icon: Activity,
    title: "Post-Surgery Care",
    description: "Specialized recovery support following surgical procedures. We help patients heal faster with professional wound care and rehabilitation assistance.",
    features: ["Wound monitoring", "Pain management", "Mobility assistance"],
  },
  {
    id: "elderly-support",
    icon: Heart,
    title: "Elderly Support",
    description: "Compassionate care for seniors, helping them maintain independence and quality of life while ensuring their safety and well-being.",
    features: ["Daily living assistance", "Companionship", "Fall prevention"],
  },
  {
    id: "wound-dressing",
    icon: Bandage,
    title: "Wound Dressing",
    description: "Professional wound care and dressing changes using sterile techniques to promote healing and prevent infection.",
    features: ["Sterile techniques", "Infection prevention", "Healing monitoring"],
  },
  {
    id: "palliative-care",
    icon: HeartPulse,
    title: "Palliative Care",
    description: "Comfort-focused care for patients with serious illnesses, emphasizing pain relief, emotional support, and quality of life.",
    features: ["Pain management", "Emotional support", "Family counseling"],
  },
  {
    id: "vitals-monitoring",
    icon: Stethoscope,
    title: "Vitals Monitoring",
    description: "Regular monitoring of vital signs including blood pressure, heart rate, temperature, and oxygen levels with detailed reporting.",
    features: ["Real-time monitoring", "Health trend analysis", "Doctor coordination"],
  },
];

export type Service = typeof services[number];
