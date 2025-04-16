
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { AuthWrapper } from "./components/layout/AuthWrapper";

// Pages
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import ClientDetail from "./pages/ClientDetail";
import Network from "./pages/Network";
import Tickets from "./pages/Tickets";
import Billing from "./pages/Billing";
import Technicians from "./pages/Technicians";
import Inventory from "./pages/Inventory";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthWrapper>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/" 
              element={
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              } 
            />
            <Route
              path="/clients"
              element={
                <MainLayout>
                  <Clients />
                </MainLayout>
              }
            />
            <Route
              path="/clients/:id"
              element={
                <MainLayout>
                  <ClientDetail />
                </MainLayout>
              }
            />
            <Route
              path="/network"
              element={
                <MainLayout>
                  <Network />
                </MainLayout>
              }
            />
            <Route
              path="/tickets"
              element={
                <MainLayout>
                  <Tickets />
                </MainLayout>
              }
            />
            <Route
              path="/billing"
              element={
                <MainLayout>
                  <Billing />
                </MainLayout>
              }
            />
            <Route
              path="/technicians"
              element={
                <MainLayout>
                  <Technicians />
                </MainLayout>
              }
            />
            <Route
              path="/inventory"
              element={
                <MainLayout>
                  <Inventory />
                </MainLayout>
              }
            />
            <Route
              path="/reports"
              element={
                <MainLayout>
                  <Reports />
                </MainLayout>
              }
            />
            <Route
              path="/settings"
              element={
                <MainLayout>
                  <Settings />
                </MainLayout>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthWrapper>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
