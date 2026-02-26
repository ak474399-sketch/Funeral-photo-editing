import type { NextAuthOptions, Session } from "next-auth";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import { supabaseAdmin } from "@/lib/supabase";

function cookiesFromRequest(request: Request): Record<string, string> {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return {};
  return Object.fromEntries(
    cookieHeader.split(";").map((s) => {
      const i = s.indexOf("=");
      const name = i === -1 ? s.trim() : s.slice(0, i).trim();
      const value = i === -1 ? "" : s.slice(i + 1).trim();
      return [name, value];
    })
  );
}

function reqForJwt(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const cookies: Record<string, string> = {};
  for (const part of cookieHeader.split(";")) {
    const i = part.indexOf("=");
    if (i === -1) continue;
    const name = part.slice(0, i).trim();
    const value = part.slice(i + 1).trim();
    if (name) cookies[name] = value;
  }
  return { headers: { cookie: cookieHeader }, cookies };
}

export async function getUserIdFromRequest(request: Request): Promise<string | null> {
  const secret = process.env.NEXTAUTH_SECRET;
  if (secret) {
    try {
      const token = await getToken({ req: reqForJwt(request) as never, secret });
      if (token) {
        const id = (token as { userId?: string }).userId;
        if (id) return id;
        if (token.email) {
          const email = String(token.email);
          const { data: existing } = await supabaseAdmin
            .from("users")
            .select("id")
            .eq("email", email)
            .maybeSingle();
          if (existing?.id) return existing.id;
          const { data: created } = await supabaseAdmin
            .from("users")
            .insert({ email, name: (token.name as string) ?? null, avatar_url: (token.picture as string) ?? null })
            .select("id")
            .single();
          if (created?.id) return created.id;
        }
      }
    } catch (err) {
      console.warn("[getUserIdFromRequest] getToken failed:", (err as Error)?.message);
    }
  }
  const session = await getSessionFromRequest(request);
  return (session?.user as { id?: string })?.id ?? null;
}

export async function getSessionFromRequest(request: Request): Promise<Session | null> {
  const secret = process.env.NEXTAUTH_SECRET;
  if (secret) {
    const token = await getToken({ req: reqForJwt(request) as never, secret });
    if (token) {
      let userId = (token as { userId?: string }).userId;
      if (!userId && token.email) {
        const { data } = await supabaseAdmin.from("users").select("id").eq("email", String(token.email)).maybeSingle();
        if (data) userId = data.id;
      }
      if (userId) {
        return {
          user: {
            id: userId,
            role: (token as { role?: string }).role ?? "user",
            email: (token.email as string | null) ?? null,
            name: (token.name as string | null) ?? null,
            image: (token.picture as string | null) ?? null,
          },
          expires: (token.exp as number | undefined)
            ? new Date((token.exp as number) * 1000).toISOString()
            : "",
        };
      }
    }
  }
  try {
    const req = { headers: Object.fromEntries(request.headers.entries()), cookies: cookiesFromRequest(request) };
    const res = { getHeader: () => undefined, setCookie: () => {}, setHeader: () => {} };
    return await getServerSession(req as never, res as never, authOptions);
  } catch {
    return null;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email || !account) return false;
      const { data: existingUser } = await supabaseAdmin.from("users").select("id").eq("email", user.email).single();
      if (existingUser) {
        await supabaseAdmin.from("users").update({ name: user.name, avatar_url: user.image, updated_at: new Date().toISOString() }).eq("id", existingUser.id);
        await supabaseAdmin.from("accounts").upsert({ user_id: existingUser.id, provider: account.provider, provider_account_id: account.providerAccountId, access_token: account.access_token ?? null, refresh_token: account.refresh_token ?? null, expires_at: account.expires_at ?? null }, { onConflict: "provider,provider_account_id" });
      } else {
        const { data: newUser } = await supabaseAdmin.from("users").insert({ email: user.email, name: user.name, avatar_url: user.image }).select("id").single();
        if (newUser) {
          await supabaseAdmin.from("accounts").insert({ user_id: newUser.id, provider: account.provider, provider_account_id: account.providerAccountId, access_token: account.access_token ?? null, refresh_token: account.refresh_token ?? null, expires_at: account.expires_at ?? null });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user?.email) {
        let { data } = await supabaseAdmin.from("users").select("id, role").eq("email", user.email).single();
        if (!data) {
          await new Promise((r) => setTimeout(r, 400));
          const res = await supabaseAdmin.from("users").select("id, role").eq("email", user.email).single();
          data = res.data;
        }
        if (data) { token.userId = data.id; token.role = data.role; }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as Record<string, unknown>).id = token.userId;
        (session.user as Record<string, unknown>).role = token.role;
      }
      return session;
    },
    redirect({ url, baseUrl }) {
      try { const u = new URL(url); const base = new URL(baseUrl); if (u.origin === base.origin) return url; } catch {}
      return baseUrl;
    },
  },
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  pages: { signIn: "/?login=1" },
  secret: process.env.NEXTAUTH_SECRET,
};
