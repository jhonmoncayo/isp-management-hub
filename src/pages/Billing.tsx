
import { useState } from "react";
import { InvoicesTable } from "@/components/billing/InvoicesTable";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon, FileTextIcon, CreditCardIcon, UsersIcon } from "lucide-react";
import { BillingOverview } from "@/components/billing/BillingOverview";
import { CreateInvoiceDialog } from "@/components/billing/CreateInvoiceDialog";

export default function Billing() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("invoices");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Facturación</h1>
          <p className="text-muted-foreground">
            Gestión de facturas y pagos de clientes
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Nueva Factura
        </Button>
      </div>

      <Tabs 
        defaultValue="invoices" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="invoices">
            <FileTextIcon className="h-4 w-4 mr-2" />
            Facturas
          </TabsTrigger>
          <TabsTrigger value="payments">
            <CreditCardIcon className="h-4 w-4 mr-2" />
            Pagos
          </TabsTrigger>
          <TabsTrigger value="overview">
            <UsersIcon className="h-4 w-4 mr-2" />
            Resumen
          </TabsTrigger>
        </TabsList>
        <TabsContent value="invoices" className="space-y-4">
          <InvoicesTable />
        </TabsContent>
        <TabsContent value="payments" className="space-y-4">
          <BillingOverview />
        </TabsContent>
        <TabsContent value="overview" className="space-y-4">
          <BillingOverview />
        </TabsContent>
      </Tabs>

      <CreateInvoiceDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}
