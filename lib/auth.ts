import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

// ✅ Define and EXPORT your authOptions from here
export const authOptions: AuthOptions = {
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
        // Pro-tip: It's more efficient to use a shared DB connection
        // from '@/lib/db' than to create a new pool on every login.
        const pool = mysql.createPool(process.env.DATABASE_URL!);
        
        try {
          const [rows]: any[] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [credentials.email]
          );
          
          const user = rows[0];

          if (user && await bcrypt.compare(credentials.password, user.password_hash)) {
            return {
              id: user.id,
              email: user.email,
              name: `${user.first_name} ${user.last_name}`,
              role: user.role,
            };
          } else {
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
    signIn: '/login',
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