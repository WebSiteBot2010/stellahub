"use client";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { AuthGuard } from "@/components/AuthGuard";
import { Trophy, TrendingUp, MessageSquare, Mic, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// Mock data - in produzione collegalo al tuo bot Discord/API
const MOCK_USERS = Array.from({ length: 9 }, (_, i) => ({
  id: `${i + 1}`,
  rank: i + 1,
  username: ["sollary", "survivor.3301", "piconotfunny", "signor.anne", "gae_ello", "lash", "_pigreco_", "vampirefeeling", "xbarbossax"][i],
  avatar: null,
  level: [403, 384, 196, 165, 158, 149, 147, 144, 137][i],
  exp: [34914, 66462, 11787, 13402, 17796, 16637, 5755, 3175, 12629][i],
  multiplier: [4.0, 190.5, 176.0, 21.3, 21.0, 21.5, 1.5, 21.0, 21.0][i],
  isTop: i === 0,
}));

const TABS = [
  { id: "level", label: "Top Livello", icon: TrendingUp },
  { id: "weekly", label: "Top Settimanale", icon: Trophy },
  { id: "messages", label: "Top Messaggi", icon: MessageSquare },
  { id: "voice", label: "Top Voice", icon: Mic },
];

function UserCard({ user, index }: { user: typeof MOCK_USERS[0]; index: number }) {
  const rankColors: Record<number, string> = { 1: "text-yellow-400", 2: "text-slate-300", 3: "text-amber-600" };
  const borderColors: Record<number, string> = { 1: "border-yellow-500/40", 2: "border-slate-400/30", 3: "border-amber-600/30" };

  return (
    <div className={`fade-in-up bg-brand-surface border rounded-2xl p-5 card-hover relative overflow-hidden ${
      borderColors[user.rank] || "border-brand-border"
    }`}>
      {user.isTop && (
        <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/10 rounded-bl-3xl flex items-end justify-start p-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
        </div>
      )}

      <div className="flex items-center gap-3 mb-4">
        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-display font-bold shrink-0 ${
          rankColors[user.rank] ? "bg-brand-card" : "bg-brand-card text-brand-muted"
        } ${rankColors[user.rank] || ""}`}>
          #{user.rank}
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-accent to-brand-purple flex items-center justify-center font-display font-bold text-white shrink-0">
          {user.username[0].toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="font-display font-semibold text-white truncate">{user.username}</p>
          <p className="text-brand-muted text-xs font-body">ID: {user.id}8{user.rank}...</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-brand-card rounded-xl p-3">
          <p className="text-brand-muted text-xs font-body mb-1">Livello</p>
          <p className="text-xl font-display font-bold text-white">{user.level}</p>
        </div>
        <div className="bg-brand-card rounded-xl p-3">
          <p className="text-brand-muted text-xs font-body mb-1">EXP</p>
          <p className="text-xl font-display font-bold text-brand-cyan">{user.exp.toLocaleString()}</p>
        </div>
      </div>

      <div className="h-1.5 bg-brand-card rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-brand-accent to-brand-cyan rounded-full"
          style={{ width: `${Math.min((user.exp % 10000) / 100, 100)}%` }}
        />
      </div>

      <div className="flex items-center justify-end gap-2">
        <div className="w-4 h-4 rounded-full bg-brand-accent/20 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-brand-accent" />
        </div>
        <span className="text-brand-muted text-xs font-body">
          Moltiplicatore <span className="text-brand-cyan font-medium">×{user.multiplier}</span>
        </span>
      </div>
    </div>
  );
}

function UsersContent() {
  const [activeTab, setActiveTab] = useState("level");
  const [page, setPage] = useState(1);
  const totalPages = 8233;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-extrabold text-white mb-1">Community</h1>
          <p className="text-brand-muted font-body text-sm">74.093 membri attivi</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-brand-surface border border-brand-border rounded-xl">
          <SlidersHorizontal className="w-4 h-4 text-brand-muted" />
          <span className="text-brand-muted text-sm font-body">Filtri</span>
        </div>
      </div>

      {/* Stats top */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Totale Membri", value: "74.093", color: "text-white" },
          { label: "Livello Più Alto", value: "403", color: "text-brand-cyan" },
          { label: "Top Player", value: "sollary", color: "text-brand-accent" },
        ].map((s) => (
          <div key={s.label} className="bg-brand-surface border border-brand-border rounded-2xl p-5">
            <p className="text-brand-muted text-xs font-body mb-2 uppercase tracking-wider">{s.label}</p>
            <p className={`text-2xl font-display font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-display font-medium text-sm whitespace-nowrap transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-brand-accent text-white"
                : "bg-brand-surface border border-brand-border text-brand-muted hover:text-white"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 stagger">
        {MOCK_USERS.map((user, i) => (
          <UserCard key={user.id} user={user} index={i} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-surface border border-brand-border text-brand-muted hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 font-body text-sm"
        >
          <ChevronLeft className="w-4 h-4" /> Precedente
        </button>
        <div className="px-5 py-2 rounded-xl bg-brand-accent text-white font-display font-semibold text-sm">
          Pagina {page} di {totalPages.toLocaleString()}
        </div>
        <button
          onClick={() => setPage(Math.min(totalPages, page + 1))}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-surface border border-brand-border text-brand-muted hover:text-white transition-all duration-200 font-body text-sm"
        >
          Successiva <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function UsersPage() {
  return (
    <>
      <Navbar />
      <main className="pt-14 min-h-screen noise">
        <AuthGuard>
          <UsersContent />
        </AuthGuard>
      </main>
    </>
  );
}
