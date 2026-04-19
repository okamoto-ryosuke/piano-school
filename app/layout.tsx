import type { Metadata } from "next";
import { Hina_Mincho } from "next/font/google";
import "./globals.css";

// ひな明朝の設定。weightは400のみ、variableでCSS変数を定義。
const hinaMincho = Hina_Mincho({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hina",
});

export const metadata: Metadata = {
  title: "jouer*musique ピアノ教室",
  description: "ピアノ教室のサイト",
  verification: {
    google: "tBjJTm8uiZp_0QSigi2_r6LvlwF5ZtB7u1FKKmCfDFg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      {/* hinaMincho.variableをクラスに追加し、antialiasedで文字を綺麗に表示 */}
      <body className={`${hinaMincho.variable} antialiased`}>{children}</body>
    </html>
  );
}
