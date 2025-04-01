
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RouterStatus {
  name: string;
  status: "active" | "inactive" | "maintenance";
  cpuLoad: number;
  memoryUsage: number;
  uptime: string;
}

const mockRouters: RouterStatus[] = [
  {
    name: "Router Principal (RB1009)",
    status: "active",
    cpuLoad: 42,
    memoryUsage: 38,
    uptime: "14d 7h 22m",
  },
  {
    name: "Router Backup",
    status: "active",
    cpuLoad: 21,
    memoryUsage: 25,
    uptime: "14d 7h 18m",
  },
  {
    name: "AP Sector Norte",
    status: "active",
    cpuLoad: 65,
    memoryUsage: 72,
    uptime: "6d 4h 17m",
  },
  {
    name: "AP Sector Sur",
    status: "maintenance",
    cpuLoad: 0,
    memoryUsage: 15,
    uptime: "0d 2h 45m",
  },
];

export function NetworkStatus() {
  const [routers, setRouters] = useState<RouterStatus[]>(mockRouters);

  // Simulates updating router status data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRouters((prev) =>
        prev.map((router) => ({
          ...router,
          cpuLoad: Math.min(
            100,
            Math.max(0, router.cpuLoad + (Math.random() * 10 - 5))
          ),
          memoryUsage: Math.min(
            100,
            Math.max(0, router.memoryUsage + (Math.random() * 6 - 3))
          ),
        }))
      );
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Estado de la red</CardTitle>
        <CardDescription>
          Monitoreo en tiempo real de los dispositivos Mikrotik
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {routers.map((router) => (
            <div
              key={router.name}
              className="rounded-md border p-4 transition-all hover:shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <div
                    className={cn("status-indicator", {
                      "status-active": router.status === "active",
                      "status-inactive": router.status === "inactive",
                      "status-maintenance": router.status === "maintenance",
                    })}
                  />
                  <h3 className="font-medium">{router.name}</h3>
                </div>
                <div className="flex space-x-2">
                  <Badge variant="outline">
                    Uptime: {router.uptime}
                  </Badge>
                  <StatusBadge status={router.status} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>CPU</span>
                    <span className={getLoadClass(router.cpuLoad)}>
                      {router.cpuLoad}%
                    </span>
                  </div>
                  <Progress value={router.cpuLoad} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Memoria</span>
                    <span className={getLoadClass(router.memoryUsage)}>
                      {router.memoryUsage}%
                    </span>
                  </div>
                  <Progress value={router.memoryUsage} className="h-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function getLoadClass(load: number): string {
  if (load >= 80) return "text-red-500 font-medium";
  if (load >= 60) return "text-orange-500 font-medium";
  return "text-green-600 font-medium";
}

function StatusBadge({ status }: { status: string }) {
  const variants = {
    active: "bg-green-100 text-green-800 hover:bg-green-100",
    inactive: "bg-red-100 text-red-800 hover:bg-red-100",
    maintenance: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  };

  const labels = {
    active: "Activo",
    inactive: "Inactivo",
    maintenance: "Mantenimiento",
  };

  const statusKey = status as keyof typeof variants;

  return (
    <Badge variant="outline" className={cn(variants[statusKey])}>
      {labels[statusKey]}
    </Badge>
  );
}
