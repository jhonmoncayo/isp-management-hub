
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Users,
  Wifi,
  Ticket,
  FileText,
  Settings,
  Package,
  Database,
  ChartBar,
  Truck,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
  submenu?: { title: string; href: string }[];
};

export function Sidebar() {
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleSubmenu = (title: string) => {
    if (expandedSubmenu === title) {
      setExpandedSubmenu(null);
    } else {
      setExpandedSubmenu(title);
    }
  };

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/",
      icon: <ChartBar className="h-5 w-5" />,
    },
    {
      title: "Clientes",
      href: "/clients",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Red",
      href: "/network",
      icon: <Wifi className="h-5 w-5" />,
      submenu: [
        { title: "Estado", href: "/network/status" },
        { title: "Mikrotik", href: "/network/mikrotik" },
      ],
    },
    {
      title: "Tickets",
      href: "/tickets",
      icon: <Ticket className="h-5 w-5" />,
    },
    {
      title: "Facturación",
      href: "/billing",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Técnicos",
      href: "/technicians",
      icon: <Truck className="h-5 w-5" />,
    },
    {
      title: "Inventario",
      href: "/inventory",
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: "Reportes",
      href: "/reports",
      icon: <Database className="h-5 w-5" />,
    },
    {
      title: "Configuración",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <aside
      className={cn(
        "bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border transition-all duration-300 ease-in-out z-30",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center p-4 h-16 border-b border-sidebar-border">
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-white">ISP Manager</h1>
        )}
        {isCollapsed && <h1 className="text-xl font-bold text-white mx-auto">ISP</h1>}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "ml-auto text-sidebar-foreground hover:bg-sidebar-accent/20 hover:text-sidebar-foreground",
            isCollapsed && "mx-auto"
          )}
          onClick={toggleSidebar}
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <NavLink
                to={item.href}
                end={item.href === "/"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent/20 text-sidebar-foreground"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent/10 hover:text-sidebar-foreground"
                  )
                }
                onClick={() => {
                  if (item.submenu) {
                    toggleSubmenu(item.title);
                  }
                }}
              >
                <span className="mr-3">{item.icon}</span>
                {!isCollapsed && (
                  <>
                    <span className="flex-1">{item.title}</span>
                    {item.submenu && (
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          expandedSubmenu === item.title && "rotate-180"
                        )}
                      />
                    )}
                  </>
                )}
              </NavLink>
              {!isCollapsed &&
                item.submenu &&
                expandedSubmenu === item.title && (
                  <ul className="pl-10 mt-1 space-y-1">
                    {item.submenu.map((subItem) => (
                      <li key={subItem.href}>
                        <NavLink
                          to={subItem.href}
                          className={({ isActive }) =>
                            cn(
                              "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                              isActive
                                ? "bg-sidebar-accent/20 text-sidebar-foreground"
                                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/10 hover:text-sidebar-foreground"
                            )
                          }
                        >
                          {subItem.title}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

function ChevronLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function ChevronDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
