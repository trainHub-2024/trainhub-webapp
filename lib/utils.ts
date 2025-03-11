import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const APP_NAME = process.env.APP_NAME!;

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export function formatTimeRange(startTime: Date, endTime: Date): string {
  return `${format(startTime, "h:mm a")} - ${format(endTime, "h:mm a")}`;
}
