import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Check, ArrowRight, ArrowLeft, Star, Calendar, Clock, User, MapPin, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/layout/Layout";
import { cn } from "@/lib/utils";
import { useNurses } from "@/hooks/useNurses";
import { useServices } from "@/hooks/useServices";
import { useCreateBooking } from "@/hooks/useBookings";
import type { Nurse, Service } from "@/types/database";

const steps = [
  { id: 1, title: "Select Service", icon: FileText },
  { id: 2, title: "Choose Nurse", icon: User },
  { id: 3, title: "Pick Date & Time", icon: Calendar },
  { id: 4, title: "Your Details", icon: MapPin },
  { id: 5, title: "Confirmation", icon: Check },
];

const timeSlots = [
  { id: "morning" as const, label: "Morning", time: "8:00 AM – 12:00 PM" },
  { id: "afternoon" as const, label: "Afternoon", time: "12:00 PM – 5:00 PM" },
  { id: "evening" as const, label: "Evening", time: "5:00 PM – 9:00 PM" },
];

export default function BookNurse() {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedNurse, setSelectedNurse] = useState<Nurse | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState<"morning" | "afternoon" | "evening" | "">("");
  const [formData, setFormData] = useState({ fullName: "", phone: "", email: "", address: "", notes: "" });
  const [bookingRef, setBookingRef] = useState("");

  const { data: services = [], isLoading: loadingServices } = useServices(true);
  const { data: nurses = [], isLoading: loadingNurses } = useNurses(false);
  const createBooking = useCreateBooking();

  // Pre-select service from query param
  useEffect(() => {
    const sid = searchParams.get("service");
    if (sid && services.length) {
      const svc = services.find(s => s.id === sid || s.title.toLowerCase().replace(/\s+/g, "-") === sid);
      if (svc) setSelectedService(svc);
    }
  }, [searchParams, services]);

  const handleNext = () => currentStep < 5 && setCurrentStep(s => s + 1);
  const handleBack = () => currentStep > 1 && setCurrentStep(s => s - 1);

  const handleConfirm = async () => {
    if (!selectedService || !selectedNurse || !selectedDate || !selectedTime) return;
    try {
      const booking = await createBooking.mutateAsync({
        nurse_id: selectedNurse.id,
        service_id: selectedService.id,
        patient_name: formData.fullName,
        patient_email: formData.email,
        patient_phone: formData.phone,
        patient_address: formData.address,
        appointment_date: selectedDate,
        time_slot: selectedTime,
        notes: formData.notes || null,
        status: "pending",
      });
      setBookingRef(booking.booking_ref);
      setCurrentStep(5);
    } catch (err) {
      console.error("Booking failed:", err);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return !!selectedService;
      case 2: return !!selectedNurse;
      case 3: return !!selectedDate && !!selectedTime;
      case 4: return !!(formData.fullName && formData.phone && formData.email && formData.address);
      default: return true;
    }
  };

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push(d);
    }
    return dates;
  };

  return (
    <Layout>
      <section className="section-padding bg-background min-h-screen">
        <div className="container-custom">
          {/* Progress Steps */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={cn("w-12 h-12 rounded-full flex items-center justify-center transition-all",
                      currentStep >= step.id ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
                    )}>
                      {currentStep > step.id ? <Check className="w-6 h-6" /> : <step.icon className="w-5 h-5" />}
                    </div>
                    <span className={cn("text-xs mt-2 hidden sm:block",
                      currentStep >= step.id ? "text-foreground font-medium" : "text-muted-foreground"
                    )}>{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={cn("h-0.5 w-12 sm:w-20 mx-2", currentStep > step.id ? "bg-secondary" : "bg-muted")} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="max-w-4xl mx-auto">

            {/* Step 1: Select Service */}
            {currentStep === 1 && (
              <div className="animate-fade-up">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">Select a Service</h2>
                <p className="text-muted-foreground text-center mb-8">Choose the type of care you need</p>
                {loadingServices ? (
                  <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-secondary" /></div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {services.map(service => (
                      <button key={service.id} onClick={() => setSelectedService(service)}
                        className={cn("card-medical text-left p-5 cursor-pointer border-2 transition-all",
                          selectedService?.id === service.id ? "border-secondary bg-accent" : "border-transparent hover:border-border"
                        )}>
                        <div className="flex items-start gap-4">
                          <div className="flex-1">
                            <h3 className="font-heading font-semibold text-foreground mb-1">{service.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                          </div>
                          <div className={cn("w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center transition-all",
                            selectedService?.id === service.id ? "border-secondary bg-secondary" : "border-muted"
                          )}>
                            {selectedService?.id === service.id && <Check className="w-4 h-4 text-secondary-foreground" />}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Select Nurse */}
            {currentStep === 2 && (
              <div className="animate-fade-up">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">Choose Your Nurse</h2>
                <p className="text-muted-foreground text-center mb-8">Select from our qualified professionals</p>
                {loadingNurses ? (
                  <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-secondary" /></div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {nurses.map(nurse => (
                      <button key={nurse.id} onClick={() => setSelectedNurse(nurse)}
                        className={cn("card-medical text-left p-5 cursor-pointer border-2 transition-all",
                          selectedNurse?.id === nurse.id ? "border-secondary bg-accent" : "border-transparent hover:border-border"
                        )}>
                        <div className="flex flex-col items-center text-center">
                          {nurse.photo_url
                            ? <img src={nurse.photo_url} alt={nurse.name} className="w-20 h-20 rounded-full object-cover mb-4" />
                            : <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mb-4 text-secondary font-bold text-2xl">{nurse.name[0]}</div>}
                          <h3 className="font-heading font-semibold text-foreground mb-1">{nurse.name}</h3>
                          <p className="text-xs text-muted-foreground mb-2">{nurse.qualifications}</p>
                          <div className="flex items-center gap-1 mb-2">
                            <Star className="w-4 h-4 fill-secondary text-secondary" />
                            <span className="font-medium text-foreground">{nurse.rating}</span>
                            <span className="text-muted-foreground text-sm">({nurse.reviews} reviews)</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{nurse.experience} years experience</p>
                          <div className="flex flex-wrap gap-1 justify-center">
                            {nurse.specialty.map((spec, i) => (
                              <span key={i} className="px-2 py-0.5 bg-accent text-secondary text-xs rounded-full">{spec}</span>
                            ))}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Pick Date & Time */}
            {currentStep === 3 && (
              <div className="animate-fade-up">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">Pick Date & Time</h2>
                <p className="text-muted-foreground text-center mb-8">Select when you'd like the appointment</p>
                <div className="space-y-8">
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-secondary" /> Select Date
                    </h3>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {generateDates().map(date => {
                        const dateStr = date.toISOString().split("T")[0];
                        return (
                          <button key={dateStr} onClick={() => setSelectedDate(dateStr)}
                            className={cn("flex flex-col items-center px-4 py-3 rounded-xl border-2 min-w-[80px] transition-all",
                              selectedDate === dateStr ? "border-secondary bg-accent" : "border-border hover:border-secondary/50"
                            )}>
                            <span className="text-xs text-muted-foreground">{date.toLocaleDateString("en-US", { weekday: "short" })}</span>
                            <span className="text-xl font-bold text-foreground">{date.getDate()}</span>
                            <span className="text-xs text-muted-foreground">{date.toLocaleDateString("en-US", { month: "short" })}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-secondary" /> Select Time Slot
                    </h3>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {timeSlots.map(slot => (
                        <button key={slot.id} onClick={() => setSelectedTime(slot.id)}
                          className={cn("p-4 rounded-xl border-2 text-center transition-all",
                            selectedTime === slot.id ? "border-secondary bg-accent" : "border-border hover:border-secondary/50"
                          )}>
                          <span className="block font-heading font-semibold text-foreground">{slot.label}</span>
                          <span className="text-sm text-muted-foreground">{slot.time}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Client Details */}
            {currentStep === 4 && (
              <div className="animate-fade-up">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">Your Details</h2>
                <p className="text-muted-foreground text-center mb-8">Please provide your contact information</p>
                <div className="max-w-xl mx-auto space-y-6">
                  {[
                    { label: "Full Name *", key: "fullName", type: "text", ph: "Enter your full name" },
                    { label: "Phone Number *", key: "phone", type: "tel", ph: "Enter your phone number" },
                    { label: "Email Address *", key: "email", type: "email", ph: "Enter your email" },
                    { label: "Location/Address *", key: "address", type: "text", ph: "Enter your full address" },
                  ].map(({ label, key, type, ph }) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-foreground mb-2">{label}</label>
                      <Input type={type} value={formData[key as keyof typeof formData]}
                        onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                        placeholder={ph} className="h-12" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Additional Notes</label>
                    <Textarea value={formData.notes}
                      onChange={e => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Any special requirements…" rows={4} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Confirmation */}
            {currentStep === 5 && bookingRef && (
              <div className="animate-fade-up text-center">
                <div className="w-20 h-20 rounded-full bg-secondary mx-auto mb-6 flex items-center justify-center">
                  <Check className="w-10 h-10 text-secondary-foreground" />
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h2>
                <p className="text-muted-foreground mb-8">Thank you for choosing Adelaide Medical Services</p>
                <div className="card-medical max-w-lg mx-auto text-left">
                  <div className="bg-accent rounded-xl p-4 mb-6 text-center">
                    <span className="text-sm text-muted-foreground">Booking ID</span>
                    <p className="font-heading text-2xl font-bold text-secondary">{bookingRef}</p>
                  </div>
                  <div className="space-y-4">
                    {[
                      ["Service", selectedService?.title],
                      ["Nurse", selectedNurse?.name],
                      ["Date", new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })],
                      ["Time", timeSlots.find(t => t.id === selectedTime)?.time],
                      ["Patient", formData.fullName],
                      ["Address", formData.address],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between py-3 border-b border-border last:border-0">
                        <span className="text-muted-foreground">{label}</span>
                        <span className="font-medium text-foreground text-right max-w-[200px]">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-6">A confirmation email will be sent to {formData.email}</p>
              </div>
            )}

            {/* Navigation */}
            {currentStep < 5 && (
              <div className="flex justify-between mt-12">
                {currentStep > 1
                  ? <Button variant="outline" onClick={handleBack}><ArrowLeft className="w-4 h-4" /> Back</Button>
                  : <div />}
                {currentStep === 4 ? (
                  <Button variant="secondary" onClick={handleConfirm}
                    disabled={!isStepValid() || createBooking.isPending}>
                    {createBooking.isPending
                      ? <><Loader2 className="w-4 h-4 animate-spin" /> Booking…</>
                      : <>Confirm Booking <Check className="w-4 h-4" /></>}
                  </Button>
                ) : (
                  <Button variant="secondary" onClick={handleNext} disabled={!isStepValid()}>
                    Continue <ArrowRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
