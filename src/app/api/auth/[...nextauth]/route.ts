import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

const scopes = ["identify", "email", "guilds", "guilds.members.read"].join(" ");

const handler = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: { params: { scope: scopes } },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account, profile }: any) {
      if (account) {
        token.accessToken = account.access_token;
        token.discordId = profile?.id;
        token.avatar = profile?.avatar;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.discordId = token.discordId;
      session.user.accessToken = token.accessToken;
      return session;
    },
  },
  pages: { signIn: "/", error: "/" },
});

export { handler as GET, handler as POST };