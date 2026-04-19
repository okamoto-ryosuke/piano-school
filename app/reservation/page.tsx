"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Header from "@/components/Header";
import Subtitle from "@/components/Subtitle";
import { Calendar } from "@/components/Calendar";
import ReservationForm from "@/components/ReservationForm";
import SuccessModal from "@/components/SuccessModal";
import SelectedSlotBanner from "@/components/SelectedSlotBanner";

import { useLessonData } from "@/hooks/useLessonData";
import { useCalendarLogic } from "@/hooks/useCalendarLogic";

export default function ReservationPage() {
  // 1. データの取得管理
  const { lessons, isLoading, refetch } = useLessonData();

  // 2. カレンダーの判定ロジック
  const { getAvailableLessonAt } = useCalendarLogic(lessons);

  const [form, setForm] = useState({
    lessonDate: "",
    startTime: "",
    endTime: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  // 3. スロットクリック時の処理（ロジックはHookへ）
  const handleSlotClick = (date: string, time: string) => {
    const targetSlot = getAvailableLessonAt(date, time);

    if (targetSlot) {
      // 時間の正規化（Hook側で整形して返すとさらに綺麗ですが、一旦ここで処理）
      const normalize = (t: string) =>
        t.includes("T") ? t.split("T")[1].slice(0, 5) : t.slice(0, 5);

      setForm({
        lessonDate: date,
        startTime: normalize(targetSlot.startTime),
        endTime: normalize(targetSlot.endTime),
      });

      // スクロール処理
      setTimeout(() => {
        formRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  };

  return (
    <div
      className="pb-24 min-h-screen"
      style={{ backgroundColor: "var(--bg-main)" }}
    >
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-12">
        <Subtitle text="体験レッスン予約">
          <div className="mt-8 space-y-12">
            <div className="text-center">
              <div className="grid md:grid-cols-2 gap-6 mb-16">
                {/* 当日の流れ */}
                <div className="bg-white/50 p-8 rounded-[2rem] border border-brand-muted/30">
                  <h3 className="text-brand font-bold mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 bg-brand text-white rounded-full flex items-center justify-center text-xs">
                      1
                    </span>
                    当日の流れ
                  </h3>
                  <ul className="text-sm space-y-3 text-brand/80 leading-relaxed text-left">
                    <li>・お約束の時間にお越しください。</li>
                    <li>
                      ・実際に楽器に触れたり、レッスンの一部を体験していただきます。
                    </li>
                    <li>・不安なことやご質問など、お気軽にお話しください。</li>
                  </ul>
                  <p className="mt-4 text-xs text-brand/60 italic">
                    ※教室の雰囲気や楽器をご体験ください。
                  </p>
                </div>

                {/* 持ち物 */}
                <div className="bg-white/50 p-8 rounded-[2rem] border border-brand-muted/30">
                  <h3 className="text-brand font-bold mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 bg-brand text-white rounded-full flex items-center justify-center text-xs">
                      2
                    </span>
                    持ち物
                  </h3>
                  <div className="text-sm space-y-4 text-brand/80 leading-relaxed text-left">
                    <p>
                      基本的に持ち物は不要です。
                      <br />
                      手ぶらでお気軽にお越しください。
                    </p>
                    <p className="text-base bg-brand/5 p-3 rounded-xl">
                      もし「弾きたい曲」の楽譜をお持ちでしたら、ぜひご持参ください♪
                    </p>
                  </div>
                </div>
              </div>

              <p className="leading-relaxed opacity-80 text-brand">
                {isLoading
                  ? "予約状況を読み込んでいます..."
                  : "カレンダーの「○」がついた枠をクリックして予約時間を選択してください。"}
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-brand-muted shadow-brand/5">
              <Calendar
                lessons={lessons}
                onSlotClick={handleSlotClick}
                selection={{
                  date: form.lessonDate,
                  start: form.startTime,
                  end: form.endTime,
                }}
              />
            </div>

            <div className="flex justify-center gap-8 text-xs font-bold text-brand mt-6">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 flex items-center justify-center rounded-full text-[10px] border border-brand-muted bg-brand/5">
                  ○
                </span>
                <span>予約可能</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-1 bg-gray-200 rounded-full" />
                <span className="opacity-50">予約不可</span>
              </div>
            </div>

            <div
              ref={formRef}
              className={`mt-16 transition-all duration-500 ${!form.startTime ? "opacity-30 grayscale pointer-events-none translate-y-4" : "opacity-100 translate-y-0"}`}
            >
              <SelectedSlotBanner
                date={form.lessonDate}
                start={form.startTime}
                end={form.endTime}
                onClear={() =>
                  setForm({ lessonDate: "", startTime: "", endTime: "" })
                }
              />
              <ReservationForm
                selectedLesson={form}
                allLessons={lessons}
                onFetchLessons={refetch} // refetchを渡す
                onSuccess={() => {
                  setShowSuccess(true);
                  setForm({ lessonDate: "", startTime: "", endTime: "" });
                  refetch(); // 成功後にデータを再取得
                }}
              />
            </div>
          </div>
        </Subtitle>
        <SuccessModal
          isOpen={showSuccess}
          onClose={() => setShowSuccess(false)}
        />
      </main>
    </div>
  );
}
