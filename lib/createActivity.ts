import db from "@/lib/db";

export async function createActivity({
  type,
  message,
  boardId,
  userId,
}: {
  type: string;
  message: string;
  boardId: string;
  userId: string;
}) {
  await db.activityLog.create({ data: { type, message, boardId, userId } });
}
