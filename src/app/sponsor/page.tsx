"use client";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Megaphone, Users, MessageSquare, Globe, TrendingUp, Send, CheckCircle, AlertCircle, Loader2, Star, Zap, Handshake } from "lucide-react";

const STATS = [
  { label: "Utenti Totali", value: "66.000+", icon: Users },
  { label: "Messaggi/Giorno", value: "10.000+", icon: MessageSquare },
  { label: "Messaggi Totali", value: "1.000.000+", icon: TrendingUp },
  { label: "Paese", value: "Italia", icon: Globe },
];

const PERCHE = [
  {
    titolo: "Engagement Reale",
    desc: "Oltre 66.000 utenti attivi che interagiscono quotidianamente. Nessun bot, nessuna interazione falsa.",
    icona: Zap,
    colore: "brand-accent",
  },
  {
    titolo: "Audience Qualificata",
    desc: "Community italiana di qualità, età media 16-30, appassionati di gaming e intrattenimento digitale.",
    icona: Star,
    colore: "brand-cyan",
  },
  {
    titolo: "ROI Misurabile",
    desc: "Analytics dettagliati su ogni campagna. Saprai esattamente quanto ha reso la tua collaborazione.",
    icona: TrendingUp,
    colore: "brand-purple",
  },
];

const OPPORTUNITA = [
  {
    titolo: "Canale Sponsor Dedicato",
    desc: "Spazio fisso e caratterizzato per il tuo brand: visibile a tutti i 66.000 membri 24/7.",
    icona: "📢",
  },
  {
    titolo: "Annunci Mirati",
    desc: "Post programmaticati nei canali tematici e notifiche push verso i segmenti di utenza rilevanti.",
    icona: "🎯",
  },
  {
    titolo: "Partnership a Lungo Termine",
    desc: "Collaborazioni continuative con vantaggi esclusivi e sconti fedeltà per i partner consolidati.",
    icona: "🤝",
  },
];

const BUDGET_OPTIONS = [
  "Seleziona un range",
  "< €100/mese",
  "€100 - €300/mese",
  "€300 - €500/mese",
  "€500 - €1.000/mese",
  "> €1.000/mese",
  "Da concordare",
];

export default function SponsorPage() {
  const [form, setForm] = useState({
    nome: "", cognome: "", email: "", telefono: "",
    sito: "", budget: "", messaggio: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async () => {
    if (!form.nome || !form.email || !form.messaggio) {
      setResult({ type: "error", message: "Nome, email e messaggio sono obbligatori" });
      return;
    }
    setSubmitting(true);
    setResult(null);
    const res = await fetch("/api/partnership", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setResult({ type: res.ok ? "success" : "error", message: data.message || data.error });
    setSubmitting(false);
    if (res.ok) setForm({ nome: "", cognome: "", email: "", telefono: "", sito: "", budget: "", messaggio: "" });
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-body text-sm placeholder:text-white/30 focus:outline-none focus:border-brand-accent/50 transition-colors";

  return (
    <>
      <Navbar />
      <main className="pt-14 min-h-screen noise">
        {/* Hero */}
        <section className="relative py-24 px-4 text-center overflow-hidden bg-gradient-to-br from-brand-purple/20 via-transparent to-brand-accent/10">
          <div className="absolute inset-0 bg-gradient-radial from-brand-purple/10 via-transparent to-transparent" />
          <div className="relative max-w-3xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-brand-purple/20 border border-brand-purple/30 flex items-center justify-center mx-auto mb-6">
              <Megaphone className="w-8 h-8 text-brand-purple" />
            </div>
            <h1 className="text-5xl font-display font-extrabold text-white mb-4">
              Raggiungi <span className="text-brand-cyan">66.000+</span> Utenti
            </h1>
            <p className="text-xl text-white/60 font-body mb-8">
              Porta il tuo brand nella più grande community italiana di gaming e intrattenimento.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => document.getElementById("form")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-accent text-white font-display font-bold transition-all hover:opacity-90"
              >
                Diventa Partner
              </button>
              <button
                onClick={() => document.getElementById("why")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-display font-bold hover:bg-white/15 transition-all"
              >
                Perché Sceglierci
              </button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-brand-surface border border-brand-border rounded-2xl p-5 text-center card-hover">
                <s.icon className="w-6 h-6 text-brand-accent mx-auto mb-3" />
                <p className="text-2xl font-display font-extrabold text-white mb-1">{s.value}</p>
                <p className="text-brand-muted text-xs font-body">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Perché */}
        <section id="why" className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-white text-center mb-12">
              Perché Scegliere SOLLARY
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PERCHE.map((p) => (
                <div key={p.titolo} className="bg-brand-surface border border-brand-border rounded-2xl p-6 card-hover">
                  <div className={`w-12 h-12 rounded-xl bg-${p.colore}/10 border border-${p.colore}/20 flex items-center justify-center mb-4`}>
                    <p.icona className={`w-6 h-6 text-${p.colore}`} />
                  </div>
                  <h3 className="font-display font-bold text-white mb-2">{p.titolo}</h3>
                  <p className="text-brand-muted font-body text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Opportunità */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-white text-center mb-4">Opportunità di Partnership</h2>
            <p className="text-brand-muted text-center font-body mb-12">Soluzioni flessibili per ogni tipo di brand e budget</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {OPPORTUNITA.map((o) => (
                <div key={o.titolo} className="bg-brand-surface border border-brand-border rounded-2xl p-6 text-center card-hover">
                  <span className="text-4xl block mb-4">{o.icona}</span>
                  <h3 className="font-display font-bold text-white mb-3">{o.titolo}</h3>
                  <p className="text-brand-muted font-body text-sm leading-relaxed">{o.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form */}
        <section id="form" className="py-16 px-4 pb-24">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-brand-purple/20 to-brand-accent/10 border border-white/10 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-2">
                <Handshake className="w-6 h-6 text-brand-purple" />
                <h2 className="text-2xl font-display font-bold text-white">Inizia la Partnership</h2>
              </div>
              <p className="text-white/50 font-body text-sm mb-8">
                Compila il form e ti ricontatteremo entro 48 ore.
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/60 text-xs font-body mb-1.5">Nome <span className="text-brand-red">*</span></label>
                    <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Il tuo nome" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs font-body mb-1.5">Cosa rappresenti?</label>
                    <input value={form.cognome} onChange={(e) => setForm({ ...form, cognome: e.target.value })} placeholder="Nome" className={inputClass} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/60 text-xs font-body mb-1.5">Email <span className="text-brand-red">*</span></label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@azienda.com" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs font-body mb-1.5">Telefono</label>
                    <input value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} placeholder="+39..." className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="block text-white/60 text-xs font-body mb-1.5">Sito Web</label>
                  <input value={form.sito} onChange={(e) => setForm({ ...form, sito: e.target.value })} placeholder="https://..." className={inputClass} />
                </div>
                <div>
                  <label className="block text-white/60 text-xs font-body mb-1.5">Budget Mensile Stimato</label>
                  <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className={inputClass + " appearance-none"}>
                    {BUDGET_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-white/60 text-xs font-body mb-1.5">Messaggio <span className="text-brand-red">*</span></label>
                  <textarea
                    value={form.messaggio}
                    onChange={(e) => setForm({ ...form, messaggio: e.target.value })}
                    placeholder="Descrivi i tuoi obiettivi di marketing..."
                    rows={5}
                    className={inputClass + " resize-none"}
                  />
                </div>

                {result && (
                  <div className={`flex items-start gap-3 p-4 rounded-xl border ${
                    result.type === "success" ? "bg-brand-green/10 border-brand-green/20 text-brand-green" : "bg-brand-red/10 border-brand-red/20 text-brand-red"
                  }`}>
                    {result.type === "success" ? <CheckCircle className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                    <p className="text-sm font-body">{result.message}</p>
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={submitting || result?.type === "success"}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-purple to-brand-accent hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-display font-bold text-base transition-all flex items-center justify-center gap-2"
                >
                  {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  {submitting ? "Invio..." : "Invia Richiesta Partnership"}
                </button>

                <p className="text-center text-white/30 text-xs font-body">
                  Per partnership urgenti scrivi a{" "}
                  <span className="text-brand-accent">info@sollary.net</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
