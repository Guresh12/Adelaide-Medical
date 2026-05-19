import { Link } from "react-router-dom";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { useServices } from "@/hooks/useServices";
import ServiceIcon from "@/components/ui/ServiceIcon";

export default function Services() {
  const { data: servicesData = [], isLoading } = useServices(true);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-background py-20 relative overflow-hidden border-b border-border">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl opacity-70" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl opacity-70" />
        </div>

        <div className="container-custom text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-primary text-sm font-medium mb-4 animate-fade-up">
            Our Services
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-navy mb-4 animate-fade-up" style={{ animationDelay: "100ms" }}>
            Professional Home Healthcare Services
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "200ms" }}>
            Comprehensive care solutions delivered by licensed professionals, tailored to meet your unique healthcare needs at home.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesData.map((service, index) => (
                <div
                  key={service.id}
                  className="card-medical group animate-fade-up overflow-hidden p-0"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    <img
                      src={service.image_url || "/ns.jpg"}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-accent/20">
                        <ServiceIcon name={service.icon_name} className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="font-heading text-2xl font-bold text-navy mb-3">
                      {service.title}
                    </h3>

                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-foreground">
                          <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button variant="secondary" className="w-full group/btn" asChild>
                      <Link to={`/book?service=${service.id}`}>
                        Book This Service
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
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
