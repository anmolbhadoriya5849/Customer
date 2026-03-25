import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PassX – Secure Event Ticketing & QR Pass System",
  description:
    "PassX is an offline-first event ticketing platform for concerts and festivals. Sell tickets, manage distributors, and validate cryptographic QR passes securely.",
  keywords: [
    "event ticketing platform",
    "QR code tickets",
    "concert ticketing",
    "offline ticket validation",
    "PassX",
    "passx",
    "event management",
    "passx tickets",
    "Passx"
  ],
  openGraph: {
    title: "PassX – The OS for Live Events",
    description:
      "Secure, offline-first ticketing with cryptographic QR passes for concerts and large-scale events.",
    url: "https://passx.in",
    siteName: "PassX",
    images: [
      {
        url: "https://passx.in/og.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0A0C10] text-slate-200 dark selection:bg-cyan-500/30 font-sans`}
      >
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-500/5 blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-violet-500/5 blur-[120px]" />
        </div>
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
        <Toaster richColors position="top-center" theme="dark" />
      </body>
    </html>
  );
}
