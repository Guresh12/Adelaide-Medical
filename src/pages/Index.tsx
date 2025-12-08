import { Link } from "react-router-dom";
import { ArrowRight, Phone, Shield, Clock, Award, Heart, Users, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export default function Index() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-secondary blur-3xl" />
          <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-secondary blur-3xl" />
        </div>

        <div className="container-custom relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-primary-foreground space-y-8 animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary backdrop-blur-sm">
                <Heart className="w-4 h-4" />
                <span className="text-sm font-medium">Trusted Home Healthcare</span>
              </div>
              
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Compassionate Home Nursing{" "}
                <span className="text-secondary">You Can Trust</span>
              </h1>
              
              <p className="text-lg md:text-xl text-primary-foreground/80 max-w-lg">
                Professional, personalized care delivered to your home. Experience healthcare that puts you and your family first.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/book">
                    Book a Nurse
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="hero-outline" size="xl">
                  <Phone className="w-5 h-5" />
                  Call Now
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-primary-foreground/10">
                <div>
                  <div className="font-heading text-3xl font-bold text-secondary">50+</div>
                  <div className="text-sm text-primary-foreground/70">Happy Patients</div>
                </div>
                <div>
                  <div className="font-heading text-3xl font-bold text-secondary">2+</div>
                  <div className="text-sm text-primary-foreground/70">Expert Nurses</div>
                </div>
                <div>
                  <div className="font-heading text-3xl font-bold text-secondary">24/7</div>
                  <div className="text-sm text-primary-foreground/70">Available</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative hidden lg:block animate-fade-up" style={{ animationDelay: "200ms" }}>
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=700&fit=crop"
                  alt="Caring nurse with patient"
                  className="rounded-3xl shadow-2xl object-cover w-full"
                />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-2xl shadow-card animate-float">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                    <Shield className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-foreground">Certified Care</div>
                    <div className="text-sm text-muted-foreground">Licensed Professionals</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-secondary text-sm font-medium mb-4">
              Our Services
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comprehensive Home Healthcare
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From basic health monitoring to specialized nursing care, we provide a full range of services tailored to your needs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.slice(0, 4).map((service, index) => (
              <div
                key={service.id}
                className="card-medical group animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="icon-wrapper mb-5 group-hover:bg-secondary transition-colors">
                  <service.icon className="group-hover:text-secondary-foreground" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {service.description}
                </p>
                <Link
                  to="/services"
                  className="inline-flex items-center text-secondary font-medium text-sm hover:gap-2 transition-all"
                >
                  Learn More <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/services">
                View All Services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-up">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-secondary text-sm font-medium mb-4">
                Why Choose Us
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                Healthcare That Comes to You
              </h2>
              <p className="text-muted-foreground mb-8">
                We believe quality healthcare should be accessible to everyone. Our team of certified professionals brings hospital-grade care directly to your home, ensuring comfort and convenience.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Shield, title: "Licensed & Insured", desc: "All nurses are fully licensed, insured, and background-checked" },
                  { icon: Clock, title: "24/7 Availability", desc: "Round-the-clock care whenever you need it" },
                  { icon: Award, title: "Experienced Team", desc: "Average of 8+ years of nursing experience" },
                  { icon: Users, title: "Personalized Care", desc: "Customized care plans for each patient's unique needs" },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-foreground mb-1">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-fade-up" style={{ animationDelay: "200ms" }}>
              <img
                src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=600&h=700&fit=crop"
                alt="Nurse caring for patient at home"
                className="rounded-3xl shadow-card object-cover w-full"
              />
              <div className="absolute -top-6 -right-6 bg-card p-6 rounded-2xl shadow-card">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-card bg-accent" />
                    ))}
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-foreground">500+</div>
                    <div className="text-xs text-muted-foreground">Happy Families</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Nurse Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative animate-fade-up">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=600&fit=crop&crop=face"
                alt="Lead Nurse"
                className="rounded-3xl shadow-card object-cover w-full max-w-md mx-auto"
              />
            </div>

            <div className="order-1 lg:order-2 animate-fade-up" style={{ animationDelay: "100ms" }}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-secondary text-sm font-medium mb-4">
                Meet Our Leader
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                Dr. Sarah Johnson, RN, MSN
              </h2>
              <p className="text-muted-foreground mb-4">
                With over 15 years of nursing experience and a Master's degree in Nursing, Dr. Johnson founded I-CARE Health Solution with a simple mission: to bring hospital-quality care into the warmth of home.
              </p>
              <p className="text-muted-foreground mb-6">
                Her vision of compassionate, patient-centered care has helped over 500 families receive the support they deserve, right where they feel most comfortable.
              </p>
              <Button variant="secondary" asChild>
                <Link to="/about">
                  Learn More About Us
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-primary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-4">
              Testimonials
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              What Our Patients Say
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="bg-card rounded-3xl p-8 md:p-12 shadow-card">
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                  ))}
                </div>
                <blockquote className="text-lg md:text-xl text-foreground mb-8">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-heading font-semibold text-foreground">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonials[currentTestimonial].role}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={prevTestimonial}
                  className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-primary-foreground" />
                </button>
                <div className="flex items-center gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={cn(
                        "w-2.5 h-2.5 rounded-full transition-all",
                        index === currentTestimonial
                          ? "bg-secondary w-8"
                          : "bg-primary-foreground/30 hover:bg-primary-foreground/50"
                      )}
                    />
                  ))}
                </div>
                <button
                  onClick={nextTestimonial}
                  className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-primary-foreground" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section-padding bg-secondary">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">
            Ready to Experience Quality Home Care?
          </h2>
          <p className="text-secondary-foreground/80 max-w-2xl mx-auto mb-8">
            Book a consultation today and let us create a personalized care plan for you or your loved one.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="default" size="xl" asChild>
              <Link to="/book">
                Book a Nurse Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Phone className="w-5 h-5" />
              Call: +1 (555) 123-4567
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
