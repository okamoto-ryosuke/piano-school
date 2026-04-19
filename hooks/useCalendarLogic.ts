import { useCallback } from "react";

/**
 * カレンダーの表示や特定のスロット（時間枠）の判定ロジックに特化したフック
 */
export const useCalendarLogic = (lessons: any[]) => {
  /**
   * 指定された日付と時間が「空き枠」かどうかを判定する
   * @param date "2023-10-27"
   * @param time "10:00"
   */
  const getAvailableLessonAt = useCallback(
    (date: string, time: string) => {
      return lessons.find((lesson) => {
        const lessonDate = lesson.lessonDate.split("T")[0];
        const startTime = lesson.startTime.slice(0, 5);
        const endTime = lesson.endTime.slice(0, 5);

        const isTimeMatch = time >= startTime && time < endTime;
        const isDateMatch = lessonDate === date;
        const isVacant =
          !lesson.studentName || lesson.studentName.trim() === "";

        return isDateMatch && isTimeMatch && isVacant;
      });
    },
    [lessons],
  );

  return { getAvailableLessonAt };
};
