
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useMikrotikStore } from "@/store/mikrotikStore";
import { Network, Router, Lock } from "lucide-react";

const loginFormSchema = z.object({
  routerIp: z.string().min(7, {
    message: "Por favor ingrese una dirección IP válida.",
  }),
  port: z.string().min(1, {
    message: "Por favor ingrese un puerto válido.",
  }),
  username: z.string().min(1, {
    message: "Por favor ingrese un nombre de usuario.",
  }),
  password: z.string().min(1, {
    message: "Por favor ingrese una contraseña.",
  })
});

export default function Login() {
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setConnectionStatus, setCredentials } = useMikrotikStore();
  
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      routerIp: "192.168.1.1",
      port: "8728",
      username: "acme",
      password: ""
    },
  });

  async function onSubmit(data: z.infer<typeof loginFormSchema>) {
    setIsConnecting(true);
    
    try {
      // Simulación de conexión a Mikrotik - en producción reemplazar con API real
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Guardar credenciales en el store
      setCredentials({
        routerIp: data.routerIp,
        port: data.port,
        username: data.username,
        password: data.password
      });
      
      // Actualizar estado de conexión
      setConnectionStatus(true);
      
      toast({
        title: "Conexión exitosa",
        description: "Se ha establecido conexión con el RouterBoard Mikrotik.",
      });
      
      // Redirigir al dashboard
      navigate("/");
      
    } catch (error) {
      console.error("Error al conectar:", error);
      toast({
        title: "Error de conexión",
        description: "No se pudo establecer conexión con el RouterBoard Mikrotik.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Router className="h-10 w-10 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Acceso RouterOS</CardTitle>
          <CardDescription>
            Ingrese sus credenciales para conectarse al RouterBoard Mikrotik
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="routerIp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dirección IP</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Network className="h-4 w-4 text-muted-foreground" />
                          <Input placeholder="192.168.1.1" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="port"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Puerto</FormLabel>
                      <FormControl>
                        <Input placeholder="8728" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuario</FormLabel>
                    <FormControl>
                      <Input placeholder="admin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                        <Input type="password" placeholder="••••••••" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            
              <CardFooter className="flex justify-end px-0 pt-4">
                <Button type="submit" className="w-full" disabled={isConnecting}>
                  {isConnecting ? "Conectando..." : "Conectar"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
