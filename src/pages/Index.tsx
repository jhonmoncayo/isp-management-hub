
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMikrotikStore } from "@/store/mikrotikStore";

const Index = () => {
  const { isConnected } = useMikrotikStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Si no está conectado, redirigir a la página de login
    if (!isConnected) {
      navigate("/login");
    } else {
      // Si está conectado, redirigir al dashboard
      navigate("/dashboard");
    }
  }, [isConnected, navigate]);

  return null;
};

export default Index;
