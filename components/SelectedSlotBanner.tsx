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
      <div className="text-sm opacity-40 border-2 border-dashed rounded-2xl italic px-8 py-4 border-brand-muted text-brand text-center">
        カレンダーから枠を選択してください
      </div>
    );

  return (
    <div className="h-24 flex items-center justify-center mb-4">
      <div className="bg-brand text-white px-8 py-4 rounded-full inline-flex items-center gap-4 shadow-lg animate-in fade-in zoom-in-95 duration-300">
        <div className="flex flex-col items-start leading-none">
          <span className="text-[10px] opacity-70 mb-1 uppercase tracking-wider font-bold">
            選択中の日時
          </span>
          <span className="text-lg font-bold">
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
            width="20"
            height="20"
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
