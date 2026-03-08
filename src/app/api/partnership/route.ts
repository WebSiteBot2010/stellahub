import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// Invia richiesta partnership
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action } = body;

  // Staff: accetta o rifiuta partnership
  if (action === "accept" || action === "reject") {
    return handleStaffAction(req, body);
  }

  // Utente: invia nuova richiesta
  return handleNewRequest(body);
}

async function handleNewRequest(body: any) {
  const { nome, cognome, email, telefono, sito, budget, messaggio } = body;

  if (!nome || !email || !messaggio) {
    return NextResponse.json({ error: "Campi obbligatori mancanti" }, { status: 400 });
  }

  try {
    await fetch(process.env.DISCORD_WEBHOOK_PARTNERSHIP!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: "🤝 Nuova Richiesta di Partnership",
            color: 0x7c3aed,
            fields: [
              { name: "Nome", value: `${nome} ${cognome || ""}`.trim(), inline: true },
              { name: "Email", value: email, inline: true },
              { name: "Telefono", value: telefono || "N/A", inline: true },
              { name: "Sito Web", value: sito || "N/A", inline: true },
              { name: "Budget Mensile", value: budget || "N/A", inline: true },
              { name: "Messaggio", value: messaggio, inline: false },
            ],
            footer: { text: "Sollary Partnership System • Usa /accetta o /rifiuta" },
            timestamp: new Date().toISOString(),
          },
        ],
        components: [
          {
            type: 1,
            components: [
              {
                type: 2,
                style: 3,
                label: "✅ Accetta",
                custom_id: `partnership_accept_${Date.now()}`,
              },
              {
                type: 2,
                style: 4,
                label: "❌ Rifiuta",
                custom_id: `partnership_reject_${Date.now()}`,
              },
            ],
          },
        ],
      }),
    });

    return NextResponse.json({ success: true, message: "Richiesta inviata! Ti risponderemo entro 48h." });
  } catch (err) {
    return NextResponse.json({ error: "Errore nell'invio" }, { status: 500 });
  }
}

async function handleStaffAction(req: NextRequest, body: any) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.discordId) {
    return NextResponse.json({ error: "Non autenticato" }, { status: 401 });
  }

  const { action, partnerData, description } = body;

  if (action === "accept" && description) {
    // Pubblica nel canale partnership
    await fetch(process.env.DISCORD_WEBHOOK_PARTNERSHIP_PUBLISH!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: "🎉 Nuova Partnership Ufficiale!",
            description: description,
            color: 0x22c55e,
            fields: partnerData
              ? [
                  { name: "Partner", value: partnerData.nome || "N/A", inline: true },
                  { name: "Sito", value: partnerData.sito || "N/A", inline: true },
                ]
              : [],
            footer: { text: "Sollary Partnership • Benvenuti nella famiglia!" },
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });
    return NextResponse.json({ success: true, message: "Partnership pubblicata!" });
  }

  return NextResponse.json({ success: true, message: "Azione registrata." });
}
