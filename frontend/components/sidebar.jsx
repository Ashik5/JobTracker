"use client";

import { Button } from "./ui/button";
import {
  Briefcase,
  Building2,
  ChevronLeft,
  Home,
  LayoutDashboard,
  SquarePlus,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import AuthComponent from "@/components/auth";
import { AuthContext } from "@/context/AuthContext";

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useContext(AuthContext);
  const [navigation, setNavigation] = useState([
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Browse Jobs", href: "/browse", icon: Building2 },
    { name: "My Applications", href: "/applications", icon: Briefcase },
  ]);

  // Update navigation based on user role
  useEffect(() => {
    if (user && user.role) {
      const baseNavigation = [{ name: "Browse Jobs", href: "/browse", icon: Building2 }];

      if (user.role === "company") {
        setNavigation([
          ...baseNavigation,
          { name: "Create a job post", href: "/applications/createApplication", icon: SquarePlus },
        ]);
      } else {
        setNavigation(baseNavigation);
      }
    }
  }, [user]);

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
          {isCollapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
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
        {!isCollapsed ? (
          <AuthComponent />
        ) : (
          <Button variant="ghost" size="icon" className="w-full">
            <LayoutDashboard className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
