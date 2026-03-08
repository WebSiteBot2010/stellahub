"use client";
import { useState, useRef, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  Users,
  Shield,
  BookOpen,
  HelpCircle,
  Vote,
  Unlock,
  FileText,
  LogOut,
  Megaphone,
  User,
} from "lucide-react";

const SupportaMenu = [
  { label: "Voti", href: "/vote", icon: Vote },
];

const CommunityMenu = [
  { label: "Users", href: "/users/level", icon: Users },
  { label: "Ruoli", href: "/ruoli", icon: Shield },
  { label: "Regole", href: "/regole", icon: BookOpen },
  { label: "FAQ", href: "/faq", icon: HelpCircle },
];

const RichiesteMenu = [
  { label: "Unban", href: "/unban", icon: Unlock },
  { label: "Candidature", href: "/candidature", icon: FileText },
];

function DropdownMenu({ items, open }: { items: typeof CommunityMenu; open: boolean }) {
  return (
    <div
      className={`absolute top-full left-0 mt-2 w-52 bg-brand-surface border border-brand-border rounded-xl overflow-hidden shadow-2xl transition-all duration-200 z-50 ${
        open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
      }`}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex items-center gap-3 px-4 py-3 text-brand-muted hover:text-white hover:bg-white/5 transition-colors duration-150"
        >
          <item.icon className="w-4 h-4 text-brand-accent" />
          <span className="font-body text-sm font-medium">{item.label}</span>
        </Link>
      ))}
    </div>
  );
}

function NavDropdown({
  label,
  items,
}: {
  label: string;
  items: typeof CommunityMenu;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-display font-medium text-sm transition-all duration-200 ${
          open ? "text-white bg-white/10" : "text-brand-muted hover:text-white hover:bg-white/5"
        }`}
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <DropdownMenu items={items} open={open} />
    </div>
  );
}

export function Navbar() {
  const { data: session, status } = useSession();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 h-14 border-b border-brand-border bg-brand-bg/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-display font-bold text-lg text-white">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-accent to-brand-purple flex items-center justify-center text-white text-sm font-black">
            S
          </div>
          Sollary
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          <Link
            href="/sponsor"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg font-display font-medium text-sm text-brand-muted hover:text-white hover:bg-white/5 transition-all duration-200"
          >
            <Megaphone className="w-3.5 h-3.5" />
            Sponsor
          </Link>
          <NavDropdown label="Supporta" items={SupportaMenu} />
          <NavDropdown label="Community" items={CommunityMenu} />
          <NavDropdown label="Richieste" items={RichiesteMenu} />
        </div>

        {/* Auth */}
        <div className="flex items-center gap-3">
          {status === "loading" ? (
            <div className="w-8 h-8 rounded-full bg-brand-surface animate-pulse" />
          ) : session ? (
            <div ref={userRef} className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-surface border border-brand-border hover:border-brand-accent/50 transition-all duration-200"
              >
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt="avatar"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-brand-accent flex items-center justify-center">
                    <User className="w-3 h-3 text-white" />
                  </div>
                )}
                <span className="font-display font-medium text-sm text-white hidden sm:block max-w-[100px] truncate">
                  {session.user?.name}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-brand-muted transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {userMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-brand-surface border border-brand-border rounded-xl overflow-hidden shadow-2xl z-50">
                  <div className="px-4 py-3 border-b border-brand-border">
                    <p className="text-white font-display font-semibold text-sm truncate">{session.user?.name}</p>
                    <p className="text-brand-muted text-xs font-body truncate mt-0.5">{session.user?.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="flex items-center gap-3 w-full px-4 py-3 text-brand-red hover:bg-brand-red/10 transition-colors duration-150"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="font-body text-sm font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => signIn("discord")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-accent hover:bg-opacity-90 text-white font-display font-semibold text-sm transition-all duration-200 glow-accent"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
              </svg>
              Accedi con Discord
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
