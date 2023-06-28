import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pl"; // Importuj polską lokalizację

import styled from "styled-components";
import arrLeft from "../../../assets/icons/arrLeft.svg";
import arrRight from "../../../assets/icons/arrRight.svg";
interface CalendarProps {
  year: number;
  month: number;
}

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  padding: 2rem 3rem;
  background-color: ${({ theme }) => theme.purple};
  border-radius: 24px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  padding-bottom: 1rem;
  width: 100%;
  margin-bottom: 1rem;
`;

const MonthYearContainer = styled.div`
  display: flex;
  justify-content: center;
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
const Day = styled.div<{ isToday: boolean }>`
  padding: 0.5rem;
  text-align: center;
  cursor: pointer;
  background-color: ${({ isToday, theme }) =>
    isToday ? theme.yellowBright : "transparent"};
  border-radius: 50%;
  padding: 0.7rem;
  color: ${({ isToday, theme }) => (isToday ? theme.black : theme.white)};

  &:hover {
    background-color: ${({ isToday, theme }) =>
      isToday ? theme.yellowBright : theme.black};
  }
`;
const Calendar: React.FC<CalendarProps> = () => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month());
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  dayjs.locale("pl"); // Ustaw polską lokalizację jako domyślną

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
    const totalDays = dayjs()
      .year(selectedYear)
      .month(selectedMonth)
      .daysInMonth();

    for (let i = 1; i <= totalDays; i++) {
      const day = dayjs().year(selectedYear).month(selectedMonth).date(i);
      const isToday = day.isSame(dayjs(), "day");

      days.push(
        <Day key={i} isToday={isToday}>
          {i}
        </Day>
      );
    }

    return days;
  };
  console.log(selectedYear);
  return (
    <CalendarContainer>
      <Header>
        <MonthYearContainer>
          <MonthYearText>
            <ArrowButton onClick={handlePreviousMonth}>
              <img src={arrLeft} alt="arrow" />
            </ArrowButton>
            {dayjs().month(selectedMonth).format("MMMM")}
            <ArrowButton onClick={handleNextMonth}>
              <img src={arrRight} alt="arrow" />
            </ArrowButton>
          </MonthYearText>
        </MonthYearContainer>
        <MonthYearContainer>
          <MonthYearText>
            <ArrowButton onClick={handlePreviousYear}>
              <img src={arrLeft} alt="arrow" />
            </ArrowButton>
            {selectedYear}
            <ArrowButton onClick={handleNextYear}>
              <img src={arrRight} alt="arrow" />
            </ArrowButton>
          </MonthYearText>
        </MonthYearContainer>
      </Header>
      {renderWeekdays()}
      <DaysContainer>{renderDays()}</DaysContainer>
      <button onClick={handleGoToToday}>Today</button>
    </CalendarContainer>
  );
};
export default Calendar;
