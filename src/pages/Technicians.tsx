
import { useState } from "react";
import { TechniciansTable } from "@/components/technicians/TechniciansTable";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { CreateTechnicianDialog } from "@/components/technicians/CreateTechnicianDialog";

export default function Technicians() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Técnicos</h1>
          <p className="text-muted-foreground">
            Gestión del personal técnico y asignación de tareas
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Nuevo Técnico
        </Button>
      </div>

      <TechniciansTable />
      
      <CreateTechnicianDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen} 
      />
    </div>
  );
}
