import { currentUser } from "@clerk/nextjs/server";
import db from "@/lib/db";

export async function getOrCreateUser(clerkId: string) {
  const existing = await db.user.findUnique({ where: { clerkId } });
  if (existing) return existing;

  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  return db.user.create({
    data: {
      clerkId,
      email: clerkUser.emailAddresses[0].emailAddress,
      name:
        `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() ||
        null,
    },
  });
}
