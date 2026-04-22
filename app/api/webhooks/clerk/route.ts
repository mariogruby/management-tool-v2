import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import db from "@/lib/db";

type ClerkUserDeletedEvent = {
  type: "user.deleted";
  data: { id: string; deleted: boolean };
};

export async function POST(req: Request) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Missing webhook secret" }, { status: 500 });
  }

  const headersList = await headers();
  const svix_id = headersList.get("svix-id");
  const svix_timestamp = headersList.get("svix-timestamp");
  const svix_signature = headersList.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
  }

  const body = await req.text();

  let event: ClerkUserDeletedEvent;
  try {
    const wh = new Webhook(secret);
    event = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as ClerkUserDeletedEvent;
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "user.deleted" && event.data.deleted) {
    const clerkId = event.data.id;
    await db.user.deleteMany({ where: { clerkId } });
  }

  return NextResponse.json({ received: true });
}
