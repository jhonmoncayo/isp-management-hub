
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Wifi, Ticket, FileText } from "lucide-react";

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Clientes activos"
        value="387"
        description="+4 este mes"
        icon={<Users className="h-6 w-6 text-isp-blue-600" />}
      />
      <StatCard
        title="Uso de red"
        value="78%"
        description="8.7 TB transferidos"
        icon={<Wifi className="h-6 w-6 text-isp-blue-600" />}
      />
      <StatCard
        title="Tickets abiertos"
        value="12"
        description="4 críticos"
        icon={<Ticket className="h-6 w-6 text-isp-blue-600" />}
      />
      <StatCard
        title="Ingresos mensuales"
        value="$25.2M"
        description="+2.1% vs mes anterior"
        icon={<FileText className="h-6 w-6 text-isp-blue-600" />}
      />
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, description, icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
