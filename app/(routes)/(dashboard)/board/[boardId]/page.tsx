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

  const board = await db.board.findFirst({
    where: {
      id: boardId,
      OR: [{ userId: user.id }, { members: { some: { userId: user.id } } }],
    },
    include: {
      members: {
        include: { user: { select: { id: true, name: true, email: true } } },
      },
      list: {
        orderBy: { order: "asc" },
        include: {
          tasks: {
            orderBy: { order: "asc" },
            include: {
              labels: { include: { label: true } },
              assignees: {
                include: {
                  user: { select: { id: true, name: true, email: true } },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!board) redirect("/dashboard");

  const isOwner = board.userId === user.id;

  // Owner + members as assignable users (owner comes from the current user if they are owner)
  const ownerUser = { id: user.id, name: user.name, email: user.email };
  const memberUsers = board.members.map((m) => ({
    id: m.user.id,
    name: m.user.name,
    email: m.user.email,
  }));
  const boardUsers = isOwner
    ? [ownerUser, ...memberUsers]
    : memberUsers.some((m) => m.id === user.id)
      ? [ownerUser, ...memberUsers]
      : memberUsers;

  return (
    <div className="flex flex-col h-full p-6 gap-6">
      <BoardHeader boardId={board.id} title={board.title} />
      <BoardContent
        lists={board.list}
        boardId={board.id}
        isOwner={isOwner}
        boardUsers={boardUsers}
      />
    </div>
  );
}
