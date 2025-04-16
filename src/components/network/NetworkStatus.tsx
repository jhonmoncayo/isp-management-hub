
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils"; // Add import for cn utility
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";

const mockNetworkData = [
  { time: "00:00", download: 25, upload: 10, latency: 15 },
  { time: "02:00", download: 30, upload: 12, latency: 18 },
  { time: "04:00", download: 20, upload: 8, latency: 22 },
  { time: "06:00", download: 15, upload: 5, latency: 25 },
  { time: "08:00", download: 40, upload: 15, latency: 12 },
  { time: "10:00", download: 65, upload: 25, latency: 10 },
  { time: "12:00", download: 75, upload: 30, latency: 8 },
  { time: "14:00", download: 60, upload: 20, latency: 14 },
  { time: "16:00", download: 55, upload: 18, latency: 16 },
  { time: "18:00", download: 70, upload: 28, latency: 12 },
  { time: "20:00", download: 45, upload: 18, latency: 20 },
  { time: "22:00", download: 30, upload: 12, latency: 18 },
];

const networkStatusItems = [
  { 
    name: "Router Principal", 
    ipAddress: "192.168.1.1", 
    status: "active", 
    uptime: "15 días, 7 horas", 
    load: "25%",
    clients: 48
  },
  { 
    name: "Switch Core", 
    ipAddress: "192.168.1.2", 
    status: "active", 
    uptime: "30 días, 12 horas", 
    load: "40%",
    clients: 120
  },
  { 
    name: "AP Sector Norte", 
    ipAddress: "192.168.1.10", 
    status: "warning", 
    uptime: "2 días, 5 horas", 
    load: "78%",
    clients: 32
  },
  { 
    name: "AP Sector Sur", 
    ipAddress: "192.168.1.11", 
    status: "active", 
    uptime: "10 días, 3 horas", 
    load: "45%",
    clients: 27
  },
  { 
    name: "Enlace Redundante", 
    ipAddress: "192.168.2.1", 
    status: "inactive", 
    uptime: "0 días, 0 horas", 
    load: "0%",
    clients: 0
  },
];

export function NetworkStatus() {
  const statusVariants = {
    active: "bg-green-100 text-green-800 hover:bg-green-100",
    inactive: "bg-red-100 text-red-800 hover:bg-red-100",
    maintenance: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    warning: "bg-orange-100 text-orange-800 hover:bg-orange-100",
  };

  const statusLabels = {
    active: "Activo",
    inactive: "Inactivo",
    maintenance: "Mantenimiento",
    warning: "Advertencia",
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Dispositivos
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">
              13 activos, 2 inactivos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ancho de Banda</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125 Mbps</div>
            <p className="text-xs text-muted-foreground">
              75 Mbps Down / 50 Mbps Up
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Clientes Conectados
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">227</div>
            <p className="text-xs text-muted-foreground">
              +5% desde ayer
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Latencia Promedio
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18 ms</div>
            <p className="text-xs text-muted-foreground">
              -2ms desde ayer
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tráfico de Red (24h)</CardTitle>
          <CardDescription>
            Estadísticas de uso de ancho de banda y latencia
          </CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={mockNetworkData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="download"
                  stroke="#2563eb"
                  activeDot={{ r: 8 }}
                  name="Descarga (Mbps)"
                />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="upload" 
                  stroke="#16a34a" 
                  name="Subida (Mbps)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="latency"
                  stroke="#dc2626"
                  name="Latencia (ms)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Estado de Dispositivos Críticos</CardTitle>
          <CardDescription>
            Resumen de los principales dispositivos de la red
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {networkStatusItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{item.name}</p>
                  <p className="text-sm text-muted-foreground">IP: {item.ipAddress}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden md:block text-sm text-right">
                    <p>Uptime: {item.uptime}</p>
                    <p>Clientes: {item.clients}</p>
                  </div>
                  <div className="text-sm text-right">
                    <p>Carga: {item.load}</p>
                    <Badge variant="outline" className={cn(statusVariants[item.status])}>
                      {statusLabels[item.status]}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
