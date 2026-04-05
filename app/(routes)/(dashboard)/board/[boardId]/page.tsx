import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { BoardContent } from "./components/BoardContent/BoardContent";
import { BoardHeader } from "./components/BoardHeader/BoardHeader";

interface BoardPageProps {
  params: Promise<{ boardId: string }>;
}

export default async function BoardPage({ params }: BoardPageProps) {
  const { boardId } = await params;
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const user = await db.user.findUnique({ where: { clerkId: userId } });

  if (!user) redirect("/sign-in");

  const board = await db.board.findUnique({
    where: { id: boardId, userId: user.id },
    include: {
      list: {
        orderBy: { order: "asc" },
        include: {
          tasks: {
            orderBy: { order: "asc" },
            include: { labels: { include: { label: true } } },
          },
        },
      },
    },
  });

  if (!board) redirect("/dashboard");

  return (
    <div className="flex flex-col h-full p-6 gap-6">
      <BoardHeader boardId={board.id} title={board.title} />
      <BoardContent lists={board.list} boardId={board.id} />
    </div>
  );
}
