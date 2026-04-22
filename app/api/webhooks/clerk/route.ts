import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import db from "@/lib/db";

type ClerkEvent =
  | { type: "user.deleted"; data: { id: string; deleted: boolean } }
  | {
      type: "user.updated";
      data: {
        id: string;
        first_name: string | null;
        last_name: string | null;
        email_addresses: { email_address: string }[];
      };
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

  let event: ClerkEvent;
  try {
    const wh = new Webhook(secret);
    event = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as ClerkEvent;
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "user.deleted" && event.data.deleted) {
    await db.user.deleteMany({ where: { clerkId: event.data.id } });
  }

  if (event.type === "user.updated") {
    const { id, first_name, last_name, email_addresses } = event.data;
    const name = `${first_name ?? ""} ${last_name ?? ""}`.trim() || null;
    const email = email_addresses[0]?.email_address;
    await db.user.updateMany({
      where: { clerkId: id },
      data: { name, ...(email && { email }) },
    });
  }

  return NextResponse.json({ received: true });
}
