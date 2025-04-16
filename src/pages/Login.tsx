
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useMikrotikStore } from "@/store/mikrotikStore";
import { Network, Router, Lock, Wifi } from "lucide-react";

const credentialsFormSchema = z.object({
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

const macFormSchema = z.object({
  routerIp: z.string().min(7, {
    message: "Por favor ingrese una dirección IP válida.",
  }),
  port: z.string().min(1, {
    message: "Por favor ingrese un puerto válido.",
  }),
  macAddress: z.string()
    .min(12, { message: "La dirección MAC debe tener al menos 12 caracteres." })
    .max(17, { message: "La dirección MAC no debe exceder 17 caracteres." })
    .regex(/^([0-9A-Fa-f]{2}[:-]?){5}([0-9A-Fa-f]{2})$/, { 
      message: "Por favor ingrese una dirección MAC válida (por ejemplo: 00:11:22:33:44:55)." 
    })
});

export default function Login() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [activeTab, setActiveTab] = useState<'credentials' | 'mac'>('credentials');
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setConnectionStatus, setCredentials, setAuthMethod } = useMikrotikStore();
  
  const credentialsForm = useForm<z.infer<typeof credentialsFormSchema>>({
    resolver: zodResolver(credentialsFormSchema),
    defaultValues: {
      routerIp: "192.168.1.1",
      port: "8728",
      username: "acme",
      password: ""
    },
  });

  const macForm = useForm<z.infer<typeof macFormSchema>>({
    resolver: zodResolver(macFormSchema),
    defaultValues: {
      routerIp: "192.168.1.1",
      port: "8728",
      macAddress: ""
    },
  });

  async function onCredentialsSubmit(data: z.infer<typeof credentialsFormSchema>) {
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
      
      // Actualizar estado de conexión y método de autenticación
      setConnectionStatus(true);
      setAuthMethod('credentials');
      
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

  async function onMacSubmit(data: z.infer<typeof macFormSchema>) {
    setIsConnecting(true);
    
    try {
      // Simulación de conexión a Mikrotik por MAC - en producción reemplazar con API real
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Guardar credenciales en el store
      setCredentials({
        routerIp: data.routerIp,
        port: data.port,
        macAddress: data.macAddress
      });
      
      // Actualizar estado de conexión y método de autenticación
      setConnectionStatus(true);
      setAuthMethod('mac');
      
      toast({
        title: "Conexión exitosa",
        description: "Se ha establecido conexión con el RouterBoard Mikrotik usando MAC.",
      });
      
      // Redirigir al dashboard
      navigate("/");
      
    } catch (error) {
      console.error("Error al conectar por MAC:", error);
      toast({
        title: "Error de conexión",
        description: "No se pudo establecer conexión con el RouterBoard Mikrotik usando MAC.",
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
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'credentials' | 'mac')} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="credentials">Credenciales</TabsTrigger>
              <TabsTrigger value="mac">Dirección MAC</TabsTrigger>
            </TabsList>
            
            <TabsContent value="credentials">
              <Form {...credentialsForm}>
                <form onSubmit={credentialsForm.handleSubmit(onCredentialsSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={credentialsForm.control}
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
                      control={credentialsForm.control}
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
                    control={credentialsForm.control}
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
                    control={credentialsForm.control}
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
                
                  <Button type="submit" className="w-full" disabled={isConnecting}>
                    {isConnecting ? "Conectando..." : "Conectar"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
            
            <TabsContent value="mac">
              <Form {...macForm}>
                <form onSubmit={macForm.handleSubmit(onMacSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={macForm.control}
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
                      control={macForm.control}
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
                    control={macForm.control}
                    name="macAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dirección MAC</FormLabel>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <Wifi className="h-4 w-4 text-muted-foreground" />
                            <Input placeholder="00:11:22:33:44:55" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                
                  <Button type="submit" className="w-full" disabled={isConnecting}>
                    {isConnecting ? "Conectando..." : "Conectar por MAC"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
