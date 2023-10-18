import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_YT_client_id as string,
      clientSecret: process.env.NEXT_PUBLIC_YT_client_secret as string,
    }),
  ],
});

export { handler as GET, handler as POST };
