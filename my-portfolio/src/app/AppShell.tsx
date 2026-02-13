import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useScrollNavigation } from "../hooks/useScrollNavigation";

export default function AppShell() {
  useScrollNavigation();

  return (
    <div className="relative min-h-screen">
      <Sidebar />

      <main className="min-h-screen relative z-10">
        <div className="p-4 md:p-8 pt-16">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
