import {
  endOfMonth,
  getDate,
  getMonth,
  getYear,
  startOfMonth,
  addYears as addYearsDateFns,
  addMonths as addMonthsDateFns,
} from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

const JAPAN_TIMEZONE = "Asia/Tokyo";

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
  const zonedDate = utcToZonedTime(date, JAPAN_TIMEZONE);

  let dayjsWithJstDateAndOffset: Date;

  dayjsWithJstDateAndOffset = addMonths(startOfMonth(zonedDate), offset);

  if (dateTarget === "END") {
    dayjsWithJstDateAndOffset = endOfMonth(dayjsWithJstDateAndOffset);
  }

  return {
    toDate: dayjsWithJstDateAndOffset,
    year: getYear(dayjsWithJstDateAndOffset),
    month: getMonth(dayjsWithJstDateAndOffset) + 1,
    date: getDate(dayjsWithJstDateAndOffset),
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
  return addYearsDateFns(utcToZonedTime(date, JAPAN_TIMEZONE), years);
};

export const addMonths = (date: Date, months: number): Date => {
  return addMonthsDateFns(utcToZonedTime(date, JAPAN_TIMEZONE), months);
};
