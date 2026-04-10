import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import db from "@/lib/db";
import { hasBoardAccess } from "@/lib/boardAccess";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ taskId: string }> }
) {
  const { taskId } = await params;
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const comments = await db.comment.findMany({
    where: { taskId },
    include: { user: { select: { name: true, email: true } } },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(comments);
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ taskId: string }> }
) {
  const { taskId } = await params;
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { content } = await req.json();
  if (!content?.trim()) return NextResponse.json({ error: "Content is required" }, { status: 400 });

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const task = await db.task.findUnique({
    where: { id: taskId },
    include: { list: { include: { board: true } } },
  });
  if (!task) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const allowed = await hasBoardAccess(user.id, task.list.board.id);
  if (!allowed) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const comment = await db.comment.create({
    data: { content: content.trim(), taskId, userId: user.id },
    include: { user: { select: { name: true, email: true } } },
  });

  // Notify assignees (skip the commenter)
  const assignees = await db.taskAssignee.findMany({
    where: { taskId, userId: { not: user.id } },
    select: { userId: true },
  });
  if (assignees.length > 0) {
    const actorName = user.name ?? user.email;
    await db.notification.createMany({
      data: assignees.map((a) => ({
        type: "comment",
        message: `${actorName} comentó en la tarea "${task.title}"`,
        userId: a.userId,
        boardId: task.list.board.id,
        taskId,
      })),
    });
  }

  return NextResponse.json(comment, { status: 201 });
}
