"use client";

import React, { useState } from "react";

// 選択肢の定義
const TIME_OPTIONS = [
  "いつでも可",
  "午前中",
  "12時〜14時",
  "14時〜16時",
  "16時〜18時",
  "18時以降",
  "平日の夜",
  "土日の終日",
];

interface ReservationFormProps {
  selectedLesson: {
    lessonDate: string;
    startTime: string;
    endTime: string;
  };
  onSuccess: () => void;
  onFetchLessons: () => void;
  allLessons: any[];
}

export default function ReservationForm({
  selectedLesson,
  onSuccess,
  onFetchLessons,
  allLessons,
}: ReservationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    email: "",
    preferredTime: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLesson.startTime) return;

    setIsSubmitting(true);
    try {
      // 該当するレッスンIDを特定
      const targetLesson = allLessons.find(
        (l: any) =>
          l.lessonDate.split("T")[0] === selectedLesson.lessonDate &&
          (l.startTime.includes("T")
            ? l.startTime.split("T")[1].slice(0, 5)
            : l.startTime.slice(0, 5)) === selectedLesson.startTime,
      );

      const res = await fetch("/api/lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: (targetLesson as any)?.id,
          lessonDate: selectedLesson.lessonDate,
          startTime: selectedLesson.startTime,
          endTime: selectedLesson.endTime,
          studentName: userDetails.name,
          phone: userDetails.phone,
          email: userDetails.email,
          preferredTime: userDetails.preferredTime,
        }),
      });

      if (res.ok) {
        onSuccess();
        setUserDetails({ name: "", phone: "", email: "", preferredTime: "" });
        onFetchLessons(); // 親のリストを更新
      }
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-brand-muted font-[family-name:var(--font-hina)]"
    >
      {/* 見出し: text-xl (20px) -> text-2xl (24px) */}
      <h3 className="text-2xl font-bold mb-10 text-center tracking-widest text-brand">
        お客様情報
      </h3>

      <div className="space-y-8">
        {" "}
        {/* 全体の間隔を少し広げてゆとりを */}
        {/* 各入力ブロック */}
        <div className="space-y-3">
          {/* ラベル: text-[10px] -> text-[14px] にアップ */}
          <label className="text-[14px] font-bold uppercase tracking-[0.15em] px-1 opacity-80 text-brand">
            お名前
          </label>
          <input
            type="text"
            required
            placeholder="山田 太郎"
            style={{ backgroundColor: "var(--bg-card)" }}
            className="w-full p-4 rounded-xl border border-brand-muted focus:bg-white focus:border-brand outline-none transition-all text-base"
            value={userDetails.name}
            onChange={(e) =>
              setUserDetails({ ...userDetails, name: e.target.value })
            }
          />
        </div>
        <div className="space-y-3">
          <label className="text-[14px] font-bold uppercase tracking-[0.15em] px-1 opacity-80 text-brand">
            電話番号
          </label>
          <input
            type="tel"
            required
            placeholder="09012345678"
            style={{ backgroundColor: "var(--bg-card)" }}
            className="w-full p-4 rounded-xl border border-brand-muted focus:bg-white focus:border-brand outline-none transition-all"
            value={userDetails.phone}
            onChange={(e) =>
              setUserDetails({ ...userDetails, phone: e.target.value })
            }
          />
        </div>
        <div className="space-y-3">
          <label className="text-[14px] font-bold uppercase tracking-[0.15em] px-1 opacity-80 text-brand">
            メールアドレス
          </label>
          <input
            type="email"
            required
            placeholder="example@mail.com"
            style={{ backgroundColor: "var(--bg-card)" }}
            className="w-full p-4 rounded-xl border border-brand-muted focus:bg-white focus:border-brand outline-none transition-all"
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
          />
        </div>
        <div className="space-y-5 pt-4">
          <label className="text-[14px] font-bold uppercase tracking-[0.15em] px-1 opacity-80 text-brand">
            折り返し電話の希望時間
          </label>
          <div className="flex flex-wrap gap-2.5 mb-3">
            {TIME_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() =>
                  setUserDetails({ ...userDetails, preferredTime: option })
                }
                className={`px-4 py-2 rounded-full text-[14px] font-bold transition-all border ${
                  userDetails.preferredTime === option
                    ? "bg-brand text-white border-brand shadow-md"
                    : "bg-white text-brand border-brand/20 hover:border-brand/50"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <input
            type="text"
            required
            placeholder="または自由に入力してください"
            style={{ backgroundColor: "var(--bg-card)" }}
            className="w-full p-4 rounded-xl border border-brand-muted focus:bg-white focus:border-brand outline-none transition-all"
            value={userDetails.preferredTime}
            onChange={(e) =>
              setUserDetails({ ...userDetails, preferredTime: e.target.value })
            }
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !selectedLesson.startTime}
        className="w-full mt-12 py-5 bg-brand text-white rounded-2xl font-bold text-lg shadow-lg hover:brightness-90 disabled:bg-gray-200 transition-all active:scale-[0.98] tracking-widest"
      >
        {isSubmitting ? "送信中..." : "予約を確定する"}
      </button>
    </form>
  );
}
