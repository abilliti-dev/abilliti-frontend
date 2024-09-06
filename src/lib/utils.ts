import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCountdownTime(seconds: number, contdownSeconds: number): string {
  const time = contdownSeconds - seconds;
  const mins = Math.floor((time % 3600) / 60);
  const secs = time % 60;

  const formattedMins = mins.toString().padStart(2, "0");
  const formattedSecs = secs.toString().padStart(2, "0");

  return `${formattedMins}:${formattedSecs}`;
}
