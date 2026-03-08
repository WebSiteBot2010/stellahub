import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

// Scopes Discord OAuth2
const scopes = ["identify", "email", "guilds", "guilds.members.read"].join(" ");

export const authOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: { params: { scope: scopes } },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" as const },
  callbacks: {
    async jwt({ token, account, profile }: any) {
      if (account) {
        token.accessToken = account.access_token;
        token.discordId = profile?.id;
        token.avatar = profile?.avatar;
        token.discriminator = profile?.discriminator;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.discordId = token.discordId;
      session.user.accessToken = token.accessToken;
      session.user.avatar = token.avatar;
      session.user.discriminator = token.discriminator;
      return session;
    },
  },
  pages: {
    signIn: "/",
    error: "/",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
