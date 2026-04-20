import React from "react";

/**
 * 背景のない、完全に透過したヘッダーコンポーネント
 * * 修正ポイント:
 * 1. 予約ボタンのリンク先を /calendar から /reservation に変更しました。
 */
export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-transparent">
      <div className="py-2 px-[5%] md:py-3 flex items-center justify-between w-full">
        {/* 左側：教室名 */}
        <a href="/" className="group flex flex-col items-start">
          {/* サブタイトル：少し小さく、上の余白を調整 */}
          <span className="text-[20px] md:text-[20px] font-bold text-[#794C57]/80 tracking-[0.3em] mb-[-4px] md:mb-[-8px] ml-1 font-[family-name:var(--font-hina)]">
            jouer*musique
          </span>

          {/* メインの教室名 */}
          <h1 className="text-[24px] md:text-[28px] font-normal text-[#794C57] tracking-[0.2em] transition-opacity group-hover:opacity-70 drop-shadow-md font-[family-name:var(--font-hina)]">
            エレクトーン・ピアノ教室
          </h1>
        </a>

        {/* 右側：ナビゲーション */}
        <nav className="flex items-center gap-4 md:gap-8 font-normal">
          <a
            href="/"
            className="hidden sm:block text-[#794C57] text-sm md:text-lg tracking-wider hover:opacity-60 transition-opacity drop-shadow-sm font-[family-name:var(--font-hina)]"
          >
            教室について
          </a>
          <a
            href="/#access"
            className="hidden sm:block text-[#794C57] text-sm md:text-lg tracking-wider hover:opacity-60 transition-opacity drop-shadow-sm font-[family-name:var(--font-hina)]"
          >
            アクセス
          </a>

          {/* 予約ボタン: リンク先を /reservation に変更 */}
          <a
            href="/reservation"
            className="bg-[#794C57] text-[#ECDCE2] px-6 py-2.5 md:px-8 md:py-3 rounded-full text-sm md:text-lg tracking-widest shadow-lg hover:bg-[#794C57]/90 transition-all active:scale-95 font-[family-name:var(--font-hina)]"
          >
            無料体験申し込み
          </a>
        </nav>
      </div>
    </header>
  );
}
