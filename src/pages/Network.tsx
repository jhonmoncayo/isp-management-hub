
import { useState, useEffect } from "react";
import { NetworkDevicesTable } from "@/components/network/NetworkDevicesTable";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon, WifiIcon, ActivityIcon, ServerIcon } from "lucide-react";
import { NetworkStatus } from "@/components/network/NetworkStatus";
import { NetworkMikrotik } from "@/components/network/NetworkMikrotik";
import { CreateDeviceDialog } from "@/components/network/CreateDeviceDialog";

export default function Network() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("devices");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Red</h1>
          <p className="text-muted-foreground">
            Administración de dispositivos y conexiones de red
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Agregar dispositivo
        </Button>
      </div>

      <Tabs 
        defaultValue="devices" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="devices">
            <ServerIcon className="h-4 w-4 mr-2" />
            Dispositivos
          </TabsTrigger>
          <TabsTrigger value="status">
            <ActivityIcon className="h-4 w-4 mr-2" />
            Estado
          </TabsTrigger>
          <TabsTrigger value="mikrotik">
            <WifiIcon className="h-4 w-4 mr-2" />
            Mikrotik
          </TabsTrigger>
        </TabsList>
        <TabsContent value="devices" className="space-y-4">
          <NetworkDevicesTable />
        </TabsContent>
        <TabsContent value="status" className="space-y-4">
          <NetworkStatus />
        </TabsContent>
        <TabsContent value="mikrotik" className="space-y-4">
          <NetworkMikrotik />
        </TabsContent>
      </Tabs>

      <CreateDeviceDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}
