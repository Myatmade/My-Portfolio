import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function AppShell() {
  return (
    <div className="relative min-h-screen">
      <Sidebar />

      <main className="min-h-screen relative z-10">
        <div className="p-4 md:p-8 pt-16 md:pt-20 lg:pt-24">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
