
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { AlertCircle, RefreshCw, Download } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const mikrotikFormSchema = z.object({
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
  }),
  backupFrequency: z.string({
    required_error: "Por favor seleccione una frecuencia de respaldo.",
  }),
});

type MikrotikFormValues = z.infer<typeof mikrotikFormSchema>;

const twilioFormSchema = z.object({
  accountSid: z.string().min(1, {
    message: "Por favor ingrese el Account SID.",
  }),
  authToken: z.string().min(1, {
    message: "Por favor ingrese el Auth Token.",
  }),
  whatsappNumber: z.string().min(1, {
    message: "Por favor ingrese el número de WhatsApp.",
  }),
  messageTemplate: z.string().min(1, {
    message: "Por favor ingrese una plantilla de mensaje.",
  }),
});

type TwilioFormValues = z.infer<typeof twilioFormSchema>;

const defaultMikrotikValues: Partial<MikrotikFormValues> = {
  routerIp: "192.168.1.1",
  port: "8728",
  username: "admin",
  password: "",
  backupFrequency: "daily",
};

const defaultTwilioValues: Partial<TwilioFormValues> = {
  accountSid: "",
  authToken: "",
  whatsappNumber: "+1234567890",
  messageTemplate: "Hola {nombre}, su factura por ${monto} vence el {fecha}.",
};

export function SystemSettings() {
  const [isSavingMikrotik, setIsSavingMikrotik] = useState(false);
  const [isSavingTwilio, setIsSavingTwilio] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [lastBackup, setLastBackup] = useState<string | null>("2023-09-15 14:30:45");

  const mikrotikForm = useForm<MikrotikFormValues>({
    resolver: zodResolver(mikrotikFormSchema),
    defaultValues: defaultMikrotikValues,
  });

  const twilioForm = useForm<TwilioFormValues>({
    resolver: zodResolver(twilioFormSchema),
    defaultValues: defaultTwilioValues,
  });

  function onSubmitMikrotik(data: MikrotikFormValues) {
    setIsSavingMikrotik(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(data);
      setIsSavingMikrotik(false);
      toast({
        title: "Configuración guardada",
        description: "La configuración de Mikrotik ha sido guardada correctamente.",
      });
    }, 1000);
  }

  function onSubmitTwilio(data: TwilioFormValues) {
    setIsSavingTwilio(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(data);
      setIsSavingTwilio(false);
      toast({
        title: "Configuración guardada",
        description: "La configuración de Twilio ha sido guardada correctamente.",
      });
    }, 1000);
  }

  function handleBackupNow() {
    setIsBackingUp(true);
    
    // Simulate backup
    setTimeout(() => {
      const now = new Date();
      const formattedDate = now.toISOString().replace('T', ' ').substring(0, 19);
      setLastBackup(formattedDate);
      setIsBackingUp(false);
      toast({
        title: "Respaldo completado",
        description: "Se ha realizado un respaldo manual exitosamente.",
      });
    }, 2000);
  }

  function handleDownloadBackup() {
    toast({
      title: "Descarga iniciada",
      description: "El archivo de respaldo se está descargando.",
    });
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configuración de Mikrotik</CardTitle>
          <CardDescription>
            Ajustes para la conexión con RouterOS
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...mikrotikForm}>
            <form onSubmit={mikrotikForm.handleSubmit(onSubmitMikrotik)} className="space-y-8">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Conexión API</h3>
                <p className="text-sm text-muted-foreground">
                  Datos de conexión al router Mikrotik
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={mikrotikForm.control}
                  name="routerIp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dirección IP</FormLabel>
                      <FormControl>
                        <Input placeholder="192.168.1.1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={mikrotikForm.control}
                  name="port"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Puerto API</FormLabel>
                      <FormControl>
                        <Input placeholder="8728" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={mikrotikForm.control}
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
                  control={mikrotikForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Respaldos Automáticos</h3>
                <p className="text-sm text-muted-foreground">
                  Configuración de respaldos de la configuración de Mikrotik
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={mikrotikForm.control}
                  name="backupFrequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frecuencia de Respaldo</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar frecuencia" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="hourly">Cada hora</SelectItem>
                          <SelectItem value="daily">Diario</SelectItem>
                          <SelectItem value="weekly">Semanal</SelectItem>
                          <SelectItem value="monthly">Mensual</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium">Acciones de Respaldo</label>
                  <div className="flex space-x-2">
                    <Button type="button" variant="outline" onClick={handleBackupNow} disabled={isBackingUp}>
                      {isBackingUp ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Respaldando...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Respaldar ahora
                        </>
                      )}
                    </Button>
                    <Button type="button" variant="outline" onClick={handleDownloadBackup}>
                      <Download className="mr-2 h-4 w-4" />
                      Descargar último
                    </Button>
                  </div>
                  {lastBackup && (
                    <p className="text-xs text-muted-foreground">
                      Último respaldo: {lastBackup}
                    </p>
                  )}
                </div>
              </div>
              
              <Alert variant="warning">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Advertencia</AlertTitle>
                <AlertDescription>
                  Asegúrese de que la conexión sea segura y que las credenciales sean correctas para evitar problemas de seguridad.
                </AlertDescription>
              </Alert>
              
              <CardFooter className="px-0 pt-4">
                <Button type="submit" disabled={isSavingMikrotik}>
                  {isSavingMikrotik ? "Guardando..." : "Guardar configuración"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Configuración de Twilio (WhatsApp)</CardTitle>
          <CardDescription>
            Configuración para envío de mensajes a través de WhatsApp Business API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...twilioForm}>
            <form onSubmit={twilioForm.handleSubmit(onSubmitTwilio)} className="space-y-8">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Credenciales de API</h3>
                <p className="text-sm text-muted-foreground">
                  Ingrese sus credenciales de la API de Twilio
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={twilioForm.control}
                  name="accountSid"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account SID</FormLabel>
                      <FormControl>
                        <Input placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={twilioForm.control}
                  name="authToken"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Auth Token</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••••••••••••••••••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={twilioForm.control}
                  name="whatsappNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de WhatsApp</FormLabel>
                      <FormControl>
                        <Input placeholder="+1234567890" {...field} />
                      </FormControl>
                      <FormDescription>
                        Incluya el código de país, ej: +57, +52
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Plantillas de Mensajes</h3>
                <p className="text-sm text-muted-foreground">
                  Configure las plantillas para mensajes automáticos
                </p>
              </div>
              
              <FormField
                control={twilioForm.control}
                name="messageTemplate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plantilla para Facturación</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Hola {nombre}, su factura por ${monto} vence el {fecha}." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Use variables como {'{nombre}'}, {'{monto}'}, {'{fecha}'} para personalizar el mensaje.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Nota</AlertTitle>
                <AlertDescription>
                  Las plantillas deben ser aprobadas por WhatsApp antes de poder utilizarlas.
                </AlertDescription>
              </Alert>
              
              <CardFooter className="px-0 pt-4">
                <Button type="submit" disabled={isSavingTwilio}>
                  {isSavingTwilio ? "Guardando..." : "Guardar configuración"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
