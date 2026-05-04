"use client";

import { useEffect, useState, useCallback } from "react";
import AdminCalendar from "@/components/AdminCalendar";

export default function AdminPage() {
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLessons = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/lessons");
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      setLessons(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Data fetch error:", err);
      setLessons([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  const getNextSlotTime = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    let newH = h;
    let newM = m + 30;
    if (newM >= 60) {
      newH += 1;
      newM = 0;
    }
    return `${String(newH).padStart(2, "0")}:${String(newM).padStart(2, "0")}`;
  };

  // ✅ ワンタップで startTime〜+30分 の枠を即登録
  const handleSlotClick = async (date: string, time: string) => {
    const exists = lessons.some((l) => {
      const lDate = l.lessonDate.includes("T")
        ? l.lessonDate.split("T")[0]
        : l.lessonDate;
      const lStart = l.startTime.includes("T")
        ? l.startTime.split("T")[1].slice(0, 5)
        : l.startTime.slice(0, 5);
      const lEnd = l.endTime.includes("T")
        ? l.endTime.split("T")[1].slice(0, 5)
        : l.endTime.slice(0, 5);
      return lDate === date && time >= lStart && time < lEnd;
    });
    if (exists) return;

    const endTime = getNextSlotTime(time);

    try {
      const res = await fetch("/api/lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonDate: date,
          startTime: time,
          endTime,
          studentName: "",
        }),
      });

      if (res.ok) {
        fetchLessons();
      } else {
        const errData = await res.json();
        console.error("Save error:", errData);
      }
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfaf8] font-[family-name:var(--font-hina)]">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl text-[#794C57] tracking-[0.2em] font-bold">
              予約可能枠の設定
            </h1>
            {/* ✅ stepが不要になったので説明文を1本化 */}
            <p className="text-sm text-[#794C57]/60 mt-2">
              {loading
                ? "データを読み込んでいます..."
                : "カレンダーをタップすると30分枠が即登録されます。"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchLessons}
              disabled={loading}
              className="text-xs border border-[#794C57]/20 px-4 py-2 rounded-full text-[#794C57] hover:bg-[#794C57]/5 transition-colors disabled:opacity-50"
            >
              表示を更新 ↻
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#794C57]/10 overflow-hidden">
          <AdminCalendar
            lessons={lessons}
            onRefresh={fetchLessons}
            onSlotClick={handleSlotClick}
            // ✅ selectionは不要になったので空固定
            selection={{ date: "", start: "", end: "" }}
          />
        </div>

        <div className="mt-6 p-4 bg-[#794C57]/5 rounded-xl border border-[#794C57]/10">
          <h3 className="text-[#794C57] text-sm font-bold mb-1">
            使い方ガイド
          </h3>
          <ul className="text-[#794C57]/70 text-xs list-disc list-inside space-y-1">
            <li>
              カレンダーの空いている場所をタップすると30分枠が即登録されます。
            </li>
            <li>
              枠を消したい場合は、作成された枠の右上にある「×」ボタンを押してください。
            </li>
            <li>学生が既に予約した枠（グレー表示）は削除できません。</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
