import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PlatformLayout } from "../../../templates/PlatformLayout";
import { styled } from "styled-components";
import { getAuthTokenFromCookies } from "../../../utils/getAuthToken";
import { getUserRole } from "../../../utils/GetUserRole";
import { TestResultsChart } from "./Chart";
import { Test, TestResult } from "../../../interfaces/types";

const TestPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.secondaryBackground};
  border-radius: 10px;
  color: ${({ theme }) => theme.white};
`;

const TestHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TestTitle = styled.h2`
  margin: 0;
  font-size: 24px;
`;

const TestInfo = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  font-size: 14px;
`;

const TestInfoItem = styled.span`
  color: ${({ theme }) => theme.highlight};
`;

const TestQuestion = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const AnswerOption = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  font-size: 16px;
  margin: 0.5rem 0;
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.purple};
  color: ${({ theme }) => theme.white};
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  align-self: flex-start;
  &:hover {
    background-color: ${({ theme }) => theme.darkPurple};
  }
`;

const RadioInput = styled.input.attrs({ type: "radio" })`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
`;

const RadioCustomButton = styled.span<{ checked: boolean }>`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid ${({ theme }) => theme.purple};
  border-radius: 50%;
  background-color: ${({ checked, theme }) =>
    checked ? theme.purple : "transparent"};
`;

export const TestPageDetail = () => {
  const [role, setRole] = useState<string | undefined>();
  const { testId } = useParams<{ testId: string }>();
  const [testResults, setTestResults] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, number>
  >({});
  const [isTestAvailable, setIsTestAvailable] = useState(true);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [test, setTest] = useState<Test | null>(null);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [finishedTestScore, setFinishedTestScore] = useState<
    bigint | string | number
  >(0);

  const [resultsToSend, setResultsToSend] = useState<TestResult[]>([]);

  let navigate = useNavigate();

  const handleAnswerSelect = (questionId: number, id: number) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [`${questionId}`]: id,
    }));
  };

  const handleEndTest = async () => {
    setIsTestAvailable(!isTestAvailable);
    try {
      let totalPoints = 0;
      for (const questionId of Object.keys(selectedAnswers)) {
        const selectedAnswerIndex = selectedAnswers[questionId];
        const question = test?.Questions.$values[parseInt(questionId, 10)];
        if (
          selectedAnswerIndex !== undefined &&
          selectedAnswerIndex >= 0 &&
          question?.Answer?.$values?.length &&
          selectedAnswerIndex < question.Answer.$values.length
        ) {
          if (question.Answer.$values[selectedAnswerIndex].IsCorrect) {
            totalPoints += 1;
          }
        }

        resultsToSend.push({
          QuestionId: parseInt(questionId, 10),
          Score: totalPoints,
        });
        console.log(
          resultsToSend.push({
            QuestionId: parseInt(questionId, 10),
            Score: totalPoints,
          })
        );
      }

      setTestResults(totalPoints);

      const totalMaxPoints = test?.Questions?.$values.length;

      const newFinishedTestScore =
        totalPoints > 0 && totalMaxPoints
          ? (totalPoints / totalMaxPoints) * 100
          : 0;
      setFinishedTestScore(newFinishedTestScore);
    } catch (error) {
      console.error("Błąd podczas wysyłania wyników testu:", error);
    }
  };

  const handleSubmitTest = async () => {
    const authToken = getAuthTokenFromCookies();
    const roundedScore = parseFloat(finishedTestScore.toString()).toFixed(2);
    setIsTestAvailable(!isTestAvailable);
    try {
      const response = await fetch(
        `https://localhost:7024/api/Test/SubmitTestResults/${testId}?score=${roundedScore}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        console.log("Wynik testu został wysłany i zapisany w bazie danych.");
        return navigate("/platform/test");
      } else {
        console.error("Błąd podczas wysyłania wyniku testu.");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const fetchTestData = async () => {
    try {
      const response = await fetch(
        `https://localhost:7024/api/Test/GetStudentGrades/${testId}`
      );
      if (response.ok) {
        await response.json();
      } else {
        console.error("Błąd podczas pobierania danych testu");
      }
    } catch (error) {
      console.error("Błąd podczas pobierania danych testu:", error);
    }
  };

  const fetchTest = async () => {
    try {
      const authToken = getAuthTokenFromCookies();
      if (typeof authToken === "undefined") return;

      setRole(getUserRole(authToken));
      const response = await fetch(`https://localhost:7024/api/Test/getTest`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        credentials: "include",
      });
      if (response.ok) {
        const data: any = await response.json();
        let foundTest = null;
        for (const item of data.$values) {
          if (item.Id === testId) {
            foundTest = item;
            break;
          }
        }
        if (foundTest) {
          setTest(foundTest);
        } else {
          console.error("Test not found");
        }
      } else {
        console.error("Failed to fetch test");
      }
    } catch (error) {
      console.error("Error fetching test:", error);
    }
  };

  useEffect(() => {
    fetchTest();
    fetchTestData();
  }, [testId]);

  useEffect(() => {
    if (test) {
      const startTime = new Date();
      const testDurationMinutes = parseInt(test.Time, 10);
      const endTime = new Date(
        startTime.getTime() + testDurationMinutes * 60000
      );

      const interval = setInterval(() => {
        const currentTime = new Date();
        const timeDiff = endTime.getTime() - currentTime.getTime();
        if (timeDiff <= 0) {
          clearInterval(interval);
          setIsTestAvailable(false);
          handleEndTest();
          handleSubmitTest();
        } else {
          setRemainingTime(Math.floor(timeDiff / 1000));
        }
      }, 1000);

      const totalMaxPoints = test.Questions?.$values?.length;
      setTotalPoints(totalMaxPoints);

      return () => {
        clearInterval(interval);
      };
    }
  }, [test]);
  console.log(testResults);
  return (
    <PlatformLayout>
      <TestPageWrapper>
        <TestHeader>
          <TestTitle>
            {test?.TestName} /{" "}
            <TestInfoItem>
              {`Profesor: ${test?.ProfessorFirstName} ${test?.ProfessorLastName}`}
            </TestInfoItem>{" "}
          </TestTitle>
        </TestHeader>
        <TestInfo></TestInfo>
        <div>
          <div>
            {test && role === "Student" ? (
              test.Questions?.$values?.map((question: any, index: any) => (
                <TestQuestion key={index}>
                  <div>
                    Pytanie {index + 1}: {question?.QuestionName}
                  </div>
                  <ul>
                    {question.Answer.$values?.map(
                      (answer: any, answerIndex: any) => (
                        <AnswerOption key={answerIndex}>
                          <label
                            style={{
                              display: "flex",
                              gap: ".5rem",
                              alignItems: "center",
                            }}
                          >
                            <RadioInput
                              type="radio"
                              name={`question-${index}`}
                              checked={
                                selectedAnswers[`${index}`] === answerIndex
                              }
                              onChange={() =>
                                handleAnswerSelect(index, answerIndex)
                              }
                            />
                            <RadioCustomButton
                              checked={
                                selectedAnswers[`${index}`] === answerIndex
                              }
                            />
                            {answer?.AnswerName}
                          </label>
                        </AnswerOption>
                      )
                    )}
                  </ul>
                </TestQuestion>
              ))
            ) : (
              <>
                <h1>Wyniki testu</h1>
                {
                  <TestResultsChart
                    data={{
                      labels: ["5", "4", "3", "2", "1"],
                      datasets: [
                        {
                          label: "Ilość studentów",
                          data: [10, 4, 3, 2, 1],
                          backgroundColor: "rgba(53, 162, 235, 0.5)",
                        },
                      ],
                    }}
                  />
                }
              </>
            )}
          </div>
        </div>

        {test &&
        test.UserTestData?.IsFinished === false &&
        test.UserTestData?.IsActive === true ? (
          <>
            <SubmitButton
              onClick={() => {
                handleEndTest();
              }}
            >
              Zakończ test
            </SubmitButton>
            <SubmitButton
              onClick={() => {
                handleSubmitTest();
              }}
            >
              Wyślij test
            </SubmitButton>
          </>
        ) : (
          <p></p>
        )}

        {remainingTime !== null &&
          test &&
          test.UserTestData?.IsActive === true && (
            <p>
              Pozostały czas: {Math.floor(remainingTime / 60)}:
              {remainingTime % 60}
            </p>
          )}
        <p>Maksymalna ilość punktów: {totalPoints}</p>
        <p>Poprawne odpowiedzi: {Number(finishedTestScore) * 100}%</p>
      </TestPageWrapper>
    </PlatformLayout>
  );
};
