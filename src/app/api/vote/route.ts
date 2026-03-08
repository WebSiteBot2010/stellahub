import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// In-memory store (in produzione usa un DB come PlanetScale/Supabase/Redis)
const voteStore: Record<string, number> = {};
const totalVotes: { count: number } = { count: 2066 };

export async function GET() {
  return NextResponse.json({
    totalVotes: totalVotes.count,
    topVoters: [
      { rank: 1, username: "biglucas", votes: 109 },
      { rank: 2, username: "grande_lungo", votes: 106 },
      { rank: 3, username: "cosmy_97", votes: 78 },
    ],
  });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.discordId) {
    return NextResponse.json({ error: "Non autenticato" }, { status: 401 });
  }

  const discordId = session.user.discordId as string;
  const now = Date.now();
  const lastVote = voteStore[discordId] || 0;
  const cooldown = 24 * 60 * 60 * 1000; // 24 ore

  if (now - lastVote < cooldown) {
    const remaining = cooldown - (now - lastVote);
    const hours = Math.floor(remaining / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);
    return NextResponse.json(
      { error: `Puoi votare di nuovo tra ${hours}h ${minutes}m` },
      { status: 429 }
    );
  }

  // Registra voto
  voteStore[discordId] = now;
  totalVotes.count++;

  // Invia webhook Discord
  try {
    await fetch(process.env.DISCORD_WEBHOOK_VOTE!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: "🗳️ Nuovo Voto Ricevuto!",
            color: 0x5865f2,
            fields: [
              { name: "Utente", value: `<@${discordId}> (${session.user.name})`, inline: true },
              { name: "Voti Totali", value: totalVotes.count.toString(), inline: true },
              { name: "Timestamp", value: new Date().toLocaleString("it-IT"), inline: false },
            ],
            footer: { text: "Sollary Vote System" },
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    // Assegna ruolo Voter per 12h
    await assignVoterRole(discordId);

    // Rimuovi ruolo dopo 12h
    setTimeout(async () => {
      await removeVoterRole(discordId);
    }, 12 * 60 * 60 * 1000);
  } catch (err) {
    console.error("Webhook/Role error:", err);
  }

  return NextResponse.json({
    success: true,
    message: "Voto registrato! Hai ricevuto 200 XP e il ruolo Voter per 12h.",
    nextVote: new Date(now + cooldown).toISOString(),
  });
}

async function assignVoterRole(userId: string) {
  if (!process.env.DISCORD_BOT_TOKEN || !process.env.DISCORD_GUILD_ID || !process.env.DISCORD_VOTER_ROLE_ID) return;
  await fetch(
    `https://discord.com/api/v10/guilds/${process.env.DISCORD_GUILD_ID}/members/${userId}/roles/${process.env.DISCORD_VOTER_ROLE_ID}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
}

async function removeVoterRole(userId: string) {
  if (!process.env.DISCORD_BOT_TOKEN || !process.env.DISCORD_GUILD_ID || !process.env.DISCORD_VOTER_ROLE_ID) return;
  await fetch(
    `https://discord.com/api/v10/guilds/${process.env.DISCORD_GUILD_ID}/members/${userId}/roles/${process.env.DISCORD_VOTER_ROLE_ID}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
    }
  );
}
