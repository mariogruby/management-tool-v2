import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ taskId: string; commentId: string }> }
) {
  const { taskId, commentId } = await params;
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const comment = await db.comment.findUnique({
    where: { id: commentId },
    include: { task: { include: { list: { include: { board: true } } } } },
  });
  if (!comment || comment.taskId !== taskId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const isAuthor = comment.userId === user.id;
  const isBoardOwner = comment.task.list.board.userId === user.id;
  if (!isAuthor && !isBoardOwner) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await db.comment.delete({ where: { id: commentId } });
  return NextResponse.json({ success: true });
}
