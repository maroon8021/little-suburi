import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

const JAPAN_TIMEZONE = "Asia/Tokyo";
const JAPAN_TIMEZONE_OFFSET = 9;

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.tz.setDefault(JAPAN_TIMEZONE);

export type JstYearMonth = {
  toDate: Date;
  year: number;
  month: number;
  date: number;
};

const createMonthInJst = (
  date: Date,
  offset: number,
  dateTarget: "START" | "END" = "START"
): JstYearMonth => {
  const dayjsWithJstDate = dayjs(date)
    .add(JAPAN_TIMEZONE_OFFSET, "hour") // これをしないと `日本時間` の月初00:00(=日本時間からみたときの前日15:00)の時刻にならない
    .tz(JAPAN_TIMEZONE, true);

  let dayjsWithJstDateAndOffset: dayjs.Dayjs;

  dayjsWithJstDateAndOffset = dayjsWithJstDate
    .month(dayjsWithJstDate.month() + offset)
    .startOf("month");

  if (dateTarget === "END") {
    dayjsWithJstDateAndOffset = dayjsWithJstDateAndOffset.endOf("month");
  }

  return {
    toDate: dayjsWithJstDateAndOffset.toDate(),
    year: dayjsWithJstDateAndOffset.year(),
    month: dayjsWithJstDateAndOffset.month() + 1,
    date: dayjsWithJstDateAndOffset.date(),
  };
};

export const getMonthInJst = (date: Date): JstYearMonth => {
  return createMonthInJst(date, 0, "START");
};

export const getPreviousMonthInJst = (date: Date): JstYearMonth => {
  return createMonthInJst(date, -1);
};

export const getEndOfPreviousMonthInJst = (date: Date): JstYearMonth => {
  return createMonthInJst(date, -1, "END");
};

export const getEndOfMonthInJst = (date: Date): JstYearMonth => {
  return createMonthInJst(date, 0, "END");
};

export const getEndOfNextMonthInJst = (date: Date): JstYearMonth => {
  return createMonthInJst(date, 1, "END");
};

export const addYears = (date: Date, years: number): Date => {
  return dayjs(date).add(years, "year").toDate();
};

export const addMonths = (date: Date, months: number): Date => {
  return dayjs(date).add(months, "month").toDate();
};
