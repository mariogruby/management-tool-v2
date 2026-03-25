import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, description, color, lists } = await req.json();

  if (!title || typeof title !== "string" || !title.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  let user = await db.user.findUnique({ where: { clerkId: userId } });

  if (!user) {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    user = await db.user.create({
      data: {
        clerkId: userId,
        email: clerkUser.emailAddresses[0].emailAddress,
        name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() || null,
      },
    });
  }

  const validLists: string[] = Array.isArray(lists)
    ? lists.filter((l: unknown) => typeof l === "string" && l.trim())
    : [];

  const board = await db.board.create({
    data: {
      title: title.trim(),
      userId: user.id,
      description: typeof description === "string" && description.trim() ? description.trim() : null,
      color: typeof color === "string" && color ? color : null,
      list: validLists.length > 0
        ? {
            createMany: {
              data: validLists.map((l, i) => ({
                title: l.trim(),
                order: i,
              })),
            },
          }
        : undefined,
    },
  });

  return NextResponse.json(board, { status: 201 });
}
