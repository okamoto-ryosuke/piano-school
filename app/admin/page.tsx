"use client";

import { useEffect, useState, useCallback } from "react";
import AdminCalendar from "@/components/AdminCalendar";

/**
 * 管理者用メインページ
 * 予約可能枠（空き枠）の作成・削除を管理します。
 */
export default function AdminPage() {
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 選択状態の管理
  const [form, setForm] = useState({
    lessonDate: "",
    startTime: "",
    endTime: "",
  });
  const [step, setStep] = useState<"start" | "end">("start");

  // データの取得
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

  /**
   * 30分後の時間を計算するヘルパー
   */
  const getNextSlotTime = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    let newH = h;
    let newM = m + 30;
    if (newM >= 60) {
      newH += 1;
      newM = 0;
    }
    // 24時を超えた場合のガードは必要に応じて追加
    return `${String(newH).padStart(2, "0")}:${String(newM).padStart(2, "0")}`;
  };

  /**
   * カレンダースロットクリック時の処理
   * 1回目：開始時間を選択
   * 2回目：終了時間を決定して保存
   */
  const handleSlotClick = async (date: string, time: string) => {
    // 既存の枠がある場合は何もしない（削除はカレンダー内の×ボタンで行う）
    const exists = lessons.some((l) => {
      const lDate = l.lessonDate.split("T")[0];
      const lStart = l.startTime.includes("T")
        ? l.startTime.split("T")[1].slice(0, 5)
        : l.startTime.slice(0, 5);
      const lEnd = l.endTime.includes("T")
        ? l.endTime.split("T")[1].slice(0, 5)
        : l.endTime.slice(0, 5);
      return lDate === date && time >= lStart && time < lEnd;
    });
    if (exists) return;

    if (step === "start" || date !== form.lessonDate) {
      // 開始時間の選択
      setForm({ lessonDate: date, startTime: time, endTime: "" });
      setStep("end");
    } else {
      // 終了時間の選択（開始時間より前なら開始時間を更新）
      if (time < form.startTime) {
        setForm({ lessonDate: date, startTime: time, endTime: "" });
      } else {
        const calculatedEndTime = getNextSlotTime(time);
        const finalForm = {
          lessonDate: date,
          startTime: form.startTime,
          endTime: calculatedEndTime,
          studentName: "", // 管理者が作成する時点では空
        };

        try {
          const res = await fetch("/api/lessons", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(finalForm),
          });

          if (res.ok) {
            setForm({ lessonDate: "", startTime: "", endTime: "" });
            setStep("start");
            fetchLessons();
          } else {
            const errData = await res.json();
            console.error("Save error:", errData);
          }
        } catch (err) {
          console.error("Submit error:", err);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfaf8] font-[family-name:var(--font-hina)]">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* ヘッダーエリア */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl text-[#794C57] tracking-[0.2em] font-bold">
              予約可能枠の設定
            </h1>
            <p className="text-sm text-[#794C57]/60 mt-2">
              {loading
                ? "データを読み込んでいます..."
                : step === "start"
                  ? "カレンダーをクリックして「開始時間」を選択してください。"
                  : "「終了時間（枠の終わり）」をクリックして確定してください。"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {step === "end" && (
              <button
                onClick={() => {
                  setStep("start");
                  setForm({ lessonDate: "", startTime: "", endTime: "" });
                }}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-full transition-colors"
              >
                キャンセル
              </button>
            )}
            <button
              onClick={fetchLessons}
              disabled={loading}
              className="text-xs border border-[#794C57]/20 px-4 py-2 rounded-full text-[#794C57] hover:bg-[#794C57]/5 transition-colors disabled:opacity-50"
            >
              表示を更新 ↻
            </button>
          </div>
        </div>

        {/* メインカレンダー */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#794C57]/10 overflow-hidden">
          <AdminCalendar
            lessons={lessons}
            onRefresh={fetchLessons}
            onSlotClick={handleSlotClick}
            selection={{
              date: form.lessonDate,
              start: form.startTime,
              end: form.endTime,
            }}
          />
        </div>

        {/* 注意事項 */}
        <div className="mt-6 p-4 bg-[#794C57]/5 rounded-xl border border-[#794C57]/10">
          <h3 className="text-[#794C57] text-sm font-bold mb-1">
            使い方ガイド
          </h3>
          <ul className="text-[#794C57]/70 text-xs list-disc list-inside space-y-1">
            <li>
              カレンダーの空いている場所をクリックすると予約枠の作成を開始します。
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
