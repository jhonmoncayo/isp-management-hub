
import { useState } from "react";
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

interface Client {
  id: string;
  name: string;
  document: string;
  plan: string;
  status: "active" | "inactive" | "suspended";
  ipAddress: string;
  lastPayment: string;
}

const mockClients: Client[] = [
  {
    id: "C-1001",
    name: "Juan Pérez",
    document: "1234567890",
    plan: "Plan Medio: 8M/2M",
    status: "active",
    ipAddress: "192.168.1.101",
    lastPayment: "2023-09-15",
  },
  {
    id: "C-1002",
    name: "María García",
    document: "2345678901",
    plan: "Plan Básico: 6M/2M",
    status: "active",
    ipAddress: "192.168.1.102",
    lastPayment: "2023-09-10",
  },
  {
    id: "C-1003",
    name: "Carlos Rodríguez",
    document: "3456789012",
    plan: "Plan Alto: 10M/2M",
    status: "suspended",
    ipAddress: "192.168.1.103",
    lastPayment: "2023-08-25",
  },
  {
    id: "C-1004",
    name: "Ana Martínez",
    document: "4567890123",
    plan: "Plan Medio: 8M/2M",
    status: "active",
    ipAddress: "192.168.1.104",
    lastPayment: "2023-09-05",
  },
  {
    id: "C-1005",
    name: "Luis Sánchez",
    document: "5678901234",
    plan: "Plan Básico: 6M/2M",
    status: "inactive",
    ipAddress: "192.168.1.105",
    lastPayment: "2023-08-10",
  },
];

export function ClientsTable() {
  const [clients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.document.includes(searchTerm) ||
      client.ipAddress.includes(searchTerm)
  );

  const handleViewClient = (clientId: string) => {
    navigate(`/clients/${clientId}`);
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
        <Button>Nuevo Cliente</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>IP</TableHead>
              <TableHead>Último Pago</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.length === 0 ? (
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
                        Doc: {client.document}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{client.plan}</TableCell>
                  <TableCell>
                    <StatusBadge status={client.status} />
                  </TableCell>
                  <TableCell>
                    <code className="text-sm">{client.ipAddress}</code>
                  </TableCell>
                  <TableCell>{formatDate(client.lastPayment)}</TableCell>
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
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Generar factura</DropdownMenuItem>
                        <DropdownMenuItem>Crear ticket</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Suspender servicio
                        </DropdownMenuItem>
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

function StatusBadge({ status }: { status: string }) {
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
