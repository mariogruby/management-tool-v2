import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import db from "@/lib/db";
import { hasBoardAccess } from "@/lib/boardAccess";

export interface BoardLink {
  id: string;
  label: string;
  url: string;
}

type Params = { params: Promise<{ boardId: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { boardId } = await params;
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const allowed = await hasBoardAccess(user.id, boardId);
  if (!allowed) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const board = await db.board.findUnique({ where: { id: boardId }, select: { links: true } });
  return NextResponse.json((board?.links ?? []) as BoardLink[]);
}

export async function PUT(req: Request, { params }: Params) {
  const { boardId } = await params;
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const board = await db.board.findUnique({ where: { id: boardId } });
  if (!board || board.userId !== user.id)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const links: BoardLink[] = await req.json();
  const updated = await db.board.update({
    where: { id: boardId },
    data: { links },
    select: { links: true },
  });

  return NextResponse.json(updated.links);
}
