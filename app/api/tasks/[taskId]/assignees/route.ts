import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import db from "@/lib/db";
import { isBoardOwner } from "@/lib/boardAccess";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ taskId: string }> }
) {
  const { taskId } = await params;
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const task = await db.task.findUnique({
    where: { id: taskId },
    include: { list: { include: { board: true } } },
  });
  if (!task) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const isOwner = await isBoardOwner(user.id, task.list.board.id);
  if (!isOwner) return NextResponse.json({ error: "Only the board owner can assign members" }, { status: 403 });

  const { assigneeId } = await req.json();

  const existing = await db.taskAssignee.findUnique({
    where: { taskId_userId: { taskId, userId: assigneeId } },
  });

  if (existing) {
    await db.taskAssignee.delete({ where: { taskId_userId: { taskId, userId: assigneeId } } });
    return NextResponse.json({ active: false });
  } else {
    await db.taskAssignee.create({ data: { taskId, userId: assigneeId } });

    // Notify the assignee (skip if assigning themselves)
    if (assigneeId !== user.id) {
      const actorName = user.name ?? user.email;
      await db.notification.create({
        data: {
          type: "assigned",
          message: `${actorName} te asignó la tarea "${task.title}"`,
          userId: assigneeId,
          boardId: task.list.board.id,
          taskId,
        },
      });
    }

    return NextResponse.json({ active: true });
  }
}
