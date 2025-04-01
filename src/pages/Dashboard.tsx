
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { RecentTickets } from "@/components/dashboard/RecentTickets";
import { NetworkStatus } from "@/components/dashboard/NetworkStatus";
import { BillingOverview } from "@/components/dashboard/BillingOverview";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Bienvenido al sistema de administración de su ISP
          </p>
        </div>
      </div>

      <DashboardStats />

      <div className="grid gap-6 md:grid-cols-4">
        <RecentTickets />
        <NetworkStatus />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <BillingOverview />
        {/* Additional dashboard cards can be added here */}
      </div>
    </div>
  );
}
