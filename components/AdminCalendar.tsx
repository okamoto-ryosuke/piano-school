"use client";

import React, { useState } from "react";

// HOURS の定義を以下のように書き換えてください
const HOURS = [
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
];

type Props = {
  lessons: any[];
  onRefresh: () => void;
  onSlotClick: (date: string, time: string) => void;
  selection: { date: string; start: string; end: string };
};

export default function AdminCalendar({
  lessons,
  onRefresh,
  onSlotClick,
  selection,
}: Props) {
  const getInitialMonday = () => {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(now.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    return monday;
  };

  const initialMonday = getInitialMonday();
  const [currentWeekStart, setCurrentWeekStart] = useState(initialMonday);

  // 制限判定: 今週より前、または「再来週（14日後）」より先には行けない
  const isPrevDisabled = currentWeekStart.getTime() <= initialMonday.getTime();
  const isNextDisabled =
    currentWeekStart.getTime() >=
    initialMonday.getTime() + 14 * 24 * 60 * 60 * 1000;

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentWeekStart);
    date.setDate(date.getDate() + i);
    return date;
  });

  const changeWeek = (offset: number) => {
    if (offset < 0 && isPrevDisabled) return;
    if (offset > 0 && isNextDisabled) return;

    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + offset * 7);
    setCurrentWeekStart(newDate);
  };

  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (!confirm("この枠を削除しますか？")) return;
    try {
      const res = await fetch(`/api/lessons?id=${id}`, { method: "DELETE" });
      if (res.ok) onRefresh();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* ツールバー */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-[#794C57]/10 shadow-sm">
        <div className="flex items-center gap-4">
          <h2 className="font-bold text-[#794C57] text-lg">
            {currentWeekStart.getFullYear()}年 {currentWeekStart.getMonth() + 1}
            月
          </h2>
          <button
            onClick={() => setCurrentWeekStart(initialMonday)}
            disabled={isPrevDisabled}
            className={`px-3 py-1 text-xs font-bold border border-[#794C57]/30 rounded-full text-[#794C57] transition-all ${
              isPrevDisabled
                ? "opacity-30 cursor-default"
                : "hover:bg-[#794C57]/5"
            }`}
          >
            今週を表示
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => changeWeek(-1)}
            disabled={isPrevDisabled}
            className={`px-4 py-2 text-sm font-bold border border-[#794C57]/20 rounded-lg text-[#794C57] transition-all ${
              isPrevDisabled
                ? "opacity-20 cursor-not-allowed"
                : "hover:bg-[#794C57]/5"
            }`}
          >
            前週
          </button>
          <button
            onClick={() => changeWeek(1)}
            disabled={isNextDisabled}
            className={`px-4 py-2 text-sm font-bold border border-[#794C57]/20 rounded-lg text-[#794C57] transition-all ${
              isNextDisabled
                ? "opacity-20 cursor-not-allowed"
                : "hover:bg-[#794C57]/5"
            }`}
          >
            次週
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-[#794C57]/10">
        <div className="min-w-[800px] pb-4">
          <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-[#794C57]/10 bg-[#fdfaf8]/50 text-center font-bold text-[#794C57]">
            <div className="p-4 border-r border-[#794C57]/10 text-[10px] flex items-center justify-center opacity-40 uppercase tracking-tighter">
              Time
            </div>
            {weekDays.map((date) => (
              <div
                key={date.toString()}
                className="p-4 border-r border-[#794C57]/10 last:border-r-0"
              >
                <div className="text-[10px] opacity-40 mb-1">
                  {date.getMonth() + 1}/{date.getDate()}
                </div>
                <div className="text-sm">
                  {date.toLocaleDateString("ja-JP", { weekday: "short" })}
                </div>
              </div>
            ))}
          </div>

          <div className="relative pt-4">
            {HOURS.map((time, idx) => (
              <div key={time} className="relative group">
                <div className="flex items-center h-[60px]">
                  <div className="w-[80px] flex justify-center text-[11px] text-[#794C57]/40 font-medium">
                    {time}
                  </div>
                  <div className="flex-1 border-t border-[#794C57]/5"></div>
                </div>

                {idx < HOURS.length - 1 && (
                  <div className="absolute top-[30px] left-[80px] right-0 h-[60px] grid grid-cols-7 pointer-events-none">
                    {weekDays.map((date) => {
                      const dateStr = formatDate(date);
                      const activeLesson = lessons.find((l) => {
                        const lDate = l.lessonDate.split("T")[0];
                        const lStart = (
                          l.startTime.includes("T")
                            ? l.startTime.split("T")[1]
                            : l.startTime
                        ).slice(0, 5);
                        const lEnd = (
                          l.endTime.includes("T")
                            ? l.endTime.split("T")[1]
                            : l.endTime
                        ).slice(0, 5);
                        return (
                          lDate === dateStr && time >= lStart && time < lEnd
                        );
                      });

                      const isSelected =
                        selection.date === dateStr &&
                        time >= selection.start &&
                        (selection.end
                          ? time < selection.end
                          : time === selection.start);
                      const currentStart = (
                        activeLesson?.startTime?.includes("T")
                          ? activeLesson.startTime.split("T")[1]
                          : activeLesson?.startTime
                      )?.slice(0, 5);
                      const isStart = activeLesson && currentStart === time;
                      const isBooked =
                        activeLesson?.studentName &&
                        activeLesson.studentName !== "";

                      return (
                        <div
                          key={`${dateStr}-${time}`}
                          onClick={() => onSlotClick(dateStr, time)}
                          className={`relative border-r border-[#794C57]/5 last:border-r-0 pointer-events-auto transition-colors h-full ${isSelected ? "bg-[#794C57]/10" : "hover:bg-[#794C57]/5"}`}
                        >
                          {activeLesson && (
                            <div
                              className={`absolute inset-x-1 top-0 bottom-0 px-2 py-1 flex flex-col justify-start overflow-hidden transition-all z-10 shadow-sm
                              ${isBooked ? "bg-gray-400 text-white" : "bg-[#794C57] text-white"}
                              ${isStart ? "rounded-t-lg mt-1 pt-2" : ""}
                              ${
                                (activeLesson.endTime.includes("T")
                                  ? activeLesson.endTime.split("T")[1]
                                  : activeLesson.endTime
                                ).slice(0, 5) ===
                                (() => {
                                  const [h, m] = time.split(":").map(Number);
                                  const d = new Date();
                                  d.setHours(h);
                                  d.setMinutes(m + 30);
                                  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
                                })()
                                  ? "rounded-b-lg mb-1"
                                  : ""
                              }`}
                            >
                              {isStart && (
                                <div className="flex justify-between items-start w-full">
                                  <div className="flex flex-col">
                                    <span className="font-bold text-[9px] leading-tight">
                                      {isBooked ? "予約済" : "受付中"}
                                    </span>
                                    <span className="text-[8px] opacity-70 truncate max-w-[60px]">
                                      {activeLesson.studentName ||
                                        `${activeLesson.startTime.slice(0, 5)}-${activeLesson.endTime.slice(0, 5)}`}
                                    </span>
                                  </div>
                                  <button
                                    onClick={(e) =>
                                      handleDelete(e, activeLesson.id)
                                    }
                                    className="text-white/40 hover:text-white transition-colors p-0.5"
                                  >
                                    <svg
                                      width="10"
                                      height="10"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="3"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <line
                                        x1="18"
                                        y1="6"
                                        x2="6"
                                        y2="18"
                                      ></line>
                                      <line
                                        x1="6"
                                        y1="6"
                                        x2="18"
                                        y2="18"
                                      ></line>
                                    </svg>
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
