"use client";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { AuthGuard } from "@/components/AuthGuard";
import { HelpCircle, ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Come posso entrare nel server Discord di Sollary?",
    a: "Puoi entrare nel server cliccando sul pulsante 'Entra su Discord' nella homepage. Il server è aperto a tutti e non richiede inviti speciali.",
  },
  {
    q: "Come funziona il sistema di livelli?",
    a: "Il sistema di livelli funziona guadagnando EXP scrivendo nei canali e stando in voice. Ogni messaggio ti dà una certa quantità di EXP in base al tuo moltiplicatore. Salendo di livello ottieni ruoli speciali e vantaggi esclusivi.",
  },
  {
    q: "Come posso votare il server?",
    a: "Puoi votare il server andando nella sezione Voti. Puoi votare ogni 24 ore e riceverai 200 EXP e il ruolo Voter per 12 ore come ricompensa.",
  },
  {
    q: "Come faccio a candidarmi come staff?",
    a: "Vai nella sezione Candidature, compila il modulo con tutte le informazioni richieste e invialo. Lo staff esaminerà la tua candidatura entro qualche giorno.",
  },
  {
    q: "Sono stato bannato, cosa posso fare?",
    a: "Se ritieni di essere stato bannato per errore o vuoi contestare il ban, vai nella sezione Unban e compila la richiesta con una spiegazione dettagliata della situazione.",
  },
  {
    q: "Come posso ottenere i ruoli di colore?",
    a: "I ruoli speciali come Gamer, Music Lover, Creative ecc. si ottengono reagendo nei canali dedicati del server Discord. I ruoli di livello si ottengono automaticamente raggiungendo il livello corrispondente.",
  },
  {
    q: "Come funziona il programma di partnership?",
    a: "Se hai un server Discord o una realtà online e vuoi collaborare con Sollary, vai nella sezione Sponsor e compila il modulo di partnership. Il nostro team valuterà la tua proposta.",
  },
  {
    q: "Posso usare bot privati o fare pubblicità nel server?",
    a: "No, la pubblicità non autorizzata è strettamente vietata come indicato nel regolamento. Per eventuali collaborazioni ufficiali, usa il sistema di partnership.",
  },
  {
    q: "Come contatto lo staff in caso di problemi?",
    a: "Puoi aprire un ticket nel server Discord usando il canale apposito, oppure contattare direttamente un moderatore o helper disponibile in chat.",
  },
  {
    q: "Cosa succede se violo il regolamento?",
    a: "Le violazioni del regolamento comportano sanzioni graduate: avvertimento, mute temporaneo, kick, ban temporaneo o ban permanente, in base alla gravità dell'infrazione.",
  },
];

function FAQItem({ item }: { item: typeof FAQS[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden card-hover">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full p-5 text-left"
      >
        <span className="font-display font-semibold text-white pr-4">{item.q}</span>
        <ChevronDown className={`w-5 h-5 text-brand-muted shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96" : "max-h-0"}`}>
        <div className="px-5 pb-5">
          <div className="h-px bg-brand-border mb-4" />
          <p className="text-brand-muted font-body text-sm leading-relaxed">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main className="pt-14 min-h-screen noise">
        <AuthGuard>
          <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-8 h-8 text-brand-accent" />
              </div>
              <h1 className="text-3xl font-display font-extrabold text-white mb-2">FAQ</h1>
              <p className="text-brand-muted font-body">Domande Frequenti — trova le risposte che cerchi</p>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <FAQItem key={i} item={faq} />
              ))}
            </div>
          </div>
        </AuthGuard>
      </main>
    </>
  );
}
