
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMikrotikStore } from "@/store/mikrotikStore";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isConnected } = useMikrotikStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Si no está conectado y no está en la página de login, redirigir al login
    if (!isConnected && location.pathname !== "/login") {
      navigate("/login");
    }
    // Si está conectado y está en la página de login, redirigir al dashboard
    else if (isConnected && location.pathname === "/login") {
      navigate("/");
    }
  }, [isConnected, navigate, location.pathname]);

  return <>{children}</>;
}
