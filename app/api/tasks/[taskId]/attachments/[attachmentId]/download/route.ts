import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ taskId: string; attachmentId: string }> }
) {
  const { taskId, attachmentId } = await params;
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const attachment = await db.attachment.findUnique({
    where: { id: attachmentId },
    include: { task: { include: { list: { include: { board: true } } } } },
  });

  if (
    !attachment ||
    attachment.taskId !== taskId ||
    attachment.task.list.board.userId !== user.id
  ) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const response = await fetch(attachment.url, {
    headers: {
      Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
    },
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Failed to fetch file" }, { status: 502 });
  }

  const contentType = response.headers.get("content-type") ?? "application/octet-stream";

  return new Response(response.body, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `inline; filename="${attachment.filename}"`,
    },
  });
}
