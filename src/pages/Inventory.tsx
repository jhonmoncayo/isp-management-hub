
import { useState } from "react";
import { InventoryItemsTable } from "@/components/inventory/InventoryItemsTable";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { CreateInventoryItemDialog } from "@/components/inventory/CreateInventoryItemDialog";

export default function Inventory() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventario</h1>
          <p className="text-muted-foreground">
            Gestión de equipos y dispositivos de red
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Nuevo Item
        </Button>
      </div>

      <InventoryItemsTable />
      
      <CreateInventoryItemDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen} 
      />
    </div>
  );
}
