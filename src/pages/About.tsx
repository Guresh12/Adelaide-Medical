import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye, Heart, Award, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const stats = [
  { value: "500+", label: "Patients Served" },
  { value: "15+", label: "Expert Nurses" },
  { value: "10+", label: "Years Experience" },
  { value: "98%", label: "Satisfaction Rate" },
];

const values = [
  {
    icon: Heart,
    title: "Compassion First",
    description: "Every interaction is guided by genuine care and empathy for our patients and their families.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We maintain the highest standards in healthcare delivery, continuously improving our services.",
  },
  {
    icon: Users,
    title: "Personalization",
    description: "Each care plan is tailored to the unique needs, preferences, and circumstances of our patients.",
  },
  {
    icon: Clock,
    title: "Reliability",
    description: "We're committed to being there when you need us, providing consistent and dependable care.",
  },
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-20">
        <div className="container-custom text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-4 animate-fade-up">
            About Us
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-up" style={{ animationDelay: "100ms" }}>
            Caring for Your Health, <br className="hidden sm:block" />One Home at a Time
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "200ms" }}>
            Since our founding, Adelaide Medical Services has been dedicated to bringing quality healthcare directly to families who need it most.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-card border-b border-border">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-heading text-4xl font-bold text-secondary mb-1">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-medical animate-fade-up">
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-secondary" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground">
                To provide exceptional, compassionate home healthcare services that enable individuals to maintain their independence, dignity, and quality of life in the comfort of their own homes. We are committed to delivering personalized care that treats each patient as family.
              </p>
            </div>

            <div className="card-medical animate-fade-up" style={{ animationDelay: "100ms" }}>
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-secondary" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground">
                To be the most trusted name in home healthcare, recognized for our unwavering commitment to excellence, innovation, and patient-centered care. We envision a world where everyone has access to quality healthcare without leaving the comfort of home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative animate-fade-up">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=600&fit=crop&crop=face"
                alt="Dr. Sarah Johnson, Founder"
                className="rounded-3xl shadow-card object-cover w-full max-w-md mx-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-2xl shadow-card max-w-[240px]">
                <div className="font-heading font-semibold text-foreground">15+ Years</div>
                <div className="text-sm text-muted-foreground">of Nursing Excellence</div>
              </div>
            </div>

            <div className="animate-fade-up" style={{ animationDelay: "100ms" }}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-secondary text-sm font-medium mb-4">
                Our Founder
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                A Journey Rooted in Compassion
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Dr. Sarah Johnson founded Adelaide Medical Services after witnessing firsthand the challenges families face when caring for loved ones at home. With her Master's degree in Nursing and over 15 years of clinical experience, she envisioned a healthcare service that would bridge the gap between hospital care and home comfort.
                </p>
                <p>
                  "I started Adelaide Medical Services because I believed every family deserves access to quality nursing care without the stress and inconvenience of constant hospital visits," says Dr. Johnson. "Our nurses don't just provide medical care—they become trusted partners in each family's healthcare journey."
                </p>
                <p>
                  What began as a small team of dedicated nurses has grown into a comprehensive home healthcare service, but the core principle remains unchanged: treat every patient like family.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-secondary text-sm font-medium mb-4">
              Our Values
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Drives Us Every Day
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core values guide every decision we make and every interaction we have with our patients and their families.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="card-medical text-center animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mx-auto mb-5">
                  <value.icon className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">
            Ready to Experience Our Care?
          </h2>
          <p className="text-secondary-foreground/80 max-w-2xl mx-auto mb-8">
            Join the hundreds of families who have trusted us with their loved ones' care.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="default" size="lg" asChild>
              <Link to="/book">
                Book a Nurse
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
              asChild
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
