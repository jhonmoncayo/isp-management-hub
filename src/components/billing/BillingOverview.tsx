
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
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
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

// Mock data for the overview
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

const invoiceStatus = [
  { name: "Pagadas", value: 85 },
  { name: "Pendientes", value: 10 },
  { name: "Vencidas", value: 5 },
];

const planDistribution = [
  { name: "Básico", value: 120 },
  { name: "Medio", value: 200 },
  { name: "Alto", value: 80 },
];

const COLORS = ["#16a34a", "#eab308", "#dc2626"];
const PLAN_COLORS = ["#0ea5e9", "#6366f1", "#ec4899"];

export function BillingOverview() {
  const [totals, setTotals] = useState({
    totalInvoices: 0,
    paidInvoices: 0,
    pendingAmount: 0,
    clientCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBillingStats();
  }, []);

  async function fetchBillingStats() {
    try {
      setLoading(true);
      
      // This would normally be API calls to get real data
      // Simulating with setTimeout for demo purposes
      setTimeout(() => {
        setTotals({
          totalInvoices: 450,
          paidInvoices: 380,
          pendingAmount: 3500000,
          clientCount: 400
        });
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error fetching billing stats:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las estadísticas de facturación",
        variant: "destructive",
      });
      setLoading(false);
    }
  }

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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Facturado (Anual)
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
            <div className="text-2xl font-bold">
              {loading ? "Cargando..." : formatCurrency(59700000)}
            </div>
            <p className="text-xs text-muted-foreground">
              +12% respecto al año anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Facturas Emitidas</CardTitle>
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
            <div className="text-2xl font-bold">
              {loading ? "Cargando..." : totals.totalInvoices}
            </div>
            <p className="text-xs text-muted-foreground">
              {loading ? "" : `${totals.paidInvoices} pagadas (${Math.round(totals.paidInvoices/totals.totalInvoices*100)}%)`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Por Cobrar
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
            <div className="text-2xl font-bold">
              {loading ? "Cargando..." : formatCurrency(totals.pendingAmount)}
            </div>
            <p className="text-xs text-muted-foreground">
              {loading ? "" : `${totals.totalInvoices - totals.paidInvoices} facturas pendientes`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Clientes
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
            <div className="text-2xl font-bold">
              {loading ? "Cargando..." : totals.clientCount}
            </div>
            <p className="text-xs text-muted-foreground">
              +5 nuevos este mes
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
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
                  <Bar dataKey="amount" name="Monto Facturado" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Estado de Facturas</CardTitle>
            <CardDescription>
              Distribución actual del estado de facturas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={invoiceStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {invoiceStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
          <CardTitle>Distribución de Planes</CardTitle>
          <CardDescription>
            Cantidad de clientes por tipo de plan contratado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={planDistribution}
                layout="vertical"
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
                <Bar dataKey="value" name="Número de Clientes">
                  {planDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PLAN_COLORS[index % PLAN_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
