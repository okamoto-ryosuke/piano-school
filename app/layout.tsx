import type { Metadata } from "next";
import { Hina_Mincho } from "next/font/google";
import "./globals.css";

const hinaMincho = Hina_Mincho({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hina",
});

export const metadata: Metadata = {
  title: "高松市のエレクトーン・ピアノ教室 jouer*musique",
  description: "ピアノ教室のサイト",
  verification: {
    google: "iIPjYZ2tacvNXxtunswDQkdpwklaGfjzpmflMROW9Z8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${hinaMincho.variable} antialiased`}>{children}</body>
    </html>
  );
}
