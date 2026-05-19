import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";

// Public pages
import Index from "./pages/Index";
import Services from "./pages/Services";
import BookNurse from "./pages/BookNurse";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import NursesManager from "./pages/admin/NursesManager";
import ServicesManager from "./pages/admin/ServicesManager";
import BookingsManager from "./pages/admin/BookingsManager";
import SettingsPage from "./pages/admin/Settings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60, retry: 1 },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>

      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* ── Public ── */}
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/book" element={<BookNurse />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* ── Admin ── */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="nurses" element={<NursesManager />} />
              <Route path="services" element={<ServicesManager />} />
              <Route path="bookings" element={<BookingsManager />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>

  </QueryClientProvider>
);

export default App;
