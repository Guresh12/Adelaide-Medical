import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { services } from "@/data/services";

export default function Services() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-20">
        <div className="container-custom text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-4 animate-fade-up">
            Our Services
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-up" style={{ animationDelay: "100ms" }}>
            Professional Home Healthcare Services
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "200ms" }}>
            Comprehensive care solutions delivered by licensed professionals, tailored to meet your unique healthcare needs at home.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="card-medical group animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="icon-wrapper mb-6 group-hover:bg-secondary transition-colors">
                  <service.icon className="group-hover:text-secondary-foreground" />
                </div>
                
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-secondary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button variant="medical" className="w-full" asChild>
                  <Link to={`/book?service=${service.id}`}>
                    Book This Service
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muted">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Our care coordinators are available to help you understand your options and find the perfect care solution for your needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/contact">
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/book">
                Start Booking
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
