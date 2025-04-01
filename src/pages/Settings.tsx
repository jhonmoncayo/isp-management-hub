
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  SettingsIcon, 
  UserIcon, 
  WrenchIcon, 
  ServerIcon, 
  BellIcon 
} from "lucide-react";
import { GeneralSettings } from "@/components/settings/GeneralSettings";
import { UserSettings } from "@/components/settings/UserSettings";
import { SystemSettings } from "@/components/settings/SystemSettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">
          Ajustes y preferencias del sistema
        </p>
      </div>

      <Tabs 
        defaultValue="general" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="general">
            <SettingsIcon className="h-4 w-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="users">
            <UserIcon className="h-4 w-4 mr-2" />
            Usuarios
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <WrenchIcon className="h-4 w-4 mr-2" />
            Integraciones
          </TabsTrigger>
          <TabsTrigger value="system">
            <ServerIcon className="h-4 w-4 mr-2" />
            Sistema
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <BellIcon className="h-4 w-4 mr-2" />
            Notificaciones
          </TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4">
          <GeneralSettings />
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <UserSettings />
        </TabsContent>
        <TabsContent value="integrations" className="space-y-4">
          <SystemSettings />
        </TabsContent>
        <TabsContent value="system" className="space-y-4">
          <SystemSettings />
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <NotificationSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
