
import { ClientsTable } from "@/components/clients/ClientsTable";

export default function Clients() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
        <p className="text-muted-foreground">
          Gestión de clientes y sus servicios contratados
        </p>
      </div>

      <ClientsTable />
    </div>
  );
}
