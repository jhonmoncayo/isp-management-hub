
import { useState } from "react";
import { TicketsTable } from "@/components/tickets/TicketsTable";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { CreateTicketDialog } from "@/components/tickets/CreateTicketDialog";

export default function Tickets() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tickets</h1>
          <p className="text-muted-foreground">
            Gestión de tickets de soporte e incidencias
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Crear Ticket
        </Button>
      </div>

      <TicketsTable />
      
      <CreateTicketDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen} 
      />
    </div>
  );
}
