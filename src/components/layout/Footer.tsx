import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Stethoscope, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Book a Nurse", path: "/book" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const services = [
  "Home Nursing Care",
  "Medication Management",
  "Post-surgery Care",
  "Elderly Support",
  "Wound Dressing",
  "Palliative Care",
];

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Linkedin, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div>
                <span className="font-heading font-bold text-xl">Adelaide</span>
                <span className="block text-xs text-primary-foreground/70">Medical Services</span>
              </div>
            </div>
            <p className="text-primary-foreground/80 mb-6">
              Professional, personalized home nursing care delivered with compassion and excellence.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-primary-foreground/80">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-secondary mt-0.5" />
                <div>
                  <p className="text-primary-foreground/80">+254706538146</p>
                  <p className="text-primary-foreground/80">+254706538146</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-secondary mt-0.5" />
                <p className="text-primary-foreground/80">info@adelaide.co.ke</p>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary mt-0.5" />
                <p className="text-primary-foreground/80">
                  123 Healthcare South C,<br />Nairobi, City 12345
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center">
          <p className="text-primary-foreground/60">
            © {new Date().getFullYear()} Adelaide Medical Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
