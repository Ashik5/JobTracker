"use client";

import { Button } from "./ui/button";
import {
  Briefcase,
  Building2,
  ChevronLeft,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Browse Jobs", href: "/browse", icon: Building2 },
  { name: "My Applications", href: "/applications", icon: Briefcase },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`fixed top-0 left-0 z-40 flex h-screen flex-col border-r bg-background px-4 py-4 transition-all ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className="mb-8 flex items-center justify-between">
        {!isCollapsed && (
          <Link href="/" className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" />
            <span className="font-bold">JobTracker</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <Menu className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent ${
                isActive ? "bg-accent" : "transparent"
              } ${isCollapsed ? "justify-center" : ""}`}
            >
              <Icon className="h-4 w-4" />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="space-y-4 border-t pt-4">
        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={`w-full ${
                isCollapsed ? "justify-center" : "justify-start px-3"
              }`}
            >
              {!isCollapsed && <span className="ml-3">John Doe</span>}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}