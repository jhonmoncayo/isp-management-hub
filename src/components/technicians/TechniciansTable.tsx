
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { MoreHorizontal, Phone, Mail, MapPin, Truck, ClipboardList } from "lucide-react";

export function TechniciansTable() {
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTechnicians();
  }, []);

  async function fetchTechnicians() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('technicians')
        .select('*')
        .order('name');

      if (error) throw error;
      setTechnicians(data || []);
    } catch (error) {
      console.error('Error fetching technicians:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los técnicos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  const filteredTechnicians = technicians.filter((technician) =>
    technician.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    technician.phone.includes(searchTerm) ||
    (technician.email && technician.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const statusVariants = {
    active: "bg-green-100 text-green-800 hover:bg-green-100",
    inactive: "bg-red-100 text-red-800 hover:bg-red-100",
    on_leave: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  };

  const statusLabels = {
    active: "Activo",
    inactive: "Inactivo",
    on_leave: "Permiso",
  };

  const getRandomAssignedTasks = () => {
    // Random number between 0 and 5
    return Math.floor(Math.random() * 6);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <Input
          placeholder="Buscar por nombre, teléfono o email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="outline" onClick={fetchTechnicians}>
          Actualizar
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Tareas Asignadas</TableHead>
              <TableHead>Ubicación Actual</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Cargando técnicos...
                </TableCell>
              </TableRow>
            ) : filteredTechnicians.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No se encontraron técnicos
                </TableCell>
              </TableRow>
            ) : (
              filteredTechnicians.map((technician) => (
                <TableRow key={technician.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{technician.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      <span className="flex items-center">
                        <Phone className="h-3 w-3 mr-1" /> {technician.phone}
                      </span>
                      {technician.email && (
                        <span className="flex items-center">
                          <Mail className="h-3 w-3 mr-1" /> {technician.email}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn(statusVariants[technician.status])}>
                      {statusLabels[technician.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {getRandomAssignedTasks()}
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-muted-foreground" /> 
                      No disponible
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Truck className="mr-2 h-4 w-4" />
                          Ver ubicación
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ClipboardList className="mr-2 h-4 w-4" />
                          Asignar tarea
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Phone className="mr-2 h-4 w-4" />
                          Llamar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
