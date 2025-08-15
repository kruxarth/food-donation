// src/components/layout/AppLayout.tsx

import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { useAuthStore } from "@/store/auth-store";

/**
 * @component AppLayout
 * @description A protected layout component for authenticated users.
 * If the user is not authenticated, it redirects to the login page.
 * Otherwise, it renders the sidebar and the current page's content.
 */
export const AppLayout: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[256px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-muted/40">
          <Outlet /> {/* Renders the matched child route component */}
        </main>
      </div>
    </div>
  );
};