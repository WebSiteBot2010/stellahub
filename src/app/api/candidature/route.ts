import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.discordId) {
    return NextResponse.json({ error: "Non autenticato" }, { status: 401 });
  }

  const body = await req.json();
  const { ruolo, eta, esperienza, motivazione, disponibilita, altro } = body;

  if (!ruolo || !eta || !esperienza || !motivazione) {
    return NextResponse.json({ error: "Compila tutti i campi obbligatori" }, { status: 400 });
  }

  const discordId = session.user.discordId as string;

  try {
    await fetch(process.env.DISCORD_WEBHOOK_CANDIDATURE!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: `📩 Nuova Candidatura - ${ruolo}`,
            color: 0x00d4ff,
            fields: [
              { name: "Candidato", value: `<@${discordId}> (${session.user.name})`, inline: true },
              { name: "ID Discord", value: discordId, inline: true },
              { name: "Ruolo Richiesto", value: ruolo, inline: true },
              { name: "Età", value: eta.toString(), inline: true },
              { name: "Disponibilità", value: disponibilita || "N/A", inline: true },
              { name: "Esperienza", value: esperienza, inline: false },
              { name: "Motivazione", value: motivazione, inline: false },
              { name: "Note Aggiuntive", value: altro || "Nessuna", inline: false },
            ],
            thumbnail: { url: session.user.image || "" },
            footer: { text: "Sollary Staff Application System" },
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    return NextResponse.json({ success: true, message: "Candidatura inviata con successo!" });
  } catch (err) {
    return NextResponse.json({ error: "Errore nell'invio" }, { status: 500 });
  }
}
