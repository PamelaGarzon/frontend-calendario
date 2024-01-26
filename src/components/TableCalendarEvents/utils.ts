import { isToday, isYesterday, isBefore } from "date-fns";
import { utcToZonedTime, OptionsWithTZ } from "date-fns-tz";

export function getStatus(startDateTime: string, endDateTime: string) {
  const currentDate = new Date();
  const timezone = "America/Sao_Paulo";

  const startDate = utcToZonedTime(new Date(startDateTime), timezone);
  const endDate = utcToZonedTime(new Date(endDateTime), timezone);

  if (
    isToday(startDate) &&
    currentDate >= startDate &&
    currentDate <= endDate
  ) {
    return "Em andamento";
  } else if (isYesterday(startDate) || isBefore(startDate, currentDate)) {
    return "Finalizado";
  }

  return "Confirmado";
}
