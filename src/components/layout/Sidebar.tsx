// src/components/layout/Sidebar.tsx

import React from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  PlusCircle,
  Map,
  User as UserIcon,
  LogOut,
  Menu,
  Leaf,
} from "lucide-react";
import { useAuthStore } from '@/store/auth-store';
import { cn } from '@/lib/utils';

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/create", label: "New Donation", icon: PlusCircle },
  { href: "/dashboard/track", label: "Track Donations", icon: Map },
  { href: "/dashboard/profile", label: "Profile", icon: UserIcon },
];

/**
 * @component NavContent
 * @description Renders the navigation links and user profile section for the sidebar.
 */
const NavContent: React.FC = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  const isLinkActive = (path: string) => {
    // Exact match for dashboard, startsWith for tracking sub-routes
    return path === "/dashboard/track" 
      ? location.pathname.startsWith(path) 
      : location.pathname === path;
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <NavLink to="/" className="flex items-center gap-2 font-semibold">
          <Leaf className="h-6 w-6 text-emerald-600" />
          <span className="">Food Rescue</span>
        </NavLink>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                isLinkActive(item.href) && "bg-muted text-primary"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto border-t p-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={user?.image} alt={user?.fullName} />
            <AvatarFallback>{user?.fullName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold">{user?.fullName}</span>
            <span className="text-xs text-muted-foreground">{user?.email}</span>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto" onClick={logout} aria-label="Log out">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};


/**
 * @component Sidebar
 * @description The main sidebar component, which is fixed on desktop and a sheet (drawer) on mobile.
 */
export const Sidebar: React.FC = () => {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden border-r bg-background md:block md:w-64">
        <NavContent />
      </aside>

      {/* Mobile Sidebar (Sheet) */}
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <NavContent />
          </SheetContent>
        </Sheet>
        <NavLink to="/" className="flex items-center gap-2 font-semibold md:hidden">
            <Leaf className="h-6 w-6 text-emerald-600" />
            <span className="">Food Rescue</span>
        </NavLink>
      </header>
    </>
  );
};