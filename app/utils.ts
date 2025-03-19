import { format, fromUnixTime } from "date-fns";

export const formatUnixTimeToDateTime = (unixTime: number) =>
  format(fromUnixTime(unixTime), "dd.MM.yyyy hh:mm.ss");
