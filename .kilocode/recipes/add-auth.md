# Recipe: Add Authentication

Add authentication with NextAuth.js (Auth.js v5) for user sign-up, sign-in, and session management.

## When to Use

- User needs user accounts (sign up, log in, log out)
- Application requires protected routes or pages
- Any feature requiring user identity (dashboards, profiles, settings)
- Role-based access control is needed

## Prerequisites

- Base template already set up
- Database set up via `.kilocode/recipes/add-database.md` (recommended but not required for basic credential auth)

## Setup Steps

### Step 1: Install Dependencies

```bash
bun add next-auth@beta @auth/drizzle-adapter
```

> Note: Only install `@auth/drizzle-adapter` if you're using the database recipe.

### Step 2: Environment Variables

Create `.env.local`:

```env
AUTH_SECRET="generate-a-random-32-char-string"
AUTH_URL="http://localhost:3000"
```

For production, set these in your deployment platform's environment variables.

### Step 3: Create Auth Configuration

#### `src/lib/auth.ts` - Auth.js configuration

```typescript
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// If using database:
// import { DrizzleAdapter } from "@auth/drizzle-adapter";
// import { db } from "@/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  // adapter: DrizzleAdapter(db), // Uncomment if using database
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Replace with your user lookup logic
        // Example with database:
        // const user = await db.select().from(users).where(eq(users.email, credentials.email as string));
        // if (user && verifyPassword(credentials.password as string, user.password)) {
        //   return { id: user.id, email: user.email, name: user.name };
        // }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
});
```

#### `src/app/api/auth/[...nextauth]/route.ts` - API route handler

```typescript
import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;
```

### Step 4: Add Auth Middleware (Optional)

#### `middleware.ts` - Protect routes

```typescript
import { auth } from "@/lib/auth";

export default auth((req) => {
  const protectedPaths = ["/dashboard", "/settings"];
  const isProtected = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !req.auth) {
    return Response.redirect(new URL("/login", req.url));
  }
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
```

### Step 5: Create Auth Pages

#### `src/app/login/page.tsx` - Login page

```tsx
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signIn("credentials", { email, password, callbackUrl: "/dashboard" });
        }}
        className="w-full max-w-sm space-y-4 p-8 rounded-2xl bg-[#0d0d1a] border border-white/5"
      >
        <h1 className="text-2xl font-bold text-white">Sign in</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
        />
        <button
          type="submit"
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white text-sm font-semibold"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
```

### Step 6: Type Augmentation

#### `src/types/next-auth.d.ts` - Extend NextAuth types

```typescript
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
```

### Step 7: Add Package Scripts (if not present)

Ensure `package.json` has:

```json
{
  "scripts": {
    "auth:secret": "openssl rand -base64 33"
  }
}
```

### Step 8: Commit and Push

```bash
bun typecheck && bun lint && git add -A && git commit -m "Add authentication with NextAuth.js" && git push
```

## Usage Examples

### Get current user in Server Component

```typescript
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) return <div>Please sign in</div>;
  return <div>Welcome, {session.user.name}</div>;
}
```

### Get current user in Client Component

```tsx
"use client";

import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();
  if (!session) return <div>Not signed in</div>;
  return <div>Hello, {session.user.email}</div>;
}
```

### Sign out

```tsx
import { signOut } from "next-auth/react";

<button onClick={() => signOut()}>Sign out</button>;
```

## Adding OAuth Providers

To add Google or GitHub OAuth:

```typescript
// In src/lib/auth.ts
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    // ...other providers
  ],
});
```

Add the corresponding environment variables to `.env.local`.

## Memory Bank Updates

After implementing, update `.kilocode/rules/memory-bank/context.md`:

- Add authentication to "Recently Completed" section
- Document the auth providers configured
- Note any protected routes added

Also update `.kilocode/rules/memory-bank/tech.md`:

- Add NextAuth.js to dependencies
- Document auth file structure
