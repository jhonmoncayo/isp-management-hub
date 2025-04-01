
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  PlusIcon, 
  MoreHorizontal, 
  TrashIcon, 
  LockIcon, 
  UserIcon, 
  ShieldIcon, 
  UserPlusIcon 
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

// Sample user data
const users = [
  { id: 1, name: "Admin User", email: "admin@example.com", role: "admin", status: "active" },
  { id: 2, name: "Tech Support", email: "tech@example.com", role: "technician", status: "active" },
  { id: 3, name: "Billing Staff", email: "billing@example.com", role: "billing", status: "active" },
  { id: 4, name: "Former Employee", email: "former@example.com", role: "technician", status: "inactive" },
];

export function UserSettings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const roleVariants = {
    admin: "bg-purple-100 text-purple-800 hover:bg-purple-100",
    technician: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    billing: "bg-green-100 text-green-800 hover:bg-green-100",
  };

  const roleLabels = {
    admin: "Administrador",
    technician: "Técnico",
    billing: "Facturación",
  };

  const statusVariants = {
    active: "bg-green-100 text-green-800 hover:bg-green-100",
    inactive: "bg-red-100 text-red-800 hover:bg-red-100",
  };

  const statusLabels = {
    active: "Activo",
    inactive: "Inactivo",
  };

  const handleAddUser = () => {
    setIsCreatingUser(true);
    // Simulate API call
    setTimeout(() => {
      setIsCreatingUser(false);
      setIsAddDialogOpen(false);
      toast({
        title: "Usuario creado",
        description: "El nuevo usuario ha sido creado exitosamente.",
      });
    }, 1000);
  };

  const handleResetPassword = (userId) => {
    toast({
      title: "Enlace enviado",
      description: "Se ha enviado un enlace de restablecimiento de contraseña.",
    });
  };

  const handleChangeStatus = (userId, newStatus) => {
    toast({
      title: "Estado actualizado",
      description: `El usuario ha sido ${newStatus === 'active' ? 'activado' : 'desactivado'}.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center">
            <div>
              <CardTitle>Usuarios del Sistema</CardTitle>
              <CardDescription>
                Gestión de usuarios y permisos de acceso
              </CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="mt-4 sm:mt-0">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Nuevo Usuario
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Agregar Usuario</DialogTitle>
                  <DialogDescription>
                    Cree un nuevo usuario con acceso al sistema
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Nombre Completo
                    </label>
                    <Input id="name" placeholder="Juan Pérez" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Correo Electrónico
                    </label>
                    <Input id="email" type="email" placeholder="email@ejemplo.com" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="role" className="text-sm font-medium">
                      Rol
                    </label>
                    <Select defaultValue="technician">
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar rol" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrador</SelectItem>
                        <SelectItem value="technician">Técnico</SelectItem>
                        <SelectItem value="billing">Facturación</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddUser} disabled={isCreatingUser}>
                    {isCreatingUser ? "Creando..." : "Crear Usuario"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Buscar por nombre, email o rol..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                        No se encontraron usuarios
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">{user.name}</span>
                            <span className="text-sm text-muted-foreground">{user.email}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn(roleVariants[user.role])}>
                            {roleLabels[user.role]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn(statusVariants[user.status])}>
                            {statusLabels[user.status]}
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
                              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => {}}>
                                <UserIcon className="mr-2 h-4 w-4" />
                                Editar perfil
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleResetPassword(user.id)}>
                                <LockIcon className="mr-2 h-4 w-4" />
                                Restablecer contraseña
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {}}>
                                <ShieldIcon className="mr-2 h-4 w-4" />
                                Cambiar permisos
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {user.status === 'active' ? (
                                <DropdownMenuItem onClick={() => handleChangeStatus(user.id, 'inactive')}>
                                  <TrashIcon className="mr-2 h-4 w-4" />
                                  Desactivar usuario
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onClick={() => handleChangeStatus(user.id, 'active')}>
                                  <UserPlusIcon className="mr-2 h-4 w-4" />
                                  Activar usuario
                                </DropdownMenuItem>
                              )}
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
        </CardContent>
      </Card>
    </div>
  );
}
