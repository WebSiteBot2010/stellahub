"use client";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { AuthGuard } from "@/components/AuthGuard";
import { FileText, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const RUOLI = [
  "Moderatore", "Helper", "Event Manager", "Content Creator",
  "Graphic Designer", "Social Media Manager", "Developer",
];

function CandidatureContent() {
  const [form, setForm] = useState({
    ruolo: "",
    eta: "",
    esperienza: "",
    motivazione: "",
    disponibilita: "",
    altro: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async () => {
    if (!form.ruolo || !form.eta || !form.esperienza || !form.motivazione) {
      setResult({ type: "error", message: "Compila tutti i campi obbligatori" });
      return;
    }
    setSubmitting(true);
    setResult(null);
    const res = await fetch("/api/candidature", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setResult({ type: res.ok ? "success" : "error", message: data.message || data.error });
    setSubmitting(false);
    if (res.ok) setForm({ ruolo: "", eta: "", esperienza: "", motivazione: "", disponibilita: "", altro: "" });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-brand-cyan" />
        </div>
        <h1 className="text-3xl font-display font-extrabold text-white mb-2">Candidature Staff</h1>
        <p className="text-brand-muted font-body">Vuoi far parte del team di Sollary? Invia la tua candidatura!</p>
      </div>

      <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 space-y-5">
        {/* Ruolo */}
        <div>
          <label className="block text-sm font-body text-brand-muted mb-2">
            Ruolo desiderato <span className="text-brand-red">*</span>
          </label>
          <select
            value={form.ruolo}
            onChange={(e) => setForm({ ...form, ruolo: e.target.value })}
            className="w-full bg-brand-card border border-brand-border rounded-xl px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-brand-accent/50 transition-colors appearance-none"
          >
            <option value="">Seleziona un ruolo...</option>
            {RUOLI.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-body text-brand-muted mb-2">
              Età <span className="text-brand-red">*</span>
            </label>
            <input
              type="number"
              min={13}
              max={99}
              value={form.eta}
              onChange={(e) => setForm({ ...form, eta: e.target.value })}
              placeholder="Es: 18"
              className="w-full bg-brand-card border border-brand-border rounded-xl px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-brand-accent/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-body text-brand-muted mb-2">Disponibilità</label>
            <input
              type="text"
              value={form.disponibilita}
              onChange={(e) => setForm({ ...form, disponibilita: e.target.value })}
              placeholder="Es: 3-4h al giorno"
              className="w-full bg-brand-card border border-brand-border rounded-xl px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-brand-accent/50 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-body text-brand-muted mb-2">
            Esperienza precedente <span className="text-brand-red">*</span>
          </label>
          <textarea
            value={form.esperienza}
            onChange={(e) => setForm({ ...form, esperienza: e.target.value })}
            placeholder="Descrivi la tua esperienza come moderatore, helper, ecc..."
            rows={4}
            className="w-full bg-brand-card border border-brand-border rounded-xl px-4 py-3 text-white font-body text-sm placeholder:text-brand-muted resize-none focus:outline-none focus:border-brand-accent/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-body text-brand-muted mb-2">
            Motivazione <span className="text-brand-red">*</span>
          </label>
          <textarea
            value={form.motivazione}
            onChange={(e) => setForm({ ...form, motivazione: e.target.value })}
            placeholder="Perché vuoi entrare nello staff di Sollary?"
            rows={4}
            className="w-full bg-brand-card border border-brand-border rounded-xl px-4 py-3 text-white font-body text-sm placeholder:text-brand-muted resize-none focus:outline-none focus:border-brand-accent/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-body text-brand-muted mb-2">Note aggiuntive</label>
          <textarea
            value={form.altro}
            onChange={(e) => setForm({ ...form, altro: e.target.value })}
            placeholder="Qualcosa che vuoi aggiungere..."
            rows={3}
            className="w-full bg-brand-card border border-brand-border rounded-xl px-4 py-3 text-white font-body text-sm placeholder:text-brand-muted resize-none focus:outline-none focus:border-brand-accent/50 transition-colors"
          />
        </div>

        {result && (
          <div className={`flex items-start gap-3 p-4 rounded-xl border ${
            result.type === "success"
              ? "bg-brand-green/10 border-brand-green/20 text-brand-green"
              : "bg-brand-red/10 border-brand-red/20 text-brand-red"
          }`}>
            {result.type === "success" ? <CheckCircle className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
            <p className="font-body text-sm">{result.message}</p>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={submitting || result?.type === "success"}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-accent hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-display font-bold transition-all duration-200 flex items-center justify-center gap-2"
        >
          {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          {submitting ? "Invio..." : "Invia Candidatura"}
        </button>
      </div>
    </div>
  );
}

export default function CandidaturePage() {
  return (
    <>
      <Navbar />
      <main className="pt-14 min-h-screen noise">
        <AuthGuard>
          <CandidatureContent />
        </AuthGuard>
      </main>
    </>
  );
}
