
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

const clientFormSchema = z.object({
  name: z.string().min(3, {
    message: 'El nombre debe tener al menos 3 caracteres',
  }),
  document_type: z.string({
    required_error: 'Debe seleccionar un tipo de documento',
  }),
  document_number: z.string().min(5, {
    message: 'El número de documento debe tener al menos 5 caracteres',
  }),
  address: z.string().min(5, {
    message: 'La dirección debe tener al menos 5 caracteres',
  }),
  phone: z.string().min(7, {
    message: 'El teléfono debe tener al menos 7 caracteres',
  }),
  email: z.string().email({
    message: 'Debe ingresar un correo electrónico válido',
  }).optional().or(z.literal('')),
  ip_address: z.string().optional().or(z.literal('')),
  mac_address: z.string().optional().or(z.literal('')),
  plan_id: z.string().uuid({
    message: 'Debe seleccionar un plan',
  }).optional().or(z.literal('')),
});

export function CreateClientDialog({ open, onOpenChange }) {
  const [plans, setPlans] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      name: '',
      document_type: 'DNI',
      document_number: '',
      address: '',
      phone: '',
      email: '',
      ip_address: '',
      mac_address: '',
      plan_id: '',
    },
  });

  useEffect(() => {
    async function fetchPlans() {
      const { data, error } = await supabase
        .from('plans')
        .select('id, name')
        .order('name');

      if (error) {
        console.error('Error fetching plans:', error);
        toast({
          title: 'Error',
          description: 'No se pudieron cargar los planes',
          variant: 'destructive',
        });
      } else {
        setPlans(data || []);
      }
    }

    if (open) {
      fetchPlans();
      form.reset();
    }
  }, [open, form]);

  async function onSubmit(data) {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('clients').insert({
        name: data.name,
        document_type: data.document_type,
        document_number: data.document_number,
        address: data.address,
        phone: data.phone,
        email: data.email || null,
        ip_address: data.ip_address || null,
        mac_address: data.mac_address || null,
        plan_id: data.plan_id || null,
        status: 'active',
      });

      if (error) throw error;

      toast({
        title: 'Cliente creado',
        description: 'El cliente ha sido creado exitosamente',
      });

      onOpenChange(false);
    } catch (error) {
      console.error('Error creating client:', error);
      toast({
        title: 'Error',
        description: 'No se pudo crear el cliente',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Crear nuevo cliente</DialogTitle>
          <DialogDescription>
            Ingrese los datos del nuevo cliente
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Juan Pérez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="document_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de documento</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="DNI">DNI</SelectItem>
                        <SelectItem value="RUC">RUC</SelectItem>
                        <SelectItem value="CE">Carné de Extranjería</SelectItem>
                        <SelectItem value="Pasaporte">Pasaporte</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="document_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de documento</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. 12345678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Av. Principal 123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. 999888777" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email (opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. correo@ejemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="ip_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección IP (opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. 192.168.1.100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mac_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección MAC (opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. 00:1A:2B:3C:4D:5E" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="plan_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan (opcional)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar plan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {plans.map((plan) => (
                        <SelectItem key={plan.id} value={plan.id}>
                          {plan.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Guardando...' : 'Guardar cliente'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
