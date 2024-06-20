import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import signIn from '@/services/signin';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // Durasi session dalam detik (7 hari)
    updateAge: 24 * 60 * 60, // Update session setiap 24 jam
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: {
          type: 'email',
        },
        password: {
          type: 'password',
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user: any = await signIn({ email, password });
        return {
          ...user.data,
          token: user.token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account?.provider === 'credentials' && token?.email) {
        token = user;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user = token;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
