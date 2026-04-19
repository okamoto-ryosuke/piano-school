import { useState, useCallback, useEffect } from "react";

/**
 * Interface for the lesson data structure
 */
interface Lesson {
  id: string;
  title: string;
  startAt: string; // ISO String
  endAt: string; // ISO String
  instructor: string;
  status: "available" | "booked" | "canceled";
}

/**
 * Custom hook to fetch and manage lesson data from the API
 * * @returns {Object} lessons - Array of lesson objects
 * @returns {boolean} isLoading - Current fetching status
 * @returns {string | null} error - Error message if any
 * @returns {Function} refetch - Function to manually refresh data
 */
export const useLessonData = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Function to fetch data from the server
   */
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/lessons", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const data = await response.json();

      // Basic validation: ensure data is an array
      if (Array.isArray(data)) {
        setLessons(data);
      } else {
        console.error("Expected an array but received:", data);
        setLessons([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      console.error("Error in useLessonData:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    lessons,
    isLoading,
    error,
    refetch: fetchData,
  };
};
