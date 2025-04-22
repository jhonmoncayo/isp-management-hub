
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface Client {
  id: string;
  name: string;
  document_number: string;
  document_type: string;
  status: "active" | "inactive" | "suspended";
  ip_address: string | null;
  plan_id: string | null;
  registration_date: string;
  address: string;
  phone: string;
  email: string | null;
  mac_address: string | null;
  created_at: string;
  updated_at: string;
  plan?: {
    name: string;
    download_speed: number;
    upload_speed: number;
  };
}

export function ClientsTable() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('clients')
        .select(`
          *,
          plan:plans(name, download_speed, upload_speed)
        `)
        .order('name');
      
      if (error) {
        throw error;
      }

      const typedClients = data?.map(client => ({
        ...client,
        status: client.status as "active" | "inactive" | "suspended"
      })) || [];

      setClients(typedClients);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los clientes',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  const filteredClients = clients.filter(
    (client) =>
      client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.document_number?.includes(searchTerm) ||
      client.ip_address?.includes(searchTerm)
  );

  const handleViewClient = (clientId: string) => {
    navigate(`/clients/${clientId}`);
  };

  const handleEditClient = async (clientId: string) => {
    // For now, just navigate to the client detail page
    navigate(`/clients/${clientId}`);
  };

  const handleCreateInvoice = async (clientId: string) => {
    // Navigate to billing with client preselected
    navigate(`/billing?client=${clientId}`);
  };

  const handleCreateTicket = async (clientId: string) => {
    // Navigate to tickets with client preselected
    navigate(`/tickets?client=${clientId}`);
  };

  const handleUpdateStatus = async (clientId: string, newStatus: "active" | "inactive" | "suspended") => {
    try {
      const { error } = await supabase
        .from('clients')
        .update({ status: newStatus })
        .eq('id', clientId);

      if (error) throw error;

      // Update local state
      setClients(clients.map(client => 
        client.id === clientId 
          ? { ...client, status: newStatus }
          : client
      ));

      toast({
        title: 'Estado actualizado',
        description: `El estado del cliente ha sido actualizado a ${newStatus}`,
      });
    } catch (error) {
      console.error('Error updating client status:', error);
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el estado del cliente',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <Input
          placeholder="Buscar por nombre, documento o IP..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>IP</TableHead>
              <TableHead>Registro</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Cargando clientes...
                </TableCell>
              </TableRow>
            ) : filteredClients.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  No se encontraron clientes
                </TableCell>
              </TableRow>
            ) : (
              filteredClients.map((client) => (
                <TableRow key={client.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {client.document_type}: {client.document_number}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {client.plan ? (
                      <div className="text-sm">
                        <p className="font-medium">{client.plan.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {client.plan.download_speed}↓ / {client.plan.upload_speed}↑ Mbps
                        </p>
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">Sin plan</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={client.status} />
                  </TableCell>
                  <TableCell>
                    <code className="text-sm">{client.ip_address || "No asignada"}</code>
                  </TableCell>
                  <TableCell>{formatDate(client.registration_date)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <span className="sr-only">Abrir menu</span>
                          <ThreeDotsIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewClient(client.id)}>
                          Ver detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditClient(client.id)}>
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCreateInvoice(client.id)}>
                          Generar factura
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCreateTicket(client.id)}>
                          Crear ticket
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {client.status === 'active' ? (
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleUpdateStatus(client.id, 'suspended')}
                          >
                            Suspender servicio
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem 
                            className="text-green-600"
                            onClick={() => handleUpdateStatus(client.id, 'active')}
                          >
                            Activar servicio
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function StatusBadge({ status }: { status: "active" | "inactive" | "suspended" }) {
  return (
    <Badge
      variant="outline"
      className={cn({
        "bg-green-100 text-green-800 hover:bg-green-100": status === "active",
        "bg-red-100 text-red-800 hover:bg-red-100": status === "inactive",
        "bg-orange-100 text-orange-800 hover:bg-orange-100":
          status === "suspended",
      })}
    >
      {status === "active" && "Activo"}
      {status === "inactive" && "Inactivo"}
      {status === "suspended" && "Suspendido"}
    </Badge>
  );
}

function ThreeDotsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}
