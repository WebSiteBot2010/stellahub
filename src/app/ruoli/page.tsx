import { Navbar } from "@/components/Navbar";
import { AuthGuard } from "@/components/AuthGuard";
import { Shield } from "lucide-react";

const RUOLI = [
  {
    categoria: "Staff",
    colore: "#ef4444",
    ruoli: [
      { nome: "👑 Founder", desc: "Fondatore del server", come: "Non ottenibile" },
      { nome: "⚡ Co-Owner", desc: "Co-proprietario del server", come: "Non ottenibile" },
      { nome: "🛡️ Admin", desc: "Amministratore del server", come: "Per meriti speciali" },
      { nome: "⚔️ Moderatore", desc: "Gestisce il server e le regole", come: "Candidatura" },
      { nome: "🤝 Helper", desc: "Supporta i nuovi utenti", come: "Candidatura" },
    ],
  },
  {
    categoria: "Livello",
    colore: "#5865f2",
    ruoli: [
      { nome: "🌟 Legend", desc: "Livello 300+", come: "Raggiungi il livello 300" },
      { nome: "💎 Elite", desc: "Livello 200+", come: "Raggiungi il livello 200" },
      { nome: "🔥 Veteran", desc: "Livello 100+", come: "Raggiungi il livello 100" },
      { nome: "⭐ Senior", desc: "Livello 50+", come: "Raggiungi il livello 50" },
      { nome: "✨ Member", desc: "Livello 10+", come: "Raggiungi il livello 10" },
    ],
  },
  {
    categoria: "Speciali",
    colore: "#22c55e",
    ruoli: [
      { nome: "🗳️ Voter", desc: "Ha votato il server nelle ultime 12h", come: "Vota il server" },
      { nome: "🎮 Gamer", desc: "Appassionato di gaming", come: "Reagisci nel canale ruoli" },
      { nome: "🎵 Music Lover", desc: "Amante della musica", come: "Reagisci nel canale ruoli" },
      { nome: "🎨 Creative", desc: "Persona creativa", come: "Reagisci nel canale ruoli" },
      { nome: "📸 Content Creator", desc: "Crea contenuti online", come: "Reagisci nel canale ruoli" },
    ],
  },
];

export default function RuoliPage() {
  return (
    <>
      <Navbar />
      <main className="pt-14 min-h-screen noise">
        <AuthGuard>
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-brand-green" />
              </div>
              <h1 className="text-3xl font-display font-extrabold text-white mb-2">Ruoli del Server</h1>
              <p className="text-brand-muted font-body">Scopri tutti i ruoli disponibili e come ottenerli</p>
            </div>

            <div className="space-y-8">
              {RUOLI.map((cat) => (
                <div key={cat.categoria}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-6 rounded-full" style={{ backgroundColor: cat.colore }} />
                    <h2 className="font-display font-bold text-white text-xl">{cat.categoria}</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {cat.ruoli.map((ruolo) => (
                      <div key={ruolo.nome} className="bg-brand-surface border border-brand-border rounded-2xl p-4 card-hover">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <p className="font-display font-semibold text-white">{ruolo.nome}</p>
                          <span
                            className="text-xs font-body px-2 py-0.5 rounded-full whitespace-nowrap"
                            style={{
                              backgroundColor: `${cat.colore}20`,
                              color: cat.colore,
                              border: `1px solid ${cat.colore}30`,
                            }}
                          >
                            {cat.categoria}
                          </span>
                        </div>
                        <p className="text-brand-muted text-sm font-body mb-3">{ruolo.desc}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-brand-muted text-xs font-body">Come ottenerlo:</span>
                          <span className="text-white text-xs font-body font-medium">{ruolo.come}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AuthGuard>
      </main>
    </>
  );
}
