import { Home, Pill, Activity, Heart, Bandage, HeartPulse, Stethoscope } from "lucide-react";

export const services = [
  {
    id: "nursing-care",
    icon: Stethoscope,
    image: "ns.jpg",
    title: "Nursing & Clinical Care",
    description: "Comprehensive nursing assessments, medication administration, IV infusions, wound care, and post-surgical support delivered by qualified professionals.",
    features: ["Medication Management", "IV Infusions & Injections", "Wound Care & Dressing", "Chronic Illness Management", "Post-Hospital Care"],
  },
  {
    id: "medical-visits",
    icon: Activity,
    image: "ms.jpg",
    title: "Medical & Specialist Visits",
    description: "Access to doctor home visits and specialist consultations to ensure your medical needs are met without leaving your home.",
    features: ["Doctor Home Visits", "Specialist Consults", "Care Coordination", "Referrals"],
  },
  {
    id: "allied-health",
    icon: HeartPulse,
    image: "aly.jpg",
    title: "Allied Health Services",
    description: "Supporting your recovery and mobility with professional physiotherapy and rehabilitation services tailored to your goals.",
    features: ["Physiotherapy", "Rehabilitation Support", "Mobility Care", "Recovery Plans"],
  },
  {
    id: "personal-care",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=500&h=350&fit=crop",
    title: "Personal & Support Care",
    description: "Compassionate one-on-one care including elderly support, palliative care, and assistance with daily living activities.",
    features: ["One-on-one Caregivers", "Elderly & Long-term Care", "Palliative Care", "Companionship"],
  },
];

export type Service = typeof services[number];
