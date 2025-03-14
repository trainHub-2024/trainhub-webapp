import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { Appointment } from "@/types/appwrite.types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const APP_NAME = process.env.APP_NAME!;

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export function formatTimeRange(startTime: Date, endTime: Date): string {
  return `${format(startTime, "h:mm a")} - ${format(endTime, "h:mm a")}`;
}

export function computeTrainerIncome(data: Appointment) {
  const duration = data.duration ?? 1;
  const COMMISSIONS: any = {
    1: 0.25,
    2: 0.3,
    3: 0.35,
    4: 0.4,
    default: 0.4,
  };

  const rate = COMMISSIONS[duration] ?? COMMISSIONS.default;
  const session_fee = duration * data.price;
  const commission_fee = session_fee * rate;
  const transaction_fee = 25;

  return session_fee - commission_fee - transaction_fee;
}
