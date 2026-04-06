import { auth } from "@clerk/nextjs/server";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./dashboard/components/Sidebar";
import { Navbar } from "./dashboard/components/Navbar/Navbar";
import { BoardsStoreInitializer } from "./dashboard/components/BoardsStoreInitializer/BoardsStoreInitializer";
import db from "@/lib/db";

export default async function LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  const boards = await (async () => {
    if (!userId) return [];
    const user = await db.user.findUnique({ where: { clerkId: userId } });
    if (!user) return [];
    return db.board.findMany({
      where: {
        OR: [
          { userId: user.id },
          { members: { some: { userId: user.id } } },
        ],
      },
      orderBy: { createdAt: "desc" },
    });
  })();

  return (
    <SidebarProvider>
      <BoardsStoreInitializer boards={boards} />
      <AppSidebar />
      <main className="flex flex-col flex-1 min-h-screen w-full overflow-auto">
        <Navbar />
        {children}
      </main>
    </SidebarProvider>
  );
}
