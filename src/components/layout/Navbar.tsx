import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Home, Stethoscope, Users, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", path: "/", icon: Home },
  { name: "Services", path: "/services", icon: Stethoscope },
  { name: "Book a Nurse", path: "/book", icon: Calendar },
  { name: "About Us", path: "/about", icon: Users },
  { name: "Contact", path: "/contact", icon: Mail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <span className="font-heading font-bold text-xl text-primary">I-CARE</span>
              <span className="block text-xs text-muted-foreground">Health Solution</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all duration-200",
                  location.pathname === link.path
                    ? "bg-accent text-secondary"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Phone className="w-4 h-4" />
              Call Now
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <Link to="/book">Book a Nurse</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            isOpen ? "max-h-[500px] pb-6" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-2 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200",
                  location.pathname === link.path
                    ? "bg-accent text-secondary"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted"
                )}
              >
                <link.icon className="w-5 h-5" />
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
              <Button variant="outline" className="w-full gap-2">
                <Phone className="w-4 h-4" />
                Call Now
              </Button>
              <Button variant="secondary" className="w-full" asChild>
                <Link to="/book" onClick={() => setIsOpen(false)}>
                  Book a Nurse
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
