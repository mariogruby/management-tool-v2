import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import db from "@/lib/db";
import { createActivity } from "@/lib/createActivity";

export async function PATCH(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { items, movedTaskId, fromListId, toListId } = await req.json();

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await db.$transaction(
    items.map(({ id, order, listId }: { id: string; order: number; listId: string }) =>
      db.task.update({ where: { id }, data: { order, listId } })
    )
  );

  // Log only cross-list moves
  if (movedTaskId && fromListId && toListId && fromListId !== toListId) {
    const [task, fromList, toList] = await Promise.all([
      db.task.findUnique({ where: { id: movedTaskId }, select: { title: true, list: { select: { boardId: true } } } }),
      db.list.findUnique({ where: { id: fromListId }, select: { title: true } }),
      db.list.findUnique({ where: { id: toListId }, select: { title: true } }),
    ]);
    if (task && fromList && toList) {
      await createActivity({
        type: "task_moved",
        message: `${user.name ?? user.email} movió "${task.title}" de "${fromList.title}" a "${toList.title}"`,
        boardId: task.list.boardId,
        userId: user.id,
      });
    }
  }

  return NextResponse.json({ success: true });
}
