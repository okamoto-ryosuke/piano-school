import React from "react";
import { prisma } from "../lib/db"; // 🌟 パスが正しいか確認してください

export default async function Footer() {
  // 🌟 ここでデータを取得（これがないと ReferenceError になります）
  const instagramIcon = await prisma.image.findUnique({
    where: { id: 7 },
  });

  return (
    <footer
      className="
      relative 
      left-[50%] 
      right-[50%] 
      ml-[-50vw] 
      mr-[-50vw] 
      w-[100vw] 
      bg-[#794C57] 
      text-[#ECDCE2]
      /* mt-20 は flex-grow があれば不要になるので削除するか調整 */
    "
    >
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          {/*  ロゴ・コンセプト */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-normal tracking-[0.2em] font-[family-name:var(--font-hina)]">
              エレクトーン・
              <br />
              ピアノ教室
            </h2>
            <p className="text-[16px] md:text-[16px] opacity-90 leading-loose">
              jouer*musique
              <br />
              音で遊ぶ、音楽を奏でる、感性を磨く。
            </p>
          </div>

          {/* 2. メニュー */}
          <nav className="flex flex-col gap-3 text-sm md:pl-10">
            <p className="font-bold mb-2 opacity-50 uppercase tracking-widest text-xs">
              Menu
            </p>
            <a href="/" className="hover:opacity-70 transition-opacity w-fit">
              教室について
            </a>
            <a
              href="/#courses"
              className="hover:opacity-70 transition-opacity w-fit"
            >
              コース・お月謝
            </a>
            <a
              href="/#access"
              className="hover:opacity-70 transition-opacity w-fit"
            >
              アクセス
            </a>
            <a
              href="/reservation"
              className="text-[#fce7f3] font-bold hover:opacity-70 transition-opacity w-fit"
            >
              無料体験お申し込み
            </a>
          </nav>

          {/* 3. 情報・SNS */}
          <div className="space-y-4 text-sm">
            <p className="font-bold mb-2 opacity-50 uppercase tracking-widest text-xs">
              Information
            </p>
            <p className="leading-loose opacity-80 text-[#ECDCE2]/80">
              香川県高松市西町（詳細はご予約後にお伝えします）
              <br />
              🅿️ 駐車場あり / 🚲 駐輪スペースあり
            </p>

            <div className="pt-2">
              <a
                href="https://www.instagram.com/jet.takamatsu_electone.piano?igsh=MWJmdTA4aWEyMmRubA%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 hover:opacity-70 transition-opacity group"
              >
                {/* 🌟 ここで instagramIcon を参照 */}
                {instagramIcon?.url ? (
                  <img
                    src={instagramIcon.url}
                    alt="Instagram"
                    className="w-6 h-6 md:w-7 md:h-7 object-contain group-hover:scale-110 transition-transform"
                  />
                ) : (
                  <span className="text-xl">📸</span>
                )}
                <span className="border-b border-transparent hover:border-[#ECDCE2]/40">
                  Instagram
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* コピーライト */}
        <div className="border-t border-[#ECDCE2]/10 mt-12 pt-8 text-center text-[10px] opacity-40 uppercase tracking-[0.3em]">
          © 2026 jouer*musique. all rights reserved.
        </div>
      </div>
    </footer>
  );
}
