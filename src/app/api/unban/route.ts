import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.discordId) {
    return NextResponse.json({ error: "Non autenticato" }, { status: 401 });
  }
  const discordId = session.user.discordId as string;
  const isBanned = await checkIfBanned(discordId);
  return NextResponse.json({ isBanned, discordId });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.discordId) {
    return NextResponse.json({ error: "Non autenticato" }, { status: 401 });
  }

  const body = await req.json();
  const { reason, proofs } = body;

  if (!reason || reason.trim().length < 20) {
    return NextResponse.json({ error: "Motivo troppo breve (min 20 caratteri)" }, { status: 400 });
  }

  const discordId = session.user.discordId as string;

  try {
    await fetch(process.env.DISCORD_WEBHOOK_UNBAN!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: "📋 Nuova Richiesta di Unban",
            color: 0xf59e0b,
            fields: [
              { name: "Utente", value: `<@${discordId}> (${session.user.name})`, inline: true },
              { name: "ID Discord", value: discordId, inline: true },
              { name: "Email", value: session.user.email || "N/A", inline: false },
              { name: "Motivo della Richiesta", value: reason, inline: false },
              { name: "Prove/Link", value: proofs || "Nessuna prova fornita", inline: false },
            ],
            footer: { text: "Sollary Unban System" },
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    return NextResponse.json({ success: true, message: "Richiesta inviata con successo!" });
  } catch (err) {
    return NextResponse.json({ error: "Errore nell'invio della richiesta" }, { status: 500 });
  }
}

async function checkIfBanned(userId: string): Promise<boolean> {
  if (!process.env.DISCORD_BOT_TOKEN || !process.env.DISCORD_GUILD_ID) return false;
  try {
    const res = await fetch(
      `https://discord.com/api/v10/guilds/${process.env.DISCORD_GUILD_ID}/bans/${userId}`,
      { headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` } }
    );
    return res.status === 200;
  } catch {
    return false;
  }
}
