
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
import { MoreHorizontal, Package, Tag, User, Calendar, AlertCircle } from "lucide-react";

export function InventoryItemsTable() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('inventory_items')
        .select(`
          *,
          clients(name)
        `)
        .order('name');

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching inventory items:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los elementos de inventario",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.serial_number && item.serial_number.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.clients?.name && item.clients.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const statusVariants = {
    available: "bg-green-100 text-green-800 hover:bg-green-100",
    assigned: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    maintenance: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    damaged: "bg-red-100 text-red-800 hover:bg-red-100",
    expired: "bg-gray-100 text-gray-800 hover:bg-gray-100",
  };

  const statusLabels = {
    available: "Disponible",
    assigned: "Asignado",
    maintenance: "Mantenimiento",
    damaged: "Dañado",
    expired: "Garantía vencida",
  };

  function formatDate(dateString) {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }

  // Determine if an item is close to warranty expiration (less than 30 days)
  function isWarrantyExpiringSoon(warrantyDate) {
    if (!warrantyDate) return false;
    const warrantyEnd = new Date(warrantyDate);
    const today = new Date();
    const differenceInDays = Math.ceil((warrantyEnd - today) / (1000 * 60 * 60 * 24));
    return differenceInDays > 0 && differenceInDays <= 30;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <Input
          placeholder="Buscar por nombre, tipo, serie o cliente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="outline" onClick={fetchItems}>
          Actualizar
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Número de Serie</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Asignado a</TableHead>
              <TableHead>Garantía</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Cargando elementos de inventario...
                </TableCell>
              </TableRow>
            ) : filteredItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  No se encontraron elementos de inventario
                </TableCell>
              </TableRow>
            ) : (
              filteredItems.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>
                    <span className="flex items-center">
                      <Tag className="h-3 w-3 mr-1" /> 
                      {item.serial_number || "N/A"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn(statusVariants[item.status])}>
                      {statusLabels[item.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center">
                      <User className="h-3 w-3 mr-1" /> 
                      {item.clients?.name || "Sin asignar"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" /> 
                      <span>{formatDate(item.warranty_end_date)}</span>
                      {isWarrantyExpiringSoon(item.warranty_end_date) && (
                        <AlertCircle className="h-4 w-4 ml-1 text-yellow-500" title="Garantía por vencer" />
                      )}
                    </div>
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
                          <Package className="mr-2 h-4 w-4" />
                          Ver detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <User className="mr-2 h-4 w-4" />
                          Asignar a cliente
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <AlertCircle className="mr-2 h-4 w-4" />
                          Marcar para mantenimiento
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
