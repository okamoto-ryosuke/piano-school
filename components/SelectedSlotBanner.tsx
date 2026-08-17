"use client";

import React from "react";

interface SelectedSlotBannerProps {
  date: string;
  start: string;
  end: string;
  onClear: () => void;
}

export default function SelectedSlotBanner({
  date,
  start,
  end,
  onClear,
}: SelectedSlotBannerProps) {
  // 日付が未選択なら何も表示しない
  if (!start)
    return (
      <div className="text-xs md:text-sm opacity-40 border-2 border-dashed rounded-2xl italic px-5 py-3 md:px-8 md:py-4 border-brand-muted text-brand text-center">
        カレンダーから枠を選択してください
      </div>
    );

  return (
    <div className="min-h-24 flex items-center justify-center mb-4 px-4">
      <div className="bg-brand text-white px-5 py-3 md:px-8 md:py-4 rounded-2xl md:rounded-full inline-flex items-center gap-3 md:gap-4 shadow-lg animate-in fade-in zoom-in-95 duration-300 flex-wrap justify-center">
        <div className="flex flex-col items-start leading-none">
          <span className="text-[9px] md:text-[10px] opacity-70 mb-1 uppercase tracking-wider font-bold">
            選択中の日時
          </span>
          <span className="text-sm md:text-lg font-bold">
            {date} (
            {new Date(date).toLocaleDateString("ja-JP", { weekday: "short" })})
            <span className="ml-2 font-mono">
              {start} - {end}
            </span>
          </span>
        </div>

        {/* キャンセルボタン */}
        <button
          onClick={onClear}
          className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
          aria-label="選択を解除"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            className="md:w-5 md:h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
}
