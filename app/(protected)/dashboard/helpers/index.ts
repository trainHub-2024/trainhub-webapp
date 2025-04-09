import { format } from "date-fns";
import { DateRangeType } from "../context";

export const formatDate = (date: string | Date) =>
  new Date(date).toISOString().split("T")[0];

export const generateDateRange = (start: Date, end: Date): string[] => {
  const dates: string[] = [];
  const currentDate = new Date(start);

  while (currentDate <= new Date(end)) {
    dates.push(format(currentDate, "yyyy-MM-dd")); // Add date to list in 'YYYY-MM-DD' format
    currentDate.setDate(currentDate.getDate() + 1); // Increment to the next day
  }

  return dates;
};

export const groupByDate = <T>(
  data: T[],
  getDate: (item: T) => string | Date
): { date: string; count: number }[] => {
  const grouped: Record<string, number> = data.reduce((acc: any, item) => {
    const date = formatDate(getDate(item));
    acc[date] = (acc[date] || 0) + 1; // Increment count or initialize
    return acc;
  }, {});

  return Object.entries(grouped).map(([date, count]) => ({
    date: format(new Date(date), "MM/dd"),
    count,
  }));
};
