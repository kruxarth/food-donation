import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppLayout } from "./components/layout/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import CreateDonationPage from "./pages/CreateDonationPage";
import ProfilePage from "./pages/ProfilePage";
import TrackingPage from "./pages/TrackingPage";

const queryClient = new QueryClient();

function App() {
  return (
   <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/create" element={<CreateDonationPage />} />
            <Route path="/dashboard/profile" element={<ProfilePage />} />
            <Route path="/dashboard/track/:id" element={<TrackingPage />} />
          </Route>
          
          {/* Redirect root to dashboard
          <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
        </Routes>
      </Router>
    </QueryClientProvider>

    
  );
}

export default App;
