
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { 
  RefreshCw, 
  Download, 
  Upload, 
  Users, 
  Wifi, 
  Layers, 
  Settings 
} from "lucide-react";

export function NetworkMikrotik() {
  const [activeTab, setActiveTab] = useState("clients");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    // Simulando conexión a Mikrotik
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      toast({
        title: "Conectado",
        description: "Conexión establecida con Mikrotik RB1009",
      });
    }, 2000);
  };
  
  const mockClients = [
    { name: "Cliente1", mac: "00:11:22:33:44:55", ip: "192.168.1.100", rx: "5.2 Mbps", tx: "1.5 Mbps", signal: "-65 dBm" },
    { name: "Cliente2", mac: "AA:BB:CC:DD:EE:FF", ip: "192.168.1.101", rx: "3.7 Mbps", tx: "0.8 Mbps", signal: "-72 dBm" },
    { name: "Cliente3", mac: "11:22:33:44:55:66", ip: "192.168.1.102", rx: "8.1 Mbps", tx: "2.3 Mbps", signal: "-58 dBm" },
    { name: "Cliente4", mac: "AA:BB:CC:11:22:33", ip: "192.168.1.103", rx: "1.2 Mbps", tx: "0.5 Mbps", signal: "-80 dBm" },
    { name: "Cliente5", mac: "55:66:77:88:99:00", ip: "192.168.1.104", rx: "6.8 Mbps", tx: "1.9 Mbps", signal: "-62 dBm" },
  ];
  
  const mockInterfaces = [
    { name: "ether1", type: "ethernet", state: "up", rx: "75 Mbps", tx: "25 Mbps" },
    { name: "ether2", type: "ethernet", state: "up", rx: "45 Mbps", tx: "15 Mbps" },
    { name: "ether3", type: "ethernet", state: "down", rx: "0 Mbps", tx: "0 Mbps" },
    { name: "wlan1", type: "wireless", state: "up", rx: "30 Mbps", tx: "10 Mbps" },
    { name: "sfp1", type: "fiber", state: "up", rx: "120 Mbps", tx: "40 Mbps" },
  ];
  
  const mockQueues = [
    { name: "Cliente Premium", target: "192.168.1.100/32", rate: "10M/5M", burst: "12M/6M", priority: "1" },
    { name: "Cliente Estándar", target: "192.168.1.101/32", rate: "6M/2M", burst: "8M/3M", priority: "3" },
    { name: "Cliente Básico", target: "192.168.1.102/32", rate: "4M/1M", burst: "5M/2M", priority: "5" },
    { name: "Oficina Central", target: "192.168.2.0/24", rate: "50M/20M", burst: "60M/25M", priority: "1" },
    { name: "Invitados", target: "192.168.3.0/24", rate: "2M/512k", burst: "3M/1M", priority: "8" },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Mikrotik RouterOS</span>
            {!isConnected ? (
              <Button onClick={handleConnect} disabled={isConnecting}>
                {isConnecting ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Conectando...
                  </>
                ) : (
                  "Conectar a RouterOS"
                )}
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setIsConnected(false)}>
                Desconectar
              </Button>
            )}
          </CardTitle>
          <CardDescription>
            {isConnected ? (
              <div className="flex items-center space-x-2">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500"></span>
                <span>Conectado a RB1009, RouterOS v6.49.10</span>
              </div>
            ) : (
              "Configure la conexión a su router Mikrotik"
            )}
          </CardDescription>
        </CardHeader>
        {!isConnected ? (
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Dirección IP</label>
                <Input defaultValue="192.168.1.1" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Puerto API</label>
                <Input defaultValue="8728" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Usuario</label>
                <Input defaultValue="admin" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Contraseña</label>
                <Input type="password" />
              </div>
            </div>
          </CardContent>
        ) : (
          <CardContent className="p-0">
            <Tabs 
              defaultValue="clients" 
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <div className="border-b px-6">
                <TabsList className="h-12">
                  <TabsTrigger value="clients" className="px-4">
                    <Users className="h-4 w-4 mr-2" />
                    Clientes
                  </TabsTrigger>
                  <TabsTrigger value="interfaces" className="px-4">
                    <Layers className="h-4 w-4 mr-2" />
                    Interfaces
                  </TabsTrigger>
                  <TabsTrigger value="queues" className="px-4">
                    <Wifi className="h-4 w-4 mr-2" />
                    Colas
                  </TabsTrigger>
                  <TabsTrigger value="config" className="px-4">
                    <Settings className="h-4 w-4 mr-2" />
                    Configuración
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="clients" className="p-6">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>MAC</TableHead>
                        <TableHead>IP</TableHead>
                        <TableHead>Rx</TableHead>
                        <TableHead>Tx</TableHead>
                        <TableHead>Señal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockClients.map((client, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{client.name}</TableCell>
                          <TableCell>{client.mac}</TableCell>
                          <TableCell>{client.ip}</TableCell>
                          <TableCell>
                            <span className="flex items-center">
                              <Download className="h-4 w-4 mr-1 text-blue-500" /> 
                              {client.rx}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="flex items-center">
                              <Upload className="h-4 w-4 mr-1 text-green-500" /> 
                              {client.tx}
                            </span>
                          </TableCell>
                          <TableCell>{client.signal}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="interfaces" className="p-6">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Rx</TableHead>
                        <TableHead>Tx</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockInterfaces.map((iface, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{iface.name}</TableCell>
                          <TableCell>{iface.type}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              iface.state === "up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}>
                              {iface.state}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="flex items-center">
                              <Download className="h-4 w-4 mr-1 text-blue-500" /> 
                              {iface.rx}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="flex items-center">
                              <Upload className="h-4 w-4 mr-1 text-green-500" /> 
                              {iface.tx}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="queues" className="p-6">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Target</TableHead>
                        <TableHead>Rate</TableHead>
                        <TableHead>Burst</TableHead>
                        <TableHead>Prioridad</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockQueues.map((queue, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{queue.name}</TableCell>
                          <TableCell><code>{queue.target}</code></TableCell>
                          <TableCell>{queue.rate}</TableCell>
                          <TableCell>{queue.burst}</TableCell>
                          <TableCell>{queue.priority}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="config" className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Backup y Restauración</CardTitle>
                      <CardDescription>
                        Gestione los respaldos de configuración
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button className="w-full">
                        <Download className="mr-2 h-4 w-4" /> 
                        Crear Backup
                      </Button>
                      <div className="flex items-center space-x-2">
                        <Input type="file" id="backup-file" />
                        <Button variant="outline">Restaurar</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Acciones del Sistema</CardTitle>
                      <CardDescription>
                        Opciones de administración del router
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline">Reiniciar</Button>
                        <Button variant="outline">Actualizar</Button>
                        <Button variant="outline">Reset Config</Button>
                        <Button variant="destructive">Factory Reset</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
