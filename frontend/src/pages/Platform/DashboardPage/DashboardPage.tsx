import React from "react";
import { PlatformLayout } from "../../../templates/PlatformLayout";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";
import { Span } from "../../../components/atoms/Span/Span";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import { generateDate } from "../../../utils/calendar";
import { CalendarInterface } from "../../../interfaces/types";
import Calendar from "../../../components/organisms/Calendar/Calendar";

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(1, 1fr);
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    padding: 2rem 4rem;
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Boxes = styled.span`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const ProgressWrapper = styled.div`
  width: 200px;
  align-self: flex-start;
`;

const InnerWrapper = styled.div<CalendarInterface>`
  padding: 2rem 4rem;
`;

const GradeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
`;

const TestWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const DashboardPage: React.FC<CalendarInterface> = () => {
  const [firstDate, lastDate] = generateDate({ month: 10, year: 2000 });
  const percentage = 4;
  return (
    <PlatformLayout>
      <Wrapper>
        <Boxes>
          <h2>Twój progres</h2>
          <InnerWrapper>
            <ProgressWrapper>
              <CircularProgressbar
                value={65}
                text={`${percentage} lvl`}
                styles={buildStyles({
                  strokeLinecap: "butt",
                  textSize: "16px",
                  pathTransitionDuration: 0.5,
                  pathColor: `#FFFA8B`,
                  textColor: "#fff",
                  trailColor: "#fff",
                })}
              />
            </ProgressWrapper>
          </InnerWrapper>
        </Boxes>
        <Boxes>
          <h2>Ostatnie oceny</h2>
          <InnerWrapper>
            <GradeWrapper>
              <Span
                titleLabel="Język angielski /"
                label="Czasowniki nieregularne "
                gradeLabel="4"
                isGrade
              />
              <Span
                titleLabel="Język angielski /"
                label="Czas Present simple "
                gradeLabel="2"
                isGrade
              />
              <Span
                titleLabel="Język angielski /"
                label="Czas Present perfect"
                gradeLabel="4"
                isGrade
              />
            </GradeWrapper>
          </InnerWrapper>
        </Boxes>
        <Boxes>
          <h2>Nadchodzące testy</h2>
          <InnerWrapper>
            <TestWrapper>
              <span>
                <Span
                  titleLabel="Język angielski /"
                  label="Czas Present perfect"
                  isGrade={false}
                />
                <IconWrapper>
                  <AiOutlineCalendar style={{ fontSize: "1.5rem" }} /> 15.00 /
                  20.02.2023 r
                </IconWrapper>
                <IconWrapper>
                  <AiOutlineClockCircle style={{ fontSize: "1.5rem" }} /> 60:00
                </IconWrapper>
              </span>
              <span>
                <Span
                  titleLabel="Język angielski /"
                  label="Czas Present perfect"
                  isGrade={false}
                />
                <IconWrapper>
                  <AiOutlineCalendar style={{ fontSize: "1.5rem" }} /> 15.00 /
                  20.02.2023 r
                </IconWrapper>
                <IconWrapper>
                  <AiOutlineClockCircle style={{ fontSize: "1.5rem" }} /> 60:00
                </IconWrapper>
              </span>
              <span>
                <Span
                  titleLabel="Język angielski /"
                  label="Czas Present perfect"
                  isGrade={false}
                />
                <IconWrapper>
                  <AiOutlineCalendar style={{ fontSize: "1.5rem" }} /> 15.00 /
                  20.02.2023 r
                </IconWrapper>
                <IconWrapper>
                  <AiOutlineClockCircle style={{ fontSize: "1.5rem" }} /> 60:00
                </IconWrapper>
              </span>
            </TestWrapper>
          </InnerWrapper>
        </Boxes>
        <Boxes>
          <h2>Kalendarz</h2>
          <InnerWrapper>
            <Calendar year={0} month={0} />
          </InnerWrapper>
        </Boxes>
      </Wrapper>
    </PlatformLayout>
  );
};
