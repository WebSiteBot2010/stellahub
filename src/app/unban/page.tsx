"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Navbar } from "@/components/Navbar";
import { AuthGuard } from "@/components/AuthGuard";
import { Unlock, ShieldCheck, ShieldX, Send, AlertCircle, CheckCircle, Loader2 } from "lucide-react";

function UnbanContent() {
  const { data: session } = useSession();
  const [banStatus, setBanStatus] = useState<boolean | null>(null);
  const [checkingBan, setCheckingBan] = useState(true);
  const [form, setForm] = useState({ reason: "", proofs: "" });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    fetch("/api/unban")
      .then((r) => r.json())
      .then((d) => { setBanStatus(d.isBanned); setCheckingBan(false); });
  }, []);

  const handleSubmit = async () => {
    if (form.reason.trim().length < 20) {
      setResult({ type: "error", message: "Il motivo deve essere di almeno 20 caratteri" });
      return;
    }
    setSubmitting(true);
    setResult(null);
    const res = await fetch("/api/unban", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setResult({ type: res.ok ? "success" : "error", message: data.message || data.error });
    setSubmitting(false);
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mx-auto mb-4">
          <Unlock className="w-8 h-8 text-brand-accent" />
        </div>
        <h1 className="text-3xl font-display font-extrabold text-white mb-2">Richiesta Unban</h1>
        <p className="text-brand-muted font-body">Compila il modulo per richiedere la rimozione del ban</p>
      </div>

      {/* Ban status */}
      <div className={`rounded-2xl p-5 border mb-6 flex items-center gap-4 ${
        checkingBan
          ? "bg-brand-surface border-brand-border"
          : banStatus
          ? "bg-brand-red/10 border-brand-red/20"
          : "bg-brand-green/10 border-brand-green/20"
      }`}>
        {checkingBan ? (
          <><Loader2 className="w-6 h-6 text-brand-muted animate-spin" />
          <div>
            <p className="font-display font-semibold text-white">Controllo stato ban...</p>
            <p className="text-brand-muted text-sm font-body">Verifica in corso su Discord</p>
          </div></>
        ) : banStatus ? (
          <><ShieldX className="w-6 h-6 text-brand-red shrink-0" />
          <div>
            <p className="font-display font-semibold text-brand-red">Sei Bannato</p>
            <p className="text-brand-muted text-sm font-body">Il tuo account risulta bannato dal server</p>
          </div></>
        ) : (
          <><ShieldCheck className="w-6 h-6 text-brand-green shrink-0" />
          <div>
            <p className="font-display font-semibold text-brand-green">Non sei Bannato</p>
            <p className="text-brand-muted text-sm font-body">Il tuo account non risulta bannato</p>
          </div></>
        )}
      </div>

      {/* Form */}
      <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
        <h2 className="text-white font-display font-semibold mb-5">Modulo di Richiesta</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-brand-muted text-sm font-body mb-2">
              Motivo della richiesta <span className="text-brand-red">*</span>
            </label>
            <textarea
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              placeholder="Spiega perché ritieni di non meritare il ban e cosa è successo..."
              rows={5}
              className="w-full bg-brand-card border border-brand-border rounded-xl px-4 py-3 text-white font-body text-sm placeholder:text-brand-muted resize-none focus:outline-none focus:border-brand-accent/50 transition-colors"
            />
            <p className={`text-xs mt-1 ${form.reason.length >= 20 ? "text-brand-green" : "text-brand-muted"}`}>
              {form.reason.length}/20 caratteri minimi
            </p>
          </div>

          <div>
            <label className="block text-brand-muted text-sm font-body mb-2">
              Prove / Link (opzionale)
            </label>
            <textarea
              value={form.proofs}
              onChange={(e) => setForm({ ...form, proofs: e.target.value })}
              placeholder="Link a screenshot, clip o altre prove a supporto..."
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
              {result.type === "success" ? <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />}
              <p className="font-body text-sm">{result.message}</p>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={submitting || result?.type === "success"}
            className="w-full py-3.5 rounded-xl bg-brand-accent hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-display font-bold transition-all duration-200 flex items-center justify-center gap-2"
          >
            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            {submitting ? "Invio in corso..." : "Invia Richiesta"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function UnbanPage() {
  return (
    <>
      <Navbar />
      <main className="pt-14 min-h-screen noise">
        <AuthGuard>
          <UnbanContent />
        </AuthGuard>
      </main>
    </>
  );
}
