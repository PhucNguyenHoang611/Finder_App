import {
  format,
  isToday,
  isYesterday,
  differenceInMinutes,
  differenceInHours
} from "date-fns";

export function formatTimeToString(date: Date): string {
  if (date) {
    const now = new Date();

    if (isToday(date)) {
      const minutesDiff = differenceInMinutes(now, date);
      const hoursDiff = differenceInHours(now, date);

      if (minutesDiff < 1) {
        return "vừa xong";
      } else if (minutesDiff < 60) {
        return `${minutesDiff} phút trước`;
      } else if (hoursDiff < 24) {
        return format(date, "h:mm a");
      }
    } else if (isYesterday(date)) {
      return `Hôm qua lúc ${format(date, "h:mm a")}`;
    } else {
      return format(date, "dd/MM/yyyy");
    }
  }

  return "";
}
