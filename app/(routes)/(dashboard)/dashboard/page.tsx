import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { CreateBoardModal } from "./components/boards/CreateBoardModal/CreateBoardModal";
import { BoardList } from "./components/boards/BoardList/BoardList";
import { DashboardStats } from "./components/DashboardStats/DashboardStats";

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

  const boardIds = boards.map((b) => b.id);

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1));
  startOfWeek.setHours(0, 0, 0, 0);

  const [totalPending, overdue, completedThisWeek] = await Promise.all([
    db.task.count({
      where: {
        completed: false,
        list: { boardId: { in: boardIds } },
      },
    }),
    db.task.count({
      where: {
        completed: false,
        dueDate: { lt: now },
        list: { boardId: { in: boardIds } },
      },
    }),
    db.task.count({
      where: {
        completed: true,
        updatedAt: { gte: startOfWeek },
        list: { boardId: { in: boardIds } },
      },
    }),
  ]);

  return (
    <div className="p-3 sm:p-6 flex flex-col gap-6">
      <DashboardStats
        totalPending={totalPending}
        overdue={overdue}
        completedThisWeek={completedThisWeek}
        totalBoards={boards.length}
      />

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="text-lg font-semibold">Mis boards</h2>
          <CreateBoardModal />
        </div>
        <BoardList boards={boards} />
      </div>
    </div>
  );
}
