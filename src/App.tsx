// src/App.tsx - Debug version
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Import pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CreateDonationPage from "./pages/CreateDonationPage";
import { UserProfilePage } from "./pages/UserProfilePage";
import TrackingPage from "./pages/TrackingPage";
import { AppLayout } from "./components/layout/AppLayout";

// Create QueryClient with error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        console.log("Query error:", error);
        return failureCount < 2;
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

function App() {
  console.log("App component rendering...");
  
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected Routes */}
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/dashboard/create" element={<CreateDonationPage />} />
              <Route path="/dashboard/profile" element={<UserProfilePage />} />
              <Route path="/dashboard/profile/:id" element={<UserProfilePage />} />
              <Route path="/dashboard/track/:id" element={<TrackingPage />} />
            </Route>
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
      
      {/* Add React Query Devtools for debugging */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;