import React, { useEffect, useState } from "react";
import { PlatformLayout } from "../../../templates/PlatformLayout";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";
import { Span } from "../../../components/atoms/Span/Span";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import { CalendarInterface } from "../../../interfaces/types";
import Calendar from "../../../components/organisms/Calendar/Calendar";
import { getAuthTokenFromCookies } from "../../../utils/getAuthToken";

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  align-self: center;
  justify-self: center;
  grid-template-columns: repeat(1, 1fr);
  font-size: 14px;
  max-height: 100vh;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Boxes = styled.span`
  display: flex;
  align-items: flex;
  flex-direction: column;
  font-size: 1rem;
  height: 100%;
`;

const InnerWrapper = styled.div<CalendarInterface>`
  padding: 2rem 0rem 0 0;
  align-self: center;
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
  const [grades, setGrades] = useState<any>();
  const [tests, setTests] = useState<any>();
  const fetchData = async () => {
    try {
      const authToken = getAuthTokenFromCookies();
      const response = await fetch(
        `https://localhost:7024/api/Test/GetTestResult`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        const data: any = await response.json();
        setGrades(data.$values);
        console.log("dane");
        console.log(data.$values);
      } else {
        console.error("Failed to fetch classes");
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchTestAPI = async () => {
    try {
      const authToken = getAuthTokenFromCookies();
      const response = await fetch(
        `https://localhost:7024/api/Test/GetNextTest`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        const data: any = await response.json();
        setTests(data.$values);
      } else {
        console.error("Failed to fetch classes");
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchTestAPI();
  }, []);
  console.log(grades);
  return (
    <PlatformLayout>
      <Wrapper>
        <Boxes>
          <span style={{ fontSize: "14px" }}>
            <h2>Kalendarz</h2>
          </span>
          <InnerWrapper>
            <Calendar year={0} month={0} />
          </InnerWrapper>
        </Boxes>
        <Boxes>
          <span style={{ fontSize: "14px" }}>
            <h2>Nadchodzące testy</h2>
          </span>
          <InnerWrapper>
            <TestWrapper>
              {tests &&
                tests.map((test: any) => {
                  const originalDate = new Date(test.ActiveDate);
                  const formattedDate = `${originalDate.getFullYear()}-${
                    originalDate.getMonth() + 1
                  }-${originalDate.getDate()} | ${originalDate.getHours()}:${originalDate.getMinutes()}`;

                  return (
                    <span>
                      <Span
                        titleLabel={`${test.ClassName}  /`}
                        label={`${test.TestName} /`}
                        isGrade={false}
                      />
                      <IconWrapper>
                        <AiOutlineCalendar style={{ fontSize: "1.5rem" }} />{" "}
                        {formattedDate}
                      </IconWrapper>

                      <IconWrapper>
                        <AiOutlineClockCircle style={{ fontSize: "1.5rem" }} />{" "}
                        {parseFloat(test.Time).toFixed(2)}
                      </IconWrapper>
                    </span>
                  );
                })}
            </TestWrapper>
          </InnerWrapper>
        </Boxes>

        <Boxes>
          <span style={{ fontSize: "14px" }}>
            <h2>Ostatnie oceny</h2>
          </span>
          <InnerWrapper>
            <GradeWrapper>
              {grades &&
                grades.map((grade: any) => (
                  <>
                    <Span
                      titleLabel={`${grade.ClassName} /`}
                      label={`${grade.TestName}`}
                      gradeLabel={`${grade.Grade}`}
                      isGrade
                    />
                    {grade.ActiveDate}
                  </>
                ))}
            </GradeWrapper>
          </InnerWrapper>
        </Boxes>
      </Wrapper>
    </PlatformLayout>
  );
};
