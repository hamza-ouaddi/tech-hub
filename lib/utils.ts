import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDateFormat = (createdAt: Date): string => {
  const now = new Date();
  const secondsPast = (now.getTime() - createdAt.getTime()) / 1000;

  if (secondsPast < 60) {
    // less than a minute
    return `${Math.floor(secondsPast)} seconds ago`;
  }
  if (secondsPast < 3600) {
    // less than an hour
    return `${Math.floor(secondsPast / 60)} minutes ago`;
  }
  if (secondsPast < 86400) {
    // less than a day
    return `${Math.floor(secondsPast / 3600)} hours ago`;
  }
  if (secondsPast < 2592000) {
    // less than a month
    return `${Math.floor(secondsPast / 86400)} days ago`;
  }
  if (secondsPast < 31536000) {
    // less than a year
    return `${Math.floor(secondsPast / 2592000)} months ago`;
  }
  // more than a year
  return `${Math.floor(secondsPast / 31536000)} years ago`;
};

export const formatNumber = (num: number): string => {
  if (num < 1000) {
    return num.toString();
  }
  if (num < 1000000) {
    return (num / 1000).toFixed(1) + "K";
  }
  if (num < 1000000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  return (num / 1000000000).toFixed(1) + "B";
};

export const formatDateToMonthYear = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};
