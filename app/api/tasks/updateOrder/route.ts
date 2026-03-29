import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PATCH(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { items } = await req.json();

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await db.$transaction(
    items.map(({ id, order, listId }: { id: string; order: number; listId: string }) =>
      db.task.update({ where: { id }, data: { order, listId } })
    )
  );

  return NextResponse.json({ success: true });
}
