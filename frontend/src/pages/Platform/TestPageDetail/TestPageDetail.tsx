import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlatformLayout } from "../../../templates/PlatformLayout";
import { styled } from "styled-components";
import { TestInterface } from "../../../interfaces/types";
import { testData } from "../../../assets/data/testData";

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

export const TestPageDetail = () => {
  const { testId } = useParams<{ testId: string }>();
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, number>
  >({});
  const [isTestAvailable, setIsTestAvailable] = useState(true); // Test availability state
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  const test = testData.find((t) => t.id === testId) as TestInterface;

  useEffect(() => {
    const startTime = new Date();
    const testDurationMinutes = 60;
    const endTime = new Date(startTime.getTime() + testDurationMinutes * 60000);

    const interval = setInterval(() => {
      const currentTime = new Date();
      const timeDiff = endTime.getTime() - currentTime.getTime();
      if (timeDiff <= 0) {
        clearInterval(interval);
        setIsTestAvailable(false);
        handleSubmitTest();
      } else {
        setRemainingTime(Math.floor(timeDiff / 1000));
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleAnswerSelect = (questionId: number, answerId: number) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [`${questionId}`]: answerId,
    }));
  };

  const handleSubmitTest = () => {
    // Implement your logic to submit the test
    console.log("Selected Answers:", selectedAnswers);
    // Set any additional logic you need after submitting the test
  };

  return (
    <PlatformLayout>
      <TestPageWrapper>
        <TestHeader>
          <TestTitle>{test.testName} </TestTitle>
        </TestHeader>
        <TestInfo>
          <TestInfoItem>{`Professor: ${test.professor?.firstName} ${test.professor?.lastName}`}</TestInfoItem>
          {/* Add more test info items here */}
        </TestInfo>
        {test.question?.map((question) => (
          <TestQuestion key={question.id}>
            <h3>Question {question.id}</h3>
            <p>{question.questionName}</p>
            <ul>
              {question.answers.map((answer) => (
                <li key={answer.id}>
                  <AnswerOption>
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      checked={selectedAnswers[`${question.id}`] === answer.id}
                      onChange={() =>
                        handleAnswerSelect(question.id, answer.id)
                      }
                    />
                    {answer.answerName} -{" "}
                    {answer.isCorrect ? "Correct" : "Incorrect"}
                  </AnswerOption>
                </li>
              ))}
            </ul>
          </TestQuestion>
        ))}
        {isTestAvailable ? (
          <SubmitButton onClick={handleSubmitTest}>Zakończ test</SubmitButton>
        ) : (
          <p>Test is no longer available.</p>
        )}
        {remainingTime !== null && (
          <p>
            Pozostały czas: {Math.floor(remainingTime / 60)}:
            {remainingTime % 60}
          </p>
        )}
      </TestPageWrapper>
    </PlatformLayout>
  );
};
