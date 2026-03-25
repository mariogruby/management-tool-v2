import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./dashboard/components/Sidebar";
import { Navbar } from "./dashboard/components/Navbar/Navbar";

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col flex-1 min-h-screen w-full overflow-auto">
        <Navbar />
        {children}
      </main>
    </SidebarProvider>
  );
}
