
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const notificationSchema = z.object({
  // Invoice notifications
  invoiceEnabled: z.boolean().default(true),
  invoiceDaysBeforeDue: z.coerce.number().min(0).max(30),
  invoiceTemplate: z.string(),
  
  // Service notifications
  serviceEnabled: z.boolean().default(true),
  serviceDaysBeforeMaintenance: z.coerce.number().min(0).max(30),
  serviceTemplate: z.string(),
  
  // Technical notifications
  technicalEnabled: z.boolean().default(true),
  technicalTicketPriority: z.string(),
  technicalTemplate: z.string(),
  
  // General settings
  sendEmail: z.boolean().default(true),
  sendWhatsapp: z.boolean().default(true),
  sendSMS: z.boolean().default(false),
});

type NotificationValues = z.infer<typeof notificationSchema>;

const defaultValues: Partial<NotificationValues> = {
  invoiceEnabled: true,
  invoiceDaysBeforeDue: 3,
  invoiceTemplate: "Estimado {nombre}, le recordamos que su factura por ${monto} vence el {fecha}. Por favor realice el pago oportuno.",
  
  serviceEnabled: true,
  serviceDaysBeforeMaintenance: 2,
  serviceTemplate: "Estimado {nombre}, le informamos que realizaremos un mantenimiento programado el {fecha} durante {duracion} horas. Disculpe las molestias.",
  
  technicalEnabled: true,
  technicalTicketPriority: "high",
  technicalTemplate: "Nuevo ticket asignado: {numero_ticket} - {asunto}. Cliente: {cliente}, Prioridad: {prioridad}. Por favor atienda lo antes posible.",
  
  sendEmail: true,
  sendWhatsapp: true,
  sendSMS: false,
};

export function NotificationSettings() {
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<NotificationValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues,
  });

  const watchInvoiceEnabled = form.watch("invoiceEnabled");
  const watchServiceEnabled = form.watch("serviceEnabled");
  const watchTechnicalEnabled = form.watch("technicalEnabled");

  function onSubmit(data: NotificationValues) {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(data);
      setIsSaving(false);
      toast({
        title: "Configuración guardada",
        description: "La configuración de notificaciones ha sido guardada correctamente.",
      });
    }, 1000);
  }

  function testNotification(type: string) {
    toast({
      title: "Notificación de prueba enviada",
      description: `Se ha enviado una notificación de prueba de tipo '${type}'.`,
    });
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configuración de Notificaciones</CardTitle>
          <CardDescription>
            Personalice cómo y cuándo se envían notificaciones automáticas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Notificaciones de Facturación</h3>
                <p className="text-sm text-muted-foreground">
                  Recordatorios de pago y vencimiento de facturas
                </p>
              </div>
              
              <FormField
                control={form.control}
                name="invoiceEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Activar notificaciones de facturación</FormLabel>
                      <FormDescription>
                        Enviar recordatorios de vencimiento de facturas a los clientes
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
              
              {watchInvoiceEnabled && (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="invoiceDaysBeforeDue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Días antes del vencimiento</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" max="30" {...field} />
                          </FormControl>
                          <FormDescription>
                            Número de días antes del vencimiento para enviar recordatorio
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex items-end">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => testNotification('facturación')}
                        className="mb-1.5"
                      >
                        Enviar prueba
                      </Button>
                    </div>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="invoiceTemplate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plantilla de mensaje</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Mensaje de recordatorio de facturación" 
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Variables disponibles: {'{nombre}'}, {'{monto}'}, {'{fecha}'}, {'{numero_factura}'}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Notificaciones de Servicio</h3>
                <p className="text-sm text-muted-foreground">
                  Notificaciones sobre mantenimientos y cambios en el servicio
                </p>
              </div>
              
              <FormField
                control={form.control}
                name="serviceEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Activar notificaciones de servicio</FormLabel>
                      <FormDescription>
                        Informar a clientes sobre mantenimientos programados
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
              
              {watchServiceEnabled && (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="serviceDaysBeforeMaintenance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Días antes del mantenimiento</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" max="30" {...field} />
                          </FormControl>
                          <FormDescription>
                            Días de anticipación para notificar un mantenimiento
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex items-end">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => testNotification('servicio')}
                        className="mb-1.5"
                      >
                        Enviar prueba
                      </Button>
                    </div>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="serviceTemplate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plantilla de mensaje</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Mensaje de notificación de mantenimiento" 
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Variables disponibles: {'{nombre}'}, {'{fecha}'}, {'{duracion}'}, {'{zona}'}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Notificaciones Técnicas</h3>
                <p className="text-sm text-muted-foreground">
                  Alertas para técnicos sobre tickets y asignaciones
                </p>
              </div>
              
              <FormField
                control={form.control}
                name="technicalEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Activar notificaciones técnicas</FormLabel>
                      <FormDescription>
                        Notificar a técnicos sobre nuevos tickets asignados
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
              
              {watchTechnicalEnabled && (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="technicalTicketPriority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prioridad mínima para notificar</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccionar prioridad" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="low">Baja</SelectItem>
                              <SelectItem value="medium">Media</SelectItem>
                              <SelectItem value="high">Alta</SelectItem>
                              <SelectItem value="critical">Crítica</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Notificar tickets con esta prioridad o mayor
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex items-end">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => testNotification('técnica')}
                        className="mb-1.5"
                      >
                        Enviar prueba
                      </Button>
                    </div>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="technicalTemplate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plantilla de mensaje</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Mensaje de notificación de ticket" 
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Variables disponibles: {'{numero_ticket}'}, {'{asunto}'}, {'{cliente}'}, {'{prioridad}'}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Métodos de Notificación</h3>
                <p className="text-sm text-muted-foreground">
                  Canales para enviar notificaciones
                </p>
              </div>
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="sendEmail"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Correo electrónico</FormLabel>
                        <FormDescription>
                          Enviar notificaciones por correo electrónico
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
                  name="sendWhatsapp"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">WhatsApp</FormLabel>
                        <FormDescription>
                          Enviar notificaciones por WhatsApp
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
                  name="sendSMS"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">SMS</FormLabel>
                        <FormDescription>
                          Enviar notificaciones por SMS
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
                  {isSaving ? "Guardando..." : "Guardar configuración"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
