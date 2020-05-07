import dayjs from "dayjs";

export function parseDate(date: Date): string {
  return dayjs(date).format("hh:mm a MMM D YYYY");
};