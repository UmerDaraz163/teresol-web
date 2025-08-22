// app/api/auth/[...nextauth]/route.ts

import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

// --- FIX: Remove the 'export' keyword from here ---
// This object should be a local constant, not an export from a route file.
const localAuthOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const pool = mysql.createPool(process.env.DATABASE_URL!);
        
        try {
          const [rows]: any[] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [credentials.email]
          );
          
          const user = rows[0];

          if (user && await bcrypt.compare(credentials.password, user.password_hash)) {
            // Return user object without the password hash
            return {
              id: user.id,
              email: user.email,
              name: `${user.first_name} ${user.last_name}`,
              role: user.role,
            };
          } else {
            // If credentials are not valid, return null
            return null;
          }
        } catch (error) {
          console.error("Database error in authorize:", error);
          return null;
        } finally {
            pool.end();
        }
      }
    })
  ],
  session: {
    strategy: 'jwt' as const,
  },
  pages: {
    signIn: '/login', // Redirect users to a custom login page
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
};

// This part is correct
const handler = NextAuth(localAuthOptions);

export { handler as GET, handler as POST };