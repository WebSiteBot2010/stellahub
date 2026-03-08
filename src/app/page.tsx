import { Navbar } from "@/components/Navbar";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pt-14 min-h-screen noise">
        {/* Hero */}
        <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 text-center overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-radial from-brand-accent/10 via-transparent to-transparent" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-purple/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-cyan/5 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-4xl mx-auto fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-sm font-display font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-green pulse-dot" />
              74.093 Membri Attivi
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white leading-tight mb-6">
              La Community{" "}
              <span className="bg-gradient-to-r from-brand-accent via-brand-purple to-brand-cyan bg-clip-text text-transparent">
                Italiana
              </span>{" "}
              di Gaming
            </h1>

            <p className="text-xl text-brand-muted font-body leading-relaxed max-w-2xl mx-auto mb-10">
              Unisciti a migliaia di appassionati. Gioca, connettiti, cresci insieme alla community più grande d&apos;Italia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://discord.gg/sollary"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-brand-accent hover:bg-opacity-90 text-white font-display font-bold text-lg rounded-2xl transition-all duration-200 glow-accent"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                </svg>
                Entra su Discord
              </a>
              <Link
                href="/vote"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-surface border border-brand-border hover:border-brand-cyan/50 text-white font-display font-bold text-lg rounded-2xl transition-all duration-200"
              >
                Vota il Server
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 stagger">
            {[
              { label: "Membri Totali", value: "74.000+", color: "brand-accent" },
              { label: "Messaggi/Giorno", value: "10.000+", color: "brand-cyan" },
              { label: "Messaggi Totali", value: "1.000.000+", color: "brand-purple" },
              { label: "Nazione", value: "Italia", color: "brand-pink" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="fade-in-up bg-brand-surface border border-brand-border rounded-2xl p-6 text-center card-hover"
              >
                <p className={`text-3xl font-display font-extrabold text-${stat.color} mb-2`}>
                  {stat.value}
                </p>
                <p className="text-brand-muted font-body text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick links */}
        <section className="py-12 px-4 pb-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-white text-center mb-12">
              Esplora la Community
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
              {[
                { href: "/users/level", label: "Classifica Utenti", desc: "Vedi chi scala le vette", icon: "🏆" },
                { href: "/ruoli", label: "Ruoli Server", desc: "Scopri i ruoli disponibili", icon: "🎖️" },
                { href: "/regole", label: "Regolamento", desc: "Leggi le regole del server", icon: "📋" },
                { href: "/faq", label: "FAQ", desc: "Domande frequenti", icon: "❓" },
                { href: "/candidature", label: "Candidature Staff", desc: "Entra nel team", icon: "📝" },
                { href: "/wiki", label: "Wiki", desc: "Chi siamo e cosa facciamo", icon: "📚" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="fade-in-up flex items-center gap-4 p-5 bg-brand-surface border border-brand-border rounded-2xl card-hover group"
                >
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <p className="font-display font-semibold text-white group-hover:text-brand-accent transition-colors">
                      {item.label}
                    </p>
                    <p className="text-brand-muted text-sm font-body mt-0.5">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
