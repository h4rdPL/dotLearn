import dayjs, { Dayjs } from "dayjs";
import { CalendarInterface } from "../interfaces/types";

export const generateDate = ({
    month = dayjs().month(),
    year = dayjs().year(),
  }: CalendarInterface): Dayjs[] => {
    const firstDateOfMonth: Dayjs = dayjs()
      .year(year)
      .month(month || dayjs().month())
      .startOf("month");
  
    const lastDateOfMonth: Dayjs = dayjs()
      .year(year)
      .month(month || dayjs().month())
      .endOf("month");
  
    return [firstDateOfMonth, lastDateOfMonth];
  };