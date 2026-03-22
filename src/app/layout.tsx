import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Callix AI — Ultra-Realistic AI Voice Receptionist",
  description:
    "The #1 AI voice receptionist. Answer every call, qualify leads, and take intake — 24/7 for a flat monthly rate. Plans from $99/mo. Indistinguishable from a real human agent.",
  keywords: [
    "AI receptionist",
    "voice agent",
    "AI phone answering",
    "AI intake",
    "voice AI SaaS",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geist.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
