
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
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

const ticketFormSchema = z.object({
  title: z.string().min(3, {
    message: 'El título debe tener al menos 3 caracteres',
  }),
  description: z.string().min(10, {
    message: 'La descripción debe tener al menos 10 caracteres',
  }),
  client_id: z.string().uuid({
    message: 'Debe seleccionar un cliente',
  }),
  priority: z.enum(['low', 'medium', 'high', 'critical'], {
    required_error: 'Debe seleccionar una prioridad',
  }),
});

export function CreateTicketDialog({ open, onOpenChange }) {
  const [clients, setClients] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastTicketNumber, setLastTicketNumber] = useState('');

  const form = useForm({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      title: '',
      description: '',
      client_id: '',
      priority: 'medium',
    },
  });

  useEffect(() => {
    async function fetchClients() {
      const { data, error } = await supabase
        .from('clients')
        .select('id, name')
        .order('name');

      if (error) {
        console.error('Error fetching clients:', error);
        toast({
          title: 'Error',
          description: 'No se pudieron cargar los clientes',
          variant: 'destructive',
        });
      } else {
        setClients(data || []);
      }
    }

    async function fetchLastTicketNumber() {
      const { data, error } = await supabase
        .from('tickets')
        .select('ticket_number')
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error fetching last ticket number:', error);
      } else if (data && data.length > 0) {
        setLastTicketNumber(data[0].ticket_number);
      } else {
        // Default first ticket number if none exists
        setLastTicketNumber('T-00000');
      }
    }

    if (open) {
      fetchClients();
      fetchLastTicketNumber();
      form.reset();
    }
  }, [open, form]);

  function generateNextTicketNumber(lastNumber) {
    // Extract the numeric part and increment
    const numericPart = parseInt(lastNumber.replace('T-', ''), 10);
    const nextNumber = numericPart + 1;
    // Pad with leading zeros to maintain format
    return `T-${String(nextNumber).padStart(5, '0')}`;
  }

  async function onSubmit(data) {
    setIsSubmitting(true);
    try {
      const nextTicketNumber = generateNextTicketNumber(lastTicketNumber);
      
      const { error } = await supabase.from('tickets').insert({
        title: data.title,
        description: data.description,
        client_id: data.client_id,
        priority: data.priority,
        status: 'open',
        ticket_number: nextTicketNumber
      });

      if (error) throw error;

      toast({
        title: 'Ticket creado',
        description: 'El ticket ha sido creado exitosamente',
      });

      onOpenChange(false);
    } catch (error) {
      console.error('Error creating ticket:', error);
      toast({
        title: 'Error',
        description: 'No se pudo crear el ticket',
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
          <DialogTitle>Crear nuevo ticket</DialogTitle>
          <DialogDescription>
            Ingrese los detalles del ticket de soporte
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="client_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cliente</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar cliente" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Problema de conexión" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describa el problema en detalle" 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prioridad</FormLabel>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creando...' : 'Crear ticket'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
