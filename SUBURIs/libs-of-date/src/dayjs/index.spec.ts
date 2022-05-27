import {
  addMonths,
  addYears,
  getEndOfMonthInJst,
  getEndOfNextMonthInJst,
  getEndOfPreviousMonthInJst,
  getMonthInJst,
  getPreviousMonthInJst,
} from "./index";

describe("addYears", () => {
  it("指定した年数が追加されたDateが返される", async () => {
    const timestamp = new Date("2021-01-01T00:00:00+09:00");
    const result = addYears(timestamp, 3);
    expect(result.getFullYear()).toStrictEqual(timestamp.getFullYear() + 3);
  });
});

describe("addMonths", () => {
  it("指定した月が追加されたDateが返される", async () => {
    const timestamp = new Date("2021-01-01T09:00:00+09:00");
    const result = addMonths(timestamp, 2);
    expect(result.getMonth()).toStrictEqual(timestamp.getMonth() + 2);
  });
});

describe("getMonthInJst", () => {
  it("指定した日の月初が返される", async () => {
    const result = getMonthInJst(new Date("2021-01-15T00:00:00+00:00"));
    expect(result.year).toStrictEqual(2021);
    expect(result.month).toStrictEqual(1);
    expect(result.date).toStrictEqual(1);
    expect(result.toDate.getTime()).toStrictEqual(
      new Date("2021-01-01T00:00:00+09:00").getTime()
    );
  });
});

describe("getPreviousMonthInJst", () => {
  it("指定した日の前月の月初が返される", async () => {
    const result = getPreviousMonthInJst(new Date("2021-01-15T00:00:00+00:00"));
    expect(result.year).toStrictEqual(2020);
    expect(result.month).toStrictEqual(12);
    expect(result.date).toStrictEqual(1);
    expect(result.toDate.getTime()).toStrictEqual(
      new Date("2020-12-01T00:00:00+09:00").getTime()
    );
  });
});

describe("getEndOfPreviousMonthInJst", () => {
  it("指定した日の前月の月末が返される", async () => {
    const result1 = getEndOfPreviousMonthInJst(
      new Date("2021-01-01T00:00:00+09:00")
    );

    expect(result1.year).toStrictEqual(2020);
    expect(result1.month).toStrictEqual(12);
    expect(result1.date).toStrictEqual(31);
    expect(result1.toDate.getTime()).toStrictEqual(
      new Date("2020-12-31T23:59:59.999+09:00").getTime()
    );

    const result2 = getEndOfPreviousMonthInJst(
      new Date("2020-01-31T15:00:00.000Z") // 2020-02-01 00:00:00 JST
    );

    expect(result2.year).toStrictEqual(2020);
    expect(result2.month).toStrictEqual(1);
    expect(result2.date).toStrictEqual(31);
    expect(result2.toDate.getTime()).toStrictEqual(
      new Date("2020-01-31T23:59:59.999+09:00").getTime()
    );
  });
});

describe("getEndOfMonthInJst", () => {
  it("指定した日の月末が返される", async () => {
    const result1 = getEndOfMonthInJst(new Date("2021-01-01T00:00:00+09:00"));

    expect(result1.year).toStrictEqual(2021);
    expect(result1.month).toStrictEqual(1);
    expect(result1.date).toStrictEqual(31);
    expect(result1.toDate.getTime()).toStrictEqual(
      new Date("2021-01-31T23:59:59.999+09:00").getTime()
    );

    const result2 = getEndOfMonthInJst(
      new Date("2020-01-31T15:00:00.000Z") // 2020-02-01 00:00:00 JST
    );

    expect(result2.year).toStrictEqual(2020);
    expect(result2.month).toStrictEqual(2);
    expect(result2.date).toStrictEqual(29);
    expect(result2.toDate.getTime()).toStrictEqual(
      new Date("2020-02-29T23:59:59.999+09:00").getTime()
    );
  });
});

describe("getEndOfNextMonthInJst", () => {
  it("指定した日の次の月の月末が返される", async () => {
    const result1 = getEndOfNextMonthInJst(
      new Date("2021-01-01T00:00:00+09:00")
    );

    expect(result1.year).toStrictEqual(2021);
    expect(result1.month).toStrictEqual(2);
    expect(result1.date).toStrictEqual(28);
    expect(result1.toDate.getTime()).toStrictEqual(
      new Date("2021-02-28T23:59:59.999+09:00").getTime()
    );

    const result2 = getEndOfNextMonthInJst(
      new Date("2020-01-31T15:00:00.000Z") // 2020-02-01 00:00:00 JST
    );

    expect(result2.year).toStrictEqual(2020);
    expect(result2.month).toStrictEqual(3);
    expect(result2.date).toStrictEqual(31);
    expect(result2.toDate.getTime()).toStrictEqual(
      new Date("2020-03-31T23:59:59.999+09:00").getTime()
    );
  });
});
