
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
import { MoreHorizontal, ActivityIcon, RefreshCw, Settings, Power } from "lucide-react";

export function NetworkDevicesTable() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchDevices();
  }, []);

  async function fetchDevices() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('network_devices')
        .select('*')
        .order('name');

      if (error) throw error;
      setDevices(data || []);
    } catch (error) {
      console.error('Error fetching devices:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los dispositivos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  const filteredDevices = devices.filter((device) =>
    device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.ip_address.includes(searchTerm) ||
    device.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusVariants = {
    active: "bg-green-100 text-green-800 hover:bg-green-100",
    inactive: "bg-red-100 text-red-800 hover:bg-red-100",
    maintenance: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    warning: "bg-orange-100 text-orange-800 hover:bg-orange-100",
  };

  const statusLabels = {
    active: "Activo",
    inactive: "Inactivo",
    maintenance: "Mantenimiento",
    warning: "Advertencia",
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <Input
          placeholder="Buscar por nombre, IP o tipo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="outline" onClick={fetchDevices}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualizar
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Dirección IP</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Ubicación</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Cargando dispositivos...
                </TableCell>
              </TableRow>
            ) : filteredDevices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No se encontraron dispositivos
                </TableCell>
              </TableRow>
            ) : (
              filteredDevices.map((device) => (
                <TableRow key={device.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="font-medium">{device.name}</div>
                    {device.model && (
                      <div className="text-xs text-muted-foreground">
                        Modelo: {device.model}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <code className="text-sm">{device.ip_address}</code>
                  </TableCell>
                  <TableCell>{device.type}</TableCell>
                  <TableCell>{device.location || "--"}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn(statusVariants[device.status])}>
                      {statusLabels[device.status]}
                    </Badge>
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
                          <ActivityIcon className="mr-2 h-4 w-4" />
                          Monitorear
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="mr-2 h-4 w-4" />
                          Configurar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Power className="mr-2 h-4 w-4" />
                          Reiniciar
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
