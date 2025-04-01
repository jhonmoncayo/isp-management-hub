
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DownloadIcon, UsersIcon, WifiIcon, FileTextIcon } from "lucide-react";
import { FinancialReports } from "@/components/reports/FinancialReports";
import { NetworkReports } from "@/components/reports/NetworkReports";
import { ClientReports } from "@/components/reports/ClientReports";

export default function Reports() {
  const [activeTab, setActiveTab] = useState("financial");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reportes</h1>
          <p className="text-muted-foreground">
            Analíticas y estadísticas del sistema
          </p>
        </div>
        <Button>
          <DownloadIcon className="h-4 w-4 mr-2" />
          Exportar a PDF
        </Button>
      </div>

      <Tabs 
        defaultValue="financial" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="financial">
            <FileTextIcon className="h-4 w-4 mr-2" />
            Financieros
          </TabsTrigger>
          <TabsTrigger value="network">
            <WifiIcon className="h-4 w-4 mr-2" />
            Red
          </TabsTrigger>
          <TabsTrigger value="clients">
            <UsersIcon className="h-4 w-4 mr-2" />
            Clientes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="financial" className="space-y-4">
          <FinancialReports />
        </TabsContent>
        <TabsContent value="network" className="space-y-4">
          <NetworkReports />
        </TabsContent>
        <TabsContent value="clients" className="space-y-4">
          <ClientReports />
        </TabsContent>
      </Tabs>
    </div>
  );
}
