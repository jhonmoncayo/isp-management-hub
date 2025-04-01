
import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ClientData {
  id: string;
  name: string;
  document: string;
  documentType: string;
  address: string;
  phone: string;
  email: string;
  plan: {
    name: string;
    download: number;
    upload: number;
    price: number;
  };
  status: "active" | "inactive" | "suspended";
  ipAddress: string;
  macAddress: string;
  lastPayment: string;
  dueDate: string;
  registrationDate: string;
}

const mockClientData: ClientData = {
  id: "C-1001",
  name: "Juan Pérez",
  document: "1234567890",
  documentType: "Cédula",
  address: "Calle 123 #45-67, Barrio Centro",
  phone: "+57 300 123 4567",
  email: "juan.perez@example.com",
  plan: {
    name: "Plan Medio",
    download: 8,
    upload: 2,
    price: 65000,
  },
  status: "active",
  ipAddress: "192.168.1.101",
  macAddress: "00:1A:2B:3C:4D:5E",
  lastPayment: "2023-09-15",
  dueDate: "2023-10-15",
  registrationDate: "2023-01-10",
};

export default function ClientDetail() {
  const { id } = useParams<{ id: string }>();
  const [client] = useState<ClientData>(mockClientData);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{client.name}</h1>
            <StatusBadge status={client.status} />
          </div>
          <p className="text-muted-foreground">
            Cliente #{client.id} · {client.documentType}: {client.document}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Editar</Button>
          <Button variant="default">Generar Factura</Button>
        </div>
      </div>

      <Tabs defaultValue="info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="info">Información</TabsTrigger>
          <TabsTrigger value="billing">Facturación</TabsTrigger>
          <TabsTrigger value="technical">Datos Técnicos</TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
        </TabsList>
        <TabsContent value="info" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Nombre
                      </h3>
                      <p>{client.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Documento
                      </h3>
                      <p>
                        {client.documentType}: {client.document}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Dirección
                    </h3>
                    <p>{client.address}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Teléfono
                      </h3>
                      <p>{client.phone}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Email
                      </h3>
                      <p>{client.email}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Información del Servicio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Plan Contratado
                    </h3>
                    <p className="font-medium text-lg">
                      {client.plan.name} ({client.plan.download}M/{client.plan.upload}M)
                    </p>
                    <p className="text-muted-foreground">
                      ${client.plan.price.toLocaleString()} / mes
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Estado
                      </h3>
                      <StatusBadge status={client.status} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Fecha de Registro
                      </h3>
                      <p>{formatDate(client.registrationDate)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Información de Facturación</CardTitle>
              <CardDescription>
                Estado de pagos y facturas del cliente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Último Pago
                    </h3>
                    <p className="font-medium text-lg">
                      {formatDate(client.lastPayment)}
                    </p>
                    <p className="text-muted-foreground">
                      ${client.plan.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Próximo Vencimiento
                    </h3>
                    <p className="font-medium text-lg">
                      {formatDate(client.dueDate)}
                    </p>
                    <p className="text-muted-foreground">
                      Faltan {getDaysUntil(client.dueDate)} días
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Estado de Cuenta
                    </h3>
                    <p className="font-medium text-lg text-green-600">Al día</p>
                    <p className="text-muted-foreground">
                      Sin pagos pendientes
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Historial de Facturas
                  </h3>
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="py-3 px-4 text-left">Factura</th>
                          <th className="py-3 px-4 text-left">Fecha</th>
                          <th className="py-3 px-4 text-left">Monto</th>
                          <th className="py-3 px-4 text-left">Estado</th>
                          <th className="py-3 px-4 text-right">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {[...Array(5)].map((_, i) => {
                          const date = new Date(client.lastPayment);
                          date.setMonth(date.getMonth() - i);
                          
                          return (
                            <tr key={i} className="hover:bg-muted/50">
                              <td className="py-3 px-4">F-{1000 + i}</td>
                              <td className="py-3 px-4">
                                {formatDate(date.toISOString().split('T')[0])}
                              </td>
                              <td className="py-3 px-4">
                                ${client.plan.price.toLocaleString()}
                              </td>
                              <td className="py-3 px-4">
                                <Badge variant="outline" className="bg-green-100 text-green-800">
                                  Pagada
                                </Badge>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <Button size="sm" variant="ghost">
                                  Ver PDF
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="technical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Información Técnica</CardTitle>
              <CardDescription>
                Datos de conexión y configuración
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Dirección IP
                    </h3>
                    <p className="font-mono text-lg">{client.ipAddress}</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Dirección MAC
                    </h3>
                    <p className="font-mono text-lg">{client.macAddress}</p>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Configuración QoS
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-muted-foreground text-sm">
                        Descarga máxima
                      </p>
                      <p className="font-medium">{client.plan.download} Mbps</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">
                        Subida máxima
                      </p>
                      <p className="font-medium">{client.plan.upload} Mbps</p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-medium">
                      Estado de la Conexión
                    </h3>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800"
                    >
                      Online
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <p className="text-muted-foreground text-sm">
                        Tiempo activo
                      </p>
                      <p className="font-medium">3d 6h 42m</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">
                        Señal
                      </p>
                      <p className="font-medium">-58 dBm (Excelente)</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">
                        CCQ
                      </p>
                      <p className="font-medium">96%</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tickets de Soporte</CardTitle>
              <CardDescription>
                Historial de solicitudes de soporte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Placeholder for tickets */}
                <div className="border rounded-md p-4">
                  <p className="text-muted-foreground text-center py-8">
                    No hay tickets de soporte para este cliente
                  </p>
                </div>
                <div className="flex justify-center">
                  <Button>Crear Nuevo Ticket</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
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

function getDaysUntil(dateString: string): number {
  const today = new Date();
  const dueDate = new Date(dateString);
  const diffTime = dueDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant="outline"
      className={cn({
        "bg-green-100 text-green-800": status === "active",
        "bg-red-100 text-red-800": status === "inactive",
        "bg-orange-100 text-orange-800": status === "suspended",
      })}
    >
      {status === "active" && "Activo"}
      {status === "inactive" && "Inactivo"}
      {status === "suspended" && "Suspendido"}
    </Badge>
  );
}
