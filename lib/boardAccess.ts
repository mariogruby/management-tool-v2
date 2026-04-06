import db from "@/lib/db";

/**
 * Check if a user (by DB id) has access to a board (owner or member).
 */
export async function hasBoardAccess(userId: string, boardId: string): Promise<boolean> {
  const board = await db.board.findFirst({
    where: {
      id: boardId,
      OR: [
        { userId },
        { members: { some: { userId } } },
      ],
    },
    select: { id: true },
  });
  return !!board;
}

/**
 * Check if a user is the owner of a board.
 */
export async function isBoardOwner(userId: string, boardId: string): Promise<boolean> {
  const board = await db.board.findFirst({
    where: { id: boardId, userId },
    select: { id: true },
  });
  return !!board;
}
