import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });

    setFormData({ name: "", email: "", phone: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      action: "tel:+15551234567",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@icarehealth.com", "support@icarehealth.com"],
      action: "mailto:info@icarehealth.com",
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["123 Healthcare Avenue", "Medical District, City 12345"],
      action: "#map",
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["24/7 Emergency Care", "Office: Mon-Fri 9AM-6PM"],
      action: null,
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-20">
        <div className="container-custom text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-4 animate-fade-up">
            Contact Us
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-up" style={{ animationDelay: "100ms" }}>
            Get in Touch
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "200ms" }}>
            Have questions about our services? We're here to help. Reach out to us anytime.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="animate-fade-up">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                We'd Love to Hear From You
              </h2>
              <p className="text-muted-foreground mb-8">
                Whether you have questions about our services, need to schedule a consultation, or want to learn more about how we can help, our team is ready to assist you.
              </p>

              <div className="space-y-6 mb-8">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground mb-1">
                        {item.title}
                      </h3>
                      {item.details.map((detail, i) => (
                        <p key={i} className="text-muted-foreground text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button variant="secondary" size="lg" asChild>
                  <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="tel:+15551234567">
                    <Phone className="w-5 h-5" />
                    Call Now
                  </a>
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-fade-up" style={{ animationDelay: "100ms" }}>
              <div className="card-medical">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-6">
                  Send Us a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                      required
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter your email"
                      type="email"
                      required
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter your phone number"
                      type="tel"
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we help you?"
                      rows={5}
                      required
                    />
                  </div>

                  <Button
                    variant="secondary"
                    size="lg"
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div id="map" className="mt-16 animate-fade-up">
            <div className="rounded-3xl overflow-hidden bg-muted h-[400px] flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                  Our Location
                </h3>
                <p className="text-muted-foreground">
                  123 Healthcare Avenue, Medical District, City 12345
                </p>
                <Button variant="secondary" size="sm" className="mt-4" asChild>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Google Maps
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
