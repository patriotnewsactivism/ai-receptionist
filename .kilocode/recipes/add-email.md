# Recipe: Add Email

Add email sending capability using Resend for transactional emails (welcome emails, notifications, password resets, etc.).

## When to Use

- User needs to send transactional emails (sign-up confirmations, password resets, notifications)
- Contact form submissions should trigger email alerts
- Automated email workflows (onboarding sequences, receipt emails)

## Prerequisites

- Base template already set up
- A [Resend](https://resend.com) account and API key (free tier available)

## Setup Steps

### Step 1: Install Dependencies

```bash
bun add resend
```

### Step 2: Environment Variables

Create `.env.local`:

```env
RESEND_API_KEY="re_your_api_key_here"
EMAIL_FROM="Callix AI <noreply@yourdomain.com>"
```

> For development, Resend provides a default sending address: `onboarding@resend.dev`

### Step 3: Create Email Utility

#### `src/lib/email.ts` - Email sending utility

```typescript
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({
  to,
  subject,
  html,
  from,
}: SendEmailOptions) {
  const { data, error } = await resend.emails.send({
    from: from || process.env.EMAIL_FROM || "onboarding@resend.dev",
    to,
    subject,
    html,
  });

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }

  return data;
}
```

### Step 4: Create Email Templates

#### `src/lib/email-templates.ts` - Reusable email templates

```typescript
export function welcomeEmail(name: string): { subject: string; html: string } {
  return {
    subject: "Welcome to Callix AI!",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0d0d1a; color: #f1f5f9; padding: 32px; border-radius: 16px;">
        <h1 style="font-size: 24px; margin-bottom: 16px;">Welcome, ${name}!</h1>
        <p style="color: #94a3b8; line-height: 1.6;">
          Your AI voice receptionist is ready to go. Here's how to get started:
        </p>
        <ol style="color: #94a3b8; line-height: 2;">
          <li>Build your knowledge base</li>
          <li>Choose your voice persona</li>
          <li>Forward your phone number</li>
          <li>Go live!</li>
        </ol>
        <a href="https://app.callix.ai/dashboard" style="display: inline-block; padding: 12px 24px; background: linear-gradient(to right, #7c3aed, #8b5cf6); color: white; text-decoration: none; border-radius: 12px; font-weight: 600; margin-top: 16px;">
          Go to Dashboard
        </a>
      </div>
    `,
  };
}

export function passwordResetEmail(
  resetUrl: string
): { subject: string; html: string } {
  return {
    subject: "Reset your password",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0d0d1a; color: #f1f5f9; padding: 32px; border-radius: 16px;">
        <h1 style="font-size: 24px; margin-bottom: 16px;">Reset your password</h1>
        <p style="color: #94a3b8; line-height: 1.6;">
          Click the button below to reset your password. This link expires in 1 hour.
        </p>
        <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(to right, #7c3aed, #8b5cf6); color: white; text-decoration: none; border-radius: 12px; font-weight: 600; margin-top: 16px;">
          Reset Password
        </a>
        <p style="color: #64748b; font-size: 14px; margin-top: 24px;">
          If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    `,
  };
}
```

### Step 5: Create API Route (Example)

#### `src/app/api/contact/route.ts` - Contact form email endpoint

```typescript
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    await sendEmail({
      to: "hello@yourdomain.com",
      subject: `New contact form submission from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
```

### Step 6: Commit and Push

```bash
bun typecheck && bun lint && git add -A && git commit -m "Add email support with Resend" && git push
```

## Usage Examples

### Send a welcome email after sign-up

```typescript
import { sendEmail } from "@/lib/email";
import { welcomeEmail } from "@/lib/email-templates";

// In a Server Action or API route
await sendEmail({
  to: "user@example.com",
  ...welcomeEmail("John"),
});
```

### Send password reset

```typescript
import { sendEmail } from "@/lib/email";
import { passwordResetEmail } from "@/lib/email-templates";

await sendEmail({
  to: user.email,
  ...passwordResetEmail("https://yoursite.com/reset?token=abc123"),
});
```

### Using in a Server Action

```typescript
"use server";

import { sendEmail } from "@/lib/email";

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  await sendEmail({
    to: "hello@yourdomain.com",
    subject: `Contact from ${name}`,
    html: `<p>${message}</p><p>From: ${email}</p>`,
  });
}
```

## Alternative: React Email

For more complex, component-based email templates, consider [React Email](https://react.email):

```bash
bun add @react-email/components @react-email/render
```

Then create templates as React components:

```tsx
import { Button, Container, Heading, Text } from "@react-email/components";

export function WelcomeTemplate({ name }: { name: string }) {
  return (
    <Container>
      <Heading>Welcome, {name}!</Heading>
      <Text>Your account is ready.</Text>
      <Button href="https://app.callix.ai/dashboard">
        Go to Dashboard
      </Button>
    </Container>
  );
}
```

## Memory Bank Updates

After implementing, update `.kilocode/rules/memory-bank/context.md`:

- Add email to "Recently Completed" section
- Document the email templates created
- Note any API routes or server actions added

Also update `.kilocode/rules/memory-bank/tech.md`:

- Add Resend to dependencies
- Document email file structure
