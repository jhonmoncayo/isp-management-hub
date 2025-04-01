
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
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

// Sample data for financial reports
const monthlyRevenue = [
  { month: "Ene", amount: 4200000 },
  { month: "Feb", amount: 4350000 },
  { month: "Mar", amount: 4500000 },
  { month: "Abr", amount: 4650000 },
  { month: "May", amount: 4800000 },
  { month: "Jun", amount: 5000000 },
  { month: "Jul", amount: 5150000 },
  { month: "Ago", amount: 5300000 },
  { month: "Sep", amount: 5450000 },
  { month: "Oct", amount: 5600000 },
  { month: "Nov", amount: 5750000 },
  { month: "Dic", amount: 5900000 },
];

const debtors = [
  { name: "Cliente 1", days: 5, amount: 65000 },
  { name: "Cliente 2", days: 15, amount: 75000 },
  { name: "Cliente 3", days: 8, amount: 55000 },
  { name: "Cliente 4", days: 30, amount: 65000 },
  { name: "Cliente 5", days: 45, amount: 55000 },
];

const planRevenue = [
  { name: "Básico", value: 6600000 },
  { name: "Medio", value: 13000000 },
  { name: "Alto", value: 6000000 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export function FinancialReports() {
  function formatCurrency(amount) {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  }

  const formatTooltipValue = (value) => {
    return formatCurrency(value);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ingresos Mensuales</CardTitle>
          <CardDescription>
            Facturación mensual durante el año actual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyRevenue}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => 
                  new Intl.NumberFormat('es-CO', {
                    notation: 'compact',
                    compactDisplay: 'short',
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  }).format(value)
                } />
                <Tooltip formatter={formatTooltipValue} />
                <Legend />
                <Bar dataKey="amount" name="Ingresos" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ingresos por Plan</CardTitle>
            <CardDescription>
              Distribución de ingresos por tipo de plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={planRevenue}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {planRevenue.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Clientes en Mora</CardTitle>
            <CardDescription>
              Listado de clientes con facturas vencidas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Días</TableHead>
                    <TableHead>Monto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {debtors.map((debtor, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{debtor.name}</TableCell>
                      <TableCell>{debtor.days}</TableCell>
                      <TableCell>{formatCurrency(debtor.amount)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resumen Financiero</CardTitle>
          <CardDescription>
            Principales indicadores financieros
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg border p-4">
              <div className="text-sm font-medium text-muted-foreground">Ingresos Anuales</div>
              <div className="text-2xl font-bold mt-1">{formatCurrency(59700000)}</div>
              <div className="text-xs text-muted-foreground mt-1">+12% respecto al año anterior</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-sm font-medium text-muted-foreground">Cartera Vencida</div>
              <div className="text-2xl font-bold mt-1">{formatCurrency(315000)}</div>
              <div className="text-xs text-muted-foreground mt-1">5 clientes en mora</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-sm font-medium text-muted-foreground">Promedio por Cliente</div>
              <div className="text-2xl font-bold mt-1">{formatCurrency(65000)}</div>
              <div className="text-xs text-muted-foreground mt-1">Plan más popular: Medio (8M/2M)</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
