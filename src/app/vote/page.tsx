"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Navbar } from "@/components/Navbar";
import { AuthGuard } from "@/components/AuthGuard";
import { Trophy, Star, TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface VoteData {
  totalVotes: number;
  topVoters: Array<{ rank: number; username: string; votes: number }>;
}

function VoteContent() {
  const { data: session } = useSession();
  const [voteData, setVoteData] = useState<VoteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [result, setResult] = useState<{ type: "success" | "error" | "cooldown"; message: string } | null>(null);
  const [userVotes, setUserVotes] = useState(5);

  useEffect(() => {
    fetch("/api/vote")
      .then((r) => r.json())
      .then((d) => { setVoteData(d); setLoading(false); });
  }, []);

  const handleVote = async () => {
    setVoting(true);
    setResult(null);
    try {
      const res = await fetch("/api/vote", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setResult({ type: "success", message: data.message });
        setVoteData((prev) => prev ? { ...prev, totalVotes: prev.totalVotes + 1 } : prev);
        setUserVotes((v) => v + 1);
      } else if (res.status === 429) {
        setResult({ type: "cooldown", message: data.error });
      } else {
        setResult({ type: "error", message: data.error });
      }
    } catch {
      setResult({ type: "error", message: "Errore di connessione" });
    }
    setVoting(false);
  };

  const progress = voteData ? Math.min((voteData.totalVotes / 10000) * 100, 100) : 0;

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mx-auto mb-4">
          <Star className="w-8 h-8 text-brand-accent" />
        </div>
        <h1 className="text-3xl font-display font-extrabold text-white mb-2">
          Vota <span className="text-brand-accent">SOLLARY</span>
        </h1>
        <p className="text-brand-muted font-body">
          Supporta il server votando ogni 24 ore e ricevi ricompense esclusive!
        </p>
      </div>

      {/* Vote button card */}
      <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 mb-4">
        <div className="flex items-center gap-2 text-white font-display font-semibold mb-4">
          <Star className="w-4 h-4 text-brand-cyan" />
          Vota Ora
        </div>

        <button
          onClick={handleVote}
          disabled={voting || result?.type === "cooldown"}
          className="w-full py-4 rounded-xl bg-brand-accent hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-display font-bold text-lg transition-all duration-200 glow-accent flex items-center justify-center gap-2"
        >
          {voting ? (
            <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Votando...</>
          ) : (
            <><Star className="w-5 h-5" /> Vota Ora</>
          )}
        </button>

        {result && (
          <div className={`mt-4 flex items-start gap-3 p-4 rounded-xl border ${
            result.type === "success"
              ? "bg-brand-green/10 border-brand-green/20 text-brand-green"
              : result.type === "cooldown"
              ? "bg-brand-accent/10 border-brand-accent/20 text-brand-accent"
              : "bg-brand-red/10 border-brand-red/20 text-brand-red"
          }`}>
            {result.type === "success" ? <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" /> :
             result.type === "cooldown" ? <Clock className="w-5 h-5 shrink-0 mt-0.5" /> :
             <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />}
            <p className="font-body text-sm">{result.message}</p>
          </div>
        )}

        <div className="mt-4 flex items-center gap-2 text-brand-muted text-sm font-body">
          <Trophy className="w-4 h-4 text-brand-accent" />
          Ricompensa per il voto: <span className="text-white font-medium">200 punti esperienza</span>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 mb-4">
        <div className="flex items-center gap-2 text-white font-display font-semibold mb-5">
          <TrendingUp className="w-4 h-4 text-brand-purple" />
          Statistiche Globali
        </div>

        {loading ? (
          <div className="space-y-3 animate-pulse">
            <div className="h-10 bg-brand-card rounded-xl" />
            <div className="h-4 bg-brand-card rounded-full" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="bg-brand-card rounded-xl p-4">
                <p className="text-brand-muted text-xs font-body mb-1">Voti Totali</p>
                <p className="text-2xl font-display font-bold text-white">{voteData?.totalVotes.toLocaleString()}</p>
              </div>
              <div className="bg-brand-card rounded-xl p-4">
                <p className="text-brand-muted text-xs font-body mb-1">I Tuoi Voti</p>
                <p className="text-2xl font-display font-bold text-brand-cyan">{userVotes}</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-body text-brand-muted mb-2">
                <span>Progresso Goal 10K</span>
                <span>{voteData?.totalVotes.toLocaleString()} / 10.000 ({progress.toFixed(1)}%)</span>
              </div>
              <div className="h-2 bg-brand-card rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-accent to-brand-cyan rounded-full transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Top Voters */}
      <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2 text-white font-display font-semibold">
            <Trophy className="w-4 h-4 text-brand-accent" />
            Top Voters Globali
          </div>
          <span className="text-brand-muted text-xs font-body bg-brand-card px-2 py-1 rounded-full">Top 50</span>
        </div>

        <div className="space-y-3">
          {voteData?.topVoters.map((voter, i) => (
            <div key={voter.username} className="flex items-center gap-4 p-3 bg-brand-card rounded-xl">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-display font-bold shrink-0 ${
                i === 0 ? "bg-yellow-500/20 text-yellow-400" :
                i === 1 ? "bg-slate-400/20 text-slate-300" :
                "bg-amber-600/20 text-amber-600"
              }`}>
                #{voter.rank}
              </div>
              <span className="flex-1 font-body font-medium text-white">{voter.username}</span>
              <span className={`font-display font-bold ${
                i === 0 ? "text-yellow-400" : i === 1 ? "text-slate-300" : "text-amber-600"
              }`}>
                {voter.votes} <span className="text-brand-muted text-xs font-body font-normal">voti</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function VotePage() {
  return (
    <>
      <Navbar />
      <main className="pt-14 min-h-screen noise">
        <AuthGuard>
          <VoteContent />
        </AuthGuard>
      </main>
    </>
  );
}
