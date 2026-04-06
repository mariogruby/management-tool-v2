import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { CreateBoardModal } from "./components/boards/CreateBoardModal/CreateBoardModal";
import { BoardList } from "./components/boards/BoardList/BoardList";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const user = await db.user.findUnique({ where: { clerkId: userId } });

  if (!user) redirect("/sign-in");

  const boards = await db.board.findMany({
    where: {
      OR: [
        { userId: user.id },
        { members: { some: { userId: user.id } } },
      ],
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Mis boards</h1>
        <CreateBoardModal />
      </div>
      <BoardList boards={boards} />
    </div>
  );
}
