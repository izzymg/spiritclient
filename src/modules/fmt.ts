import dayjs from "dayjs";

export function parseDate(date: Date): string {
  return dayjs(date).format("MMM D YYYY hh:mm a");
};