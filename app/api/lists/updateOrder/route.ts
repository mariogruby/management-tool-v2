import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PATCH(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { boardId, lists } = await req.json();

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const board = await db.board.findUnique({ where: { id: boardId, userId: user.id } });
  if (!board) return NextResponse.json({ error: "Board not found" }, { status: 404 });

  await db.$transaction(
    lists.map(({ id, order }: { id: string; order: number }) =>
      db.list.update({ where: { id }, data: { order } })
    )
  );

  return NextResponse.json({ success: true });
}
