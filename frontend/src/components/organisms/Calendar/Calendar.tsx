import React, { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/pl"; // Importuj polską lokalizację

import styled, { css } from "styled-components";
import arrLeft from "../../../assets/icons/arrLeft.svg";
import arrRight from "../../../assets/icons/arrRight.svg";
interface CalendarProps {
  year: number;
  month: number;
  isInactive?: boolean;
}

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: fit-content;
  height: 450px;
  padding: 2rem 3rem;
  background-color: ${({ theme }) => theme.purple};
  border-radius: 24px;
`;

const Header = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  width: 100%;
  margin-bottom: 1rem;
`;

const MonthYearContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  gap: 0.5rem;
`;

const MonthYearText = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 1.2rem;
  margin-right: 1rem;
  width: 100%;
`;

const ArrowButton = styled.button`
  font-size: 1.2rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const WeekdaysContainer = styled.div`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  justify-items: center;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.yellowBright};
  padding-bottom: 1rem;
  font-weight: bold;
`;

const Weekday = styled.div`
  display: grid;
  gap: 5px;
`;

const DaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  padding-top: 1rem;
`;
const Day = styled.div<{ isToday: boolean; isInactive: boolean }>`
  padding: 0.5rem;
  text-align: center;
  cursor: pointer;
  background-color: ${({ isToday, theme }) =>
    isToday ? theme.yellowBright : "transparent"};
  border-radius: 50%;
  padding: 0.7rem;
  color: ${({ isToday, theme }) => (isToday ? theme.black : theme.white)};
  ${({ isInactive }) =>
    isInactive &&
    css`
      color: ${({ theme }) => theme.textGray};
    `}
  &:hover {
    background-color: ${({ isToday, theme }) =>
      isToday ? theme.yellowBright : theme.black};
  }
`;
const Button = styled.button`
  border-radius: 50px;
  border: none;
  padding: 0.5rem 2rem;
  background-color: ${({ theme }) => theme.highlight};
  align-self: flex-end;
`;

const Calendar: React.FC<CalendarProps> = () => {
  dayjs.locale("pl"); // Ustaw polską lokalizację jako domyślną

  const [isInactive, setIsInactive] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month());
  const [selectedYear, setSelectedYear] = useState(dayjs().year());

  const handlePreviousMonth = () => {
    setSelectedMonth((prevMonth) => prevMonth - 1);
  };

  const handleNextMonth = () => {
    setSelectedMonth((prevMonth) => prevMonth + 1);
  };

  const handlePreviousYear = () => {
    setSelectedYear((prevYear) => prevYear - 1);
  };

  const handleNextYear = () => {
    setSelectedYear((prevYear) => prevYear + 1);
  };

  const handleGoToToday = () => {
    setSelectedMonth(dayjs().month());
    setSelectedYear(dayjs().year());
  };

  const renderWeekdays = () => {
    const weekdays = ["Nd", "Pn", "Wt", "Śr", "Czw", "Pt", "Sob"];

    return (
      <WeekdaysContainer>
        {weekdays.map((weekday) => (
          <Weekday key={weekday}>{weekday}</Weekday>
        ))}
      </WeekdaysContainer>
    );
  };

  const renderDays = () => {
    const days: JSX.Element[] = [];
    const firstDayOfMonth = dayjs()
      .year(selectedYear)
      .month(selectedMonth)
      .startOf("month");
    const totalDays = firstDayOfMonth.daysInMonth();
    const startDayOfWeek = firstDayOfMonth.day();
    if (startDayOfWeek > 0) {
      const previousMonth = firstDayOfMonth.subtract(startDayOfWeek, "day");
      const prevMonthDays = previousMonth.daysInMonth();

      for (let i = startDayOfWeek - 1; i >= 0; i--) {
        days.push(
          <Day key={`prev-${prevMonthDays - i}`} isToday={false} isInactive>
            {prevMonthDays - i}
          </Day>
        );
      }
    }

    // Dodaj dni aktualnego miesiąca
    for (let i = 1; i <= totalDays; i++) {
      const day = firstDayOfMonth.date(i);
      const isToday = day.isSame(dayjs(), "day");
      days.push(
        <Day key={i} isToday={isToday} isInactive={isInactive}>
          {i}
        </Day>
      );
    }

    // Dodaj dni z następnego miesiąca, aby uzupełnić tydzień, jeśli konieczne
    const lastDayOfMonth = firstDayOfMonth.endOf("month");

    const endDayOfWeek = lastDayOfMonth.day();
    const daysToAdd = 6 - endDayOfWeek;

    for (let i = 1; i <= daysToAdd; i++) {
      days.push(
        <Day key={`next-${i}`} isToday={false} isInactive>
          {i}
        </Day>
      );
    }

    return days;
  };

  return (
    <CalendarContainer>
      <Header>
        <MonthYearContainer>
          <ArrowButton onClick={handlePreviousMonth}>
            <img src={arrLeft} alt="arrow" />
          </ArrowButton>
          <MonthYearText>
            {dayjs().month(selectedMonth).format("MMMM")}
          </MonthYearText>
          <ArrowButton onClick={handleNextMonth}>
            <img src={arrRight} alt="arrow" />
          </ArrowButton>
        </MonthYearContainer>
        <MonthYearContainer>
          <ArrowButton onClick={handlePreviousYear}>
            <img src={arrLeft} alt="arrow" />
          </ArrowButton>
          <MonthYearText>{selectedYear}</MonthYearText>
          <ArrowButton onClick={handleNextYear}>
            <img src={arrRight} alt="arrow" />
          </ArrowButton>
        </MonthYearContainer>
      </Header>
      {renderWeekdays()}
      <DaysContainer>{renderDays()}</DaysContainer>
      <Button onClick={handleGoToToday}>Today</Button>
    </CalendarContainer>
  );
};
export default Calendar;
