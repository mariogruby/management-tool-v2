import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import db from "@/lib/db";

// GET — obtener labels del board
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ boardId: string }> }
) {
  const { boardId } = await params;
  const { userId } = await auth();

  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const board = await db.board.findUnique({ where: { id: boardId } });
  if (!board || board.userId !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const labels = await db.label.findMany({
    where: { boardId },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(labels);
}

// POST — crear label
export async function POST(
  req: Request,
  { params }: { params: Promise<{ boardId: string }> }
) {
  const { boardId } = await params;
  const { userId } = await auth();

  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, color } = await req.json();

  if (!color) return NextResponse.json({ error: "Color is required" }, { status: 400 });

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const board = await db.board.findUnique({ where: { id: boardId } });
  if (!board || board.userId !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const label = await db.label.create({
    data: { title: title?.trim() || "", color, boardId },
  });

  return NextResponse.json(label, { status: 201 });
}
