import { Navbar } from "@/components/Navbar";
import { AuthGuard } from "@/components/AuthGuard";
import { BookMarked } from "lucide-react";

const SEZIONI = [
  {
    titolo: "Chi Siamo",
    icona: "🏠",
    contenuto:
      "Sollary nasce nel 2021 come piccolo server Discord italiano con l'obiettivo di creare uno spazio sicuro e inclusivo per gli appassionati di gaming e intrattenimento. Oggi siamo cresciuti fino a diventare una delle community italiane più grandi e attive, con oltre 74.000 membri.",
  },
  {
    titolo: "La Nostra Missione",
    icona: "🎯",
    contenuto:
      "La nostra missione è creare un ambiente sano, divertente e accogliente per tutti. Vogliamo essere il punto di riferimento per la community gaming italiana, offrendo eventi, tornei, contenuti esclusivi e un team di staff sempre disponibile.",
  },
  {
    titolo: "Cosa Facciamo",
    icona: "⚡",
    contenuto:
      "Organizziamo eventi gaming settimanali, tornei competitivi, giveaway esclusivi per i nostri membri più attivi. Abbiamo canali dedicati a tantissimi giochi: Minecraft, Fortnite, Valorant, League of Legends, GTA e molti altri.",
  },
  {
    titolo: "Il Nostro Team",
    icona: "👥",
    contenuto:
      "Il team di Sollary è composto da moderatori, helper, event manager e admin tutti volontari appassionati che dedicano il loro tempo libero per rendere la community migliore ogni giorno. Siamo sempre alla ricerca di nuove persone motivate da inserire nel team.",
  },
  {
    titolo: "Sistema di Livelli",
    icona: "📈",
    contenuto:
      "Abbiamo un sistema di livelli personalizzato che premia i membri più attivi. Ogni messaggio inviato nei canali ti guadagna esperienza. Salendo di livello sblocchi ruoli speciali, accesso a canali esclusivi e moltiplicatori EXP più alti. Il livello più alto attuale è 403!",
  },
  {
    titolo: "Come Partecipare",
    icona: "🚀",
    contenuto:
      "Entra nel nostro server Discord, presentati nel canale apposito, leggi le regole e comincia a interagire con la community! Vota il server ogni 24 ore per supportarci e guadagnare ricompense. Se vuoi contribuire attivamente, candidati come staff o proponi una partnership.",
  },
  {
    titolo: "Partnership & Sponsor",
    icona: "🤝",
    contenuto:
      "Siamo aperti a collaborazioni con brand, creator, altri server e aziende che condividono i nostri valori. Offriamo visibilità verso oltre 74.000 italiani appassionati di gaming. Contattaci tramite il modulo di partnership per maggiori informazioni.",
  },
  {
    titolo: "Contatti & Social",
    icona: "📱",
    contenuto:
      "Puoi trovarci su Discord (il nostro canale principale), TikTok, Instagram e YouTube. Seguici per non perderti eventi, giveaway e contenuti esclusivi. Per richieste ufficiali usa il sistema di ticket nel server o il modulo di partnership sul sito.",
  },
];

export default function WikiPage() {
  return (
    <>
      <Navbar />
      <main className="pt-14 min-h-screen noise">
        <AuthGuard>
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-brand-pink/10 border border-brand-pink/20 flex items-center justify-center mx-auto mb-4">
                <BookMarked className="w-8 h-8 text-brand-pink" />
              </div>
              <h1 className="text-3xl font-display font-extrabold text-white mb-2">Wiki Sollary</h1>
              <p className="text-brand-muted font-body">Tutto quello che devi sapere sulla nostra community</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {SEZIONI.map((s, i) => (
                <div
                  key={s.titolo}
                  className="fade-in-up bg-brand-surface border border-brand-border rounded-2xl p-6 card-hover"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{s.icona}</span>
                    <h2 className="font-display font-bold text-white text-lg">{s.titolo}</h2>
                  </div>
                  <p className="text-brand-muted font-body text-sm leading-relaxed">{s.contenuto}</p>
                </div>
              ))}
            </div>
          </div>
        </AuthGuard>
      </main>
    </>
  );
}
