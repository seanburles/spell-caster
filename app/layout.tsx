import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "../styles/main.scss";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ritual Generator",
  description: "Personalized rituals, mantras, and tarot pulls.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cinzel.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
