
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type TicketPriority = "low" | "medium" | "high" | "critical";
type TicketStatus = "open" | "in_progress" | "resolved" | "closed";

interface Ticket {
  id: string;
  title: string;
  clientName: string;
  clientInitials: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
}

const tickets: Ticket[] = [
  {
    id: "T-1234",
    title: "Sin conexión a Internet",
    clientName: "Juan Pérez",
    clientInitials: "JP",
    priority: "high",
    status: "open",
    createdAt: "hace 2 horas",
  },
  {
    id: "T-1233",
    title: "Velocidad lenta",
    clientName: "María García",
    clientInitials: "MG",
    priority: "medium",
    status: "in_progress",
    createdAt: "hace 3 horas",
  },
  {
    id: "T-1232",
    title: "Solicitud cambio de plan",
    clientName: "Carlos Rodríguez",
    clientInitials: "CR",
    priority: "low",
    status: "open",
    createdAt: "hace 5 horas",
  },
  {
    id: "T-1231",
    title: "Router dañado",
    clientName: "Ana Martínez",
    clientInitials: "AM",
    priority: "critical",
    status: "in_progress",
    createdAt: "hace 8 horas",
  },
];

export function RecentTickets() {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Tickets Recientes</CardTitle>
        <CardDescription>
          Últimos tickets de soporte abiertos por los clientes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="flex items-center justify-between space-x-4 rounded-md border p-4"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>{ticket.clientInitials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{ticket.title}</p>
                  <div className="flex items-center pt-1">
                    <p className="text-xs text-muted-foreground">
                      {ticket.clientName} · {ticket.createdAt}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <PriorityBadge priority={ticket.priority} />
                <StatusBadge status={ticket.status} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function PriorityBadge({ priority }: { priority: TicketPriority }) {
  const variants = {
    low: "bg-green-100 text-green-800 hover:bg-green-100",
    medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    high: "bg-orange-100 text-orange-800 hover:bg-orange-100",
    critical: "bg-red-100 text-red-800 hover:bg-red-100",
  };

  const labels = {
    low: "Baja",
    medium: "Media",
    high: "Alta",
    critical: "Crítica",
  };

  return (
    <Badge variant="outline" className={cn(variants[priority])}>
      {labels[priority]}
    </Badge>
  );
}

function StatusBadge({ status }: { status: TicketStatus }) {
  const variants = {
    open: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    in_progress: "bg-purple-100 text-purple-800 hover:bg-purple-100",
    resolved: "bg-green-100 text-green-800 hover:bg-green-100",
    closed: "bg-gray-100 text-gray-800 hover:bg-gray-100",
  };

  const labels = {
    open: "Abierto",
    in_progress: "En progreso",
    resolved: "Resuelto",
    closed: "Cerrado",
  };

  return (
    <Badge variant="outline" className={cn(variants[status])}>
      {labels[status]}
    </Badge>
  );
}
