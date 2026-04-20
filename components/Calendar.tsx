"use client";

import React, { useState } from "react";

interface Lesson {
  lessonDate: string;
  startTime: string;
  endTime: string;
  studentName?: string;
}

interface CalendarProps {
  lessons: Lesson[];
  onSlotClick: (date: string, time: string) => void;
  selection: {
    date: string;
    start: string;
    end: string;
  };
}

export const Calendar = ({
  lessons,
  onSlotClick,
  selection,
}: CalendarProps) => {
  // 基準となる「今週の月曜日」を計算
  const getInitialMonday = () => {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - (day === 0 ? 6 : day - 1);
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

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  return (
    <div className="flex flex-col gap-4">
      {/* ナビゲーション */}
      <div className="flex justify-end items-center gap-4 px-4 pt-2">
        <span className="text-base md:text-lg font-bold text-[#794C57] tracking-widest">
          {currentWeekStart.getFullYear()}年 {currentWeekStart.getMonth() + 1}月
        </span>
        <div className="flex gap-1">
          <button
            onClick={() => changeWeek(-1)}
            disabled={isPrevDisabled}
            className={`p-2 rounded-full border border-[#794C57]/20 text-[#794C57] transition-all ${
              isPrevDisabled
                ? "opacity-20 cursor-not-allowed"
                : "hover:bg-[#794C57]/5 active:scale-95"
            }`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => changeWeek(1)}
            disabled={isNextDisabled}
            className={`p-2 rounded-full border border-[#794C57]/20 text-[#794C57] transition-all ${
              isNextDisabled
                ? "opacity-20 cursor-not-allowed"
                : "hover:bg-[#794C57]/5 active:scale-95"
            }`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-[#794C57]/10 font-[family-name:var(--font-hina)]">
        <div className="min-w-[800px] pb-12 pt-10">
          <div className="grid grid-cols-[100px_repeat(7,1fr)] text-center text-[#794C57] mb-6">
            <div className="border-r border-transparent"></div>
            {weekDays.map((date) => (
              <div
                key={date.toString()}
                className="px-2 border-r border-[#794C57]/10 last:border-r-0"
              >
                <div className="text-[16px] md:text-[18px] opacity-100 tracking-wider">
                  {date.getMonth() + 1}/{date.getDate()}
                </div>
                <div className="font-bold text-base">
                  ({date.toLocaleDateString("ja-JP", { weekday: "short" })})
                </div>
              </div>
            ))}
          </div>

          <div className="relative border-[#794C57]/10">
            {HOURS.map((time, idx) => {
              const isLast = idx === HOURS.length - 1;
              return (
                <div
                  key={time}
                  className="grid grid-cols-[100px_repeat(7,1fr)] relative"
                >
                  <div className="relative h-0 pointer-events-none">
                    <span className="absolute -top-[10px] left-0 w-full text-center text-[13px] md:text-[14px] font-bold text-[#794C57]/80 pr-4">
                      {time}
                    </span>
                  </div>

                  {!isLast &&
                    weekDays.map((date) => {
                      const dateStr = formatDate(date);
                      const activeLesson = lessons.find(
                        (l) =>
                          l.lessonDate === dateStr &&
                          time >= l.startTime &&
                          time < l.endTime,
                      );
                      const isSelected =
                        selection.date === dateStr &&
                        time >= selection.start &&
                        time < selection.end;
                      const isAvailable =
                        activeLesson &&
                        (!activeLesson.studentName ||
                          activeLesson.studentName === "");
                      const isBooked =
                        activeLesson &&
                        activeLesson.studentName &&
                        activeLesson.studentName !== "";
                      const isStart = activeLesson?.startTime === time;
                      const isSelectionStart = selection.start === time;
                      const nextTime = HOURS[idx + 1];
                      const isNextBooked =
                        isBooked && activeLesson.endTime > nextTime;
                      const isNextSelected =
                        isSelected && selection.end > nextTime;

                      return (
                        <div
                          key={`${dateStr}-${time}`}
                          onClick={() =>
                            isAvailable && onSlotClick(dateStr, time)
                          }
                          className={`h-[60px] relative border-t border-[#794C57]/10 border-r border-[#794C57]/5 last:border-r-0
                          ${isAvailable ? "cursor-pointer hover:bg-[#794C57]/5 bg-white transition-all" : "bg-gray-50/20 cursor-default"}
                          ${isSelected ? "bg-[#794C57]/15" : ""}`}
                        >
                          {isAvailable && !isSelected && (
                            <div className="absolute inset-0 flex items-center justify-center text-[#794C57] opacity-30">
                              <span className="text-lg font-bold">○</span>
                            </div>
                          )}
                          {isBooked && (
                            <div
                              className={`absolute inset-x-1 bg-[#794C57]/90 text-white px-2 flex flex-col justify-center shadow-sm z-10
                            ${isStart ? "top-1 rounded-t-md mt-1" : "top-0"}
                            ${isNextBooked ? "bottom-0" : "bottom-1 rounded-b-md mb-1"}`}
                              style={{
                                height: isNextBooked
                                  ? "calc(100% + 1px)"
                                  : "auto",
                              }}
                            >
                              {isStart && (
                                <span className="font-bold text-[12px] md:text-[13px] text-center tracking-tighter">
                                  予約済
                                </span>
                              )}
                            </div>
                          )}
                          {isSelected && (
                            <div
                              className={`absolute inset-x-1 bg-[#794C57] text-white px-2 flex flex-col justify-center shadow-md z-20 animate-in fade-in zoom-in-95
                            ${isSelectionStart ? "top-1 rounded-t-md mt-1" : "top-0"}
                            ${isNextSelected ? "bottom-0" : "bottom-1 rounded-b-md mb-1"}`}
                              style={{
                                height: isNextSelected
                                  ? "calc(100% + 1px)"
                                  : "auto",
                              }}
                            >
                              {isSelectionStart && (
                                <span className="font-bold text-[10px] text-center tracking-tighter">
                                  選択中
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
