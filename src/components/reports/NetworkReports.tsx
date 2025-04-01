
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AreaChart, 
  Area, 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Sample data for network reports
const bandwidthUsage = [
  { time: "00:00", download: 15, upload: 5 },
  { time: "02:00", download: 10, upload: 3 },
  { time: "04:00", download: 8, upload: 2 },
  { time: "06:00", download: 12, upload: 4 },
  { time: "08:00", download: 30, upload: 10 },
  { time: "10:00", download: 45, upload: 15 },
  { time: "12:00", download: 55, upload: 18 },
  { time: "14:00", download: 50, upload: 16 },
  { time: "16:00", download: 60, upload: 20 },
  { time: "18:00", download: 75, upload: 25 },
  { time: "20:00", download: 70, upload: 23 },
  { time: "22:00", download: 40, upload: 13 },
];

const problemTypes = [
  { name: "Sin conexión", count: 45 },
  { name: "Velocidad lenta", count: 30 },
  { name: "Intermitencia", count: 25 },
  { name: "Configuración", count: 10 },
  { name: "Hardware", count: 15 },
];

const deviceStatus = [
  { name: "Activos", value: 15 },
  { name: "En mantenimiento", value: 2 },
  { name: "Inactivos", value: 1 },
];

const topDevices = [
  { name: "Router Principal", type: "Router", status: "active", uptime: "30 días", load: "70%" },
  { name: "Switch Core", type: "Switch", status: "active", uptime: "45 días", load: "55%" },
  { name: "AP Sector Norte", type: "Access Point", status: "warning", uptime: "5 días", load: "85%" },
  { name: "AP Sector Sur", type: "Access Point", status: "active", uptime: "15 días", load: "60%" },
  { name: "Enlace Redundante", type: "Radio", status: "inactive", uptime: "0 días", load: "0%" },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD"];
const STATUS_COLORS = ["#16a34a", "#eab308", "#dc2626"];

export function NetworkReports() {
  const statusVariants = {
    active: "bg-green-100 text-green-800 hover:bg-green-100",
    warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    inactive: "bg-red-100 text-red-800 hover:bg-red-100",
  };

  const statusLabels = {
    active: "Activo",
    warning: "Advertencia",
    inactive: "Inactivo",
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Uso de Ancho de Banda (24h)</CardTitle>
          <CardDescription>
            Consumo de ancho de banda por hora
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={bandwidthUsage}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis label={{ value: 'Mbps', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="download" name="Descarga" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                <Area type="monotone" dataKey="upload" name="Subida" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tipos de Problemas Reportados</CardTitle>
            <CardDescription>
              Categorías de incidencias reportadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={problemTypes}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Cantidad" fill="#8884d8">
                    {problemTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estado de Dispositivos</CardTitle>
            <CardDescription>
              Distribución de dispositivos por estado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {deviceStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dispositivos Críticos</CardTitle>
          <CardDescription>
            Dispositivos principales de la red y su estado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Uptime</TableHead>
                  <TableHead>Carga</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topDevices.map((device, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{device.name}</TableCell>
                    <TableCell>{device.type}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn(statusVariants[device.status])}>
                        {statusLabels[device.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>{device.uptime}</TableCell>
                    <TableCell>{device.load}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
