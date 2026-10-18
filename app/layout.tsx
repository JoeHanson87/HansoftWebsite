import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hansoft Industries | Web SaaS & AI Consulting",
  description:
    "Hansoft Industries builds web SaaS products and helps small businesses integrate AI workflows to save time and cut costs. Based in Kent, UK.",
  openGraph: {
    title: "Hansoft Industries | Web SaaS & AI Consulting",
    description: "Web SaaS products and practical AI consulting for small businesses.",
    type: "website",
    locale: "en_GB",
  },
};

export const viewport: Viewport = { themeColor: "#05060d" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="noise min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
