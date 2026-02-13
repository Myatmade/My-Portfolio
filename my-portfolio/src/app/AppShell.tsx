import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useScrollNavigation } from "../hooks/useScrollNavigation";

export default function AppShell() {
  useScrollNavigation();

  return (
    <div className="relative min-h-screen">
      <Sidebar />

      <main className="min-h-screen relative z-10">
        <div className="p-5 md:p-10 pt-20">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
