
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";

const generalFormSchema = z.object({
  companyName: z.string().min(2, {
    message: "El nombre de la empresa debe tener al menos 2 caracteres.",
  }),
  contactEmail: z.string().email({
    message: "Por favor ingrese un correo electrónico válido.",
  }),
  contactPhone: z.string().min(7, {
    message: "Por favor ingrese un número telefónico válido.",
  }),
  address: z.string().min(5, {
    message: "Por favor ingrese una dirección válida.",
  }),
  language: z.string({
    required_error: "Por favor seleccione un idioma.",
  }),
  timezone: z.string({
    required_error: "Por favor seleccione una zona horaria.",
  }),
  darkMode: z.boolean().default(false),
  emailNotifications: z.boolean().default(true),
});

type GeneralFormValues = z.infer<typeof generalFormSchema>;

const defaultValues: Partial<GeneralFormValues> = {
  companyName: "ISP Manager",
  contactEmail: "contacto@ispmanager.com",
  contactPhone: "123-456-7890",
  address: "Calle Principal #123, Ciudad",
  language: "es-CO",
  timezone: "America/Bogota",
  darkMode: false,
  emailNotifications: true,
};

export function GeneralSettings() {
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<z.infer<typeof generalFormSchema>>({
    resolver: zodResolver(generalFormSchema),
    defaultValues,
  });

  function onSubmit(data: z.infer<typeof generalFormSchema>) {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(data);
      setIsSaving(false);
      toast({
        title: "Configuración guardada",
        description: "Los cambios han sido aplicados correctamente.",
      });
    }, 1000);
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configuración General</CardTitle>
          <CardDescription>
            Configure los datos principales de su empresa y preferencias del sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Información de la Empresa</h3>
                <p className="text-sm text-muted-foreground">
                  Esta información será utilizada en facturas y comunicaciones
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de la Empresa</FormLabel>
                      <FormControl>
                        <Input placeholder="Su empresa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo Electrónico</FormLabel>
                      <FormControl>
                        <Input placeholder="email@ejemplo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono de Contacto</FormLabel>
                      <FormControl>
                        <Input placeholder="123-456-7890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dirección</FormLabel>
                      <FormControl>
                        <Input placeholder="Calle Principal #123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Preferencias Regionales</h3>
                <p className="text-sm text-muted-foreground">
                  Ajuste la configuración regional del sistema
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Idioma</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar idioma" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="es-CO">Español (Colombia)</SelectItem>
                          <SelectItem value="es-MX">Español (México)</SelectItem>
                          <SelectItem value="es-ES">Español (España)</SelectItem>
                          <SelectItem value="en-US">Inglés (Estados Unidos)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="timezone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zona Horaria</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar zona horaria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="America/Bogota">Bogotá (GMT-5)</SelectItem>
                          <SelectItem value="America/Mexico_City">Ciudad de México (GMT-6)</SelectItem>
                          <SelectItem value="America/Santiago">Santiago (GMT-4)</SelectItem>
                          <SelectItem value="America/Buenos_Aires">Buenos Aires (GMT-3)</SelectItem>
                          <SelectItem value="Europe/Madrid">Madrid (GMT+1)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Preferencias de Interfaz</h3>
                <p className="text-sm text-muted-foreground">
                  Personalice la apariencia y comportamiento de la aplicación
                </p>
              </div>
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="darkMode"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Modo Oscuro</FormLabel>
                        <FormDescription>
                          Activar el tema oscuro para la interfaz
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emailNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Notificaciones por Correo</FormLabel>
                        <FormDescription>
                          Recibir notificaciones del sistema por correo electrónico
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <CardFooter className="px-0 pt-4">
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? "Guardando..." : "Guardar cambios"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
