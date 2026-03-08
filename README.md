# Sollary Community Website

Sito web della community Sollary — Next.js 14 + Vercel.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Auth**: NextAuth.js v4 (Discord OAuth2)
- **Styling**: Tailwind CSS
- **Deploy**: Vercel
- **Icons**: Lucide React

## Setup Locale

### 1. Installa dipendenze
```bash
npm install
```

### 2. Configura variabili d'ambiente
Copia `.env.local.example` in `.env.local` e compila:

```bash
cp .env.local.example .env.local
```

Variabili necessarie:
- `NEXTAUTH_SECRET` — genera con `openssl rand -base64 32`
- `DISCORD_CLIENT_ID` e `DISCORD_CLIENT_SECRET` — da [Discord Developer Portal](https://discord.com/developers/applications)
- `DISCORD_BOT_TOKEN` — token del tuo bot Discord
- `DISCORD_GUILD_ID` — ID del tuo server Discord
- `DISCORD_VOTER_ROLE_ID` — ID del ruolo Voter
- Tutti i `DISCORD_WEBHOOK_*` — webhook dei canali Discord

### 3. Configura Discord OAuth2
Nel Discord Developer Portal:
1. Crea una nuova applicazione
2. Vai su **OAuth2 → General**
3. Aggiungi redirect URL: `http://localhost:3000/api/auth/callback/discord`
4. Per produzione: `https://tuo-dominio.vercel.app/api/auth/callback/discord`

### 4. Avvia il server
```bash
npm run dev
```

## Deploy su Vercel

### Metodo 1: Vercel CLI
```bash
npm i -g vercel
vercel
```

### Metodo 2: GitHub + Vercel Dashboard
1. Pusha il codice su GitHub
2. Importa su [vercel.com](https://vercel.com)
3. Aggiungi tutte le variabili d'ambiente dal dashboard Vercel
4. Deploy automatico!

### Variabili d'ambiente su Vercel
Nel dashboard Vercel → Project → Settings → Environment Variables:
- Aggiungi tutte le variabili da `.env.local.example`
- `NEXTAUTH_URL` deve essere `https://tuo-dominio.vercel.app`

## Struttura Pagine

| URL | Descrizione | Auth Required |
|-----|-------------|---------------|
| `/` | Homepage | No |
| `/vote` | Votazione server | ✅ |
| `/unban` | Richiesta unban | ✅ |
| `/candidature` | Candidature staff | ✅ |
| `/regole` | Regolamento | ✅ |
| `/ruoli` | Ruoli server | ✅ |
| `/users/level` | Classifica utenti | ✅ |
| `/faq` | FAQ | ✅ |
| `/sponsor` | Partnership | No (form pubblico) |
| `/wiki` | Wiki community | ✅ |

## API Routes

| Endpoint | Metodo | Descrizione |
|----------|--------|-------------|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth Discord OAuth |
| `/api/vote` | GET/POST | Voto server + webhook |
| `/api/unban` | GET/POST | Check ban + richiesta unban |
| `/api/candidature` | POST | Invio candidatura |
| `/api/partnership` | POST | Richiesta partnership |

## Note Produzione

- **Database voti**: Attualmente in-memory. Per produzione usa [Upstash Redis](https://upstash.com) (gratuito su Vercel)
- **Database users**: Collega il bot Discord per dati reali
- **Rate limiting**: Aggiungi [Upstash Ratelimit](https://github.com/upstash/ratelimit) per sicurezza
