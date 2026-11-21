import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/lib/password";
import { rateLimit, clientIp } from "@/lib/rateLimit";

// Admin credentials live in .env.local — never in source code:
//   ADMIN_EMAIL=you@yourdomain.com
//   ADMIN_PASSWORD_HASH=<output of: node scripts/hash-password.mjs (asks for the password)>
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        // Brute-force brake: 8 attempts per 15 minutes per IP address.
        if (request?.headers && !rateLimit(`login:${clientIp(request)}`, { limit: 8, windowMs: 15 * 60 * 1000 })) {
          console.warn("Admin login rate-limited for", clientIp(request));
          return null;
        }
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminHash = process.env.ADMIN_PASSWORD_HASH;
        if (!adminEmail || !adminHash) {
          console.error("Admin login disabled: ADMIN_EMAIL / ADMIN_PASSWORD_HASH not set.");
          return null;
        }
        const email = String(credentials?.username || "").trim().toLowerCase();
        const ok =
          email === adminEmail.trim().toLowerCase() &&
          verifyPassword(String(credentials?.password || ""), adminHash);
        return ok ? { id: "admin", name: "Admin", email: adminEmail } : null;
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 8 * 60 * 60 }, // 8-hour admin sessions
  // Trust the Host header set by the platform (Vercel sets this automatically;
  // needed for `next start` / other hosts, otherwise every auth route returns 500).
  trustHost: true,
  pages: {
    signIn: "/adminsumanth/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith("/adminsumanth");
      const isLoginPage = nextUrl.pathname === "/adminsumanth/login";
      if (isOnAdmin && !isLoginPage) return isLoggedIn;
      return true;
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
});

/**
 * Use inside API route handlers. Returns a 401 Response if the caller is
 * not a logged-in admin, otherwise null.
 */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
