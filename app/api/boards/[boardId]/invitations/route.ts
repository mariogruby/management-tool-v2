import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import db from "@/lib/db";

const resend = new Resend(process.env.RESEND_API_KEY);

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

  const [members, invitations] = await Promise.all([
    db.boardMember.findMany({
      where: { boardId },
      include: { user: { select: { name: true, email: true } } },
      orderBy: { createdAt: "asc" },
    }),
    db.invitation.findMany({
      where: { boardId, status: "pending" },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return NextResponse.json({ members, invitations });
}

export async function POST(
  req: Request,
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

  const { email } = await req.json();
  if (!email?.trim()) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();

  // Check if already a member
  const existingMember = await db.user.findUnique({
    where: { email: normalizedEmail },
  });
  if (existingMember) {
    const alreadyMember = await db.boardMember.findUnique({
      where: { boardId_userId: { boardId, userId: existingMember.id } },
    });
    if (alreadyMember || existingMember.id === user.id) {
      return NextResponse.json({ error: "Already a member" }, { status: 409 });
    }
  }

  // Check for existing pending invitation
  const existing = await db.invitation.findFirst({
    where: { boardId, email: normalizedEmail, status: "pending" },
  });
  if (existing) {
    return NextResponse.json({ error: "Already invited" }, { status: 409 });
  }

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  const invitation = await db.invitation.create({
    data: { email: normalizedEmail, boardId, expiresAt },
  });

  const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL}/invite/${invitation.token}`;

  await resend.emails.send({
    from: "no-reply@easypostool.com",
    to: normalizedEmail,
    subject: `${user.name ?? user.email} te invita a "${board.title}"`,
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px">
        <h2 style="margin-bottom:8px">Te han invitado a un board</h2>
        <p style="color:#555;margin-bottom:24px">
          <strong>${user.name ?? user.email}</strong> te ha invitado a colaborar en el board
          <strong>"${board.title}"</strong>.
        </p>
        <a href="${inviteUrl}"
           style="display:inline-block;background:#000;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">
          Aceptar invitación
        </a>
        <p style="color:#999;font-size:12px;margin-top:24px">
          Este enlace expira en 7 días.
        </p>
      </div>
    `,
  });

  return NextResponse.json(invitation, { status: 201 });
}
