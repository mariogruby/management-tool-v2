import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import db from "@/lib/db";
import { hasBoardAccess } from "@/lib/boardAccess";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ listId: string }> }
) {
  const { listId } = await params;
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const list = await db.list.findUnique({
    where: { id: listId },
    include: { board: true },
  });
  if (!list) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const allowed = await hasBoardAccess(user.id, list.board.id);
  if (!allowed) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await db.list.delete({ where: { id: listId } });

  return NextResponse.json({ success: true });
}
