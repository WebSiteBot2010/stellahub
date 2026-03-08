import { Navbar } from "@/components/Navbar";
import { AuthGuard } from "@/components/AuthGuard";
import { BookOpen } from "lucide-react";

const REGOLE = [
  {
    num: "§1",
    titolo: "Rispetto reciproco",
    desc: "È obbligatorio mantenere un comportamento rispettoso verso tutti i membri. Insulti, offese, discriminazioni di qualsiasi tipo non sono tollerati.",
  },
  {
    num: "§2",
    titolo: "Niente spam",
    desc: "È vietato spammare messaggi, emoji, menzioni eccessive o contenuti ripetuti. Questo include anche i canali voice.",
  },
  {
    num: "§3",
    titolo: "Contenuti appropriati",
    desc: "Qualsiasi contenuto NSFW, violento, illegale o inappropriato è strettamente vietato su tutti i canali del server.",
  },
  {
    num: "§4",
    titolo: "No pubblicità non autorizzata",
    desc: "È vietato pubblicizzare altri server Discord, social, canali YouTube o qualsiasi altra piattaforma senza previa autorizzazione dello staff.",
  },
  {
    num: "§5",
    titolo: "No account multipli",
    desc: "È vietato utilizzare account Discord multipli per aggirare ban o altri provvedimenti disciplinari.",
  },
  {
    num: "§6",
    titolo: "Rispetta i canali",
    desc: "Ogni canale ha il suo scopo specifico. Rispetta le categorie e non postare contenuti fuori tema.",
  },
  {
    num: "§7",
    titolo: "Segui le istruzioni dello Staff",
    desc: "Lo staff ha l'autorità di gestire il server. Seguire le loro indicazioni è obbligatorio. In caso di abusi, contattare l'amministrazione.",
  },
  {
    num: "§8",
    titolo: "Privacy",
    desc: "È vietato condividere informazioni personali di altri utenti senza il loro consenso esplicito.",
  },
];

export default function RegolePage() {
  return (
    <>
      <Navbar />
      <main className="pt-14 min-h-screen noise">
        <AuthGuard>
          <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-brand-purple" />
              </div>
              <h1 className="text-3xl font-display font-extrabold text-white mb-2">Regolamento</h1>
              <p className="text-brand-muted font-body">
                Queste regole si applicano a tutti i canali del server Sollary. La loro violazione può comportare sanzioni.
              </p>
            </div>

            <div className="space-y-4">
              {REGOLE.map((regola, i) => (
                <div
                  key={regola.num}
                  className="fade-in-up bg-brand-surface border border-brand-border rounded-2xl p-5 card-hover flex gap-5"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center">
                    <span className="font-display font-bold text-brand-purple text-sm">{regola.num}</span>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white mb-1">{regola.titolo}</h3>
                    <p className="text-brand-muted font-body text-sm leading-relaxed">{regola.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 rounded-2xl bg-brand-red/10 border border-brand-red/20 text-center">
              <p className="text-brand-red font-display font-semibold mb-1">⚠️ Attenzione</p>
              <p className="text-brand-muted font-body text-sm">
                Lo staff si riserva il diritto di prendere provvedimenti disciplinari anche per comportamenti non esplicitamente elencati qui ma ritenuti dannosi per la community.
              </p>
            </div>
          </div>
        </AuthGuard>
      </main>
    </>
  );
}
