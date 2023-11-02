import React, { useEffect, useState } from "react";
import { PlatformLayout } from "../../../templates/PlatformLayout";
import { styled } from "styled-components";
import { Cta } from "../../../components/atoms/Button/Cta";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { getAuthTokenFromCookies } from "../../../utils/getAuthToken";
import { useNavigate } from "react-router-dom";

const TestInput = styled.input`
  padding: 1rem;
  border: none;
  border-bottom: 1px solid #fff;
  background-color: transparent;
  color: #fff;
  outline: none;
  margin-bottom: 1rem;
  &::placeholder {
    color: #ffffff99;
  }
`;

const AnswerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const TestButton = styled.button`
  background-color: ${({ theme }) => theme.purple};
  color: ${({ theme }) => theme.white};
  padding: 1.5rem 2rem;
  border: none;
  outline: none;
  border-radius: 5px;
  width: fit-content;
`;

const InformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Select = styled.select`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55px;
  width: 20%;
  background-color: ${({ theme }) => theme.purple};
  color: ${({ theme }) => theme.white};
  font-size: 14px;
  border: none;
  padding-left: 1rem;
  margin-bottom: 1.5rem;

  option {
    color: black;
    background-color: ${({ theme }) => theme.purple};
    color: ${({ theme }) => theme.white};
    font-weight: small;
    display: flex;
    white-space: pre;
  }
`;

const TimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  input {
    width: 20%;
  }
`;

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const CreateTestPage = () => {
  const navigate = useNavigate();
  const [testName, setTestName] = useState("");
  const [classId, setClassId] = useState(0);
  const [testTime, setTestTime] = useState<number>(0);
  const [testQuestions, setTestQuestions] = useState([
    {
      questionName: "",
      answers: [
        { answerName: "", isCorrect: false },
        { answerName: "", isCorrect: false },
        { answerName: "", isCorrect: false },
        { answerName: "", isCorrect: false },
      ],
    },
  ]);
  const [startDate, setStartDate] = useState<Value | null>();
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(true);
  const [classData, setClassData] = useState<any>();

  const handleAddQuestion = () => {
    const newQuestion = {
      questionName: "",
      answers: [
        { answerName: "", isCorrect: false },
        { answerName: "", isCorrect: false },
        { answerName: "", isCorrect: false },
        { answerName: "", isCorrect: false },
      ],
    };
    setTestQuestions([...testQuestions, newQuestion]);
  };

  const handleQuestionChange = (index: any, value: any) => {
    const updatedQuestions = [...testQuestions];
    updatedQuestions[index].questionName = value;
    setTestQuestions(updatedQuestions);
  };

  const handleAnswerChange = (
    questionIndex: number,
    answerIndex: number,
    value: string
  ) => {
    const updatedQuestions = [...testQuestions];
    updatedQuestions[questionIndex].answers[answerIndex].answerName = value;
    setTestQuestions(updatedQuestions);
  };

  const handleToggleCorrectAnswer = (
    questionIndex: number,
    answerIndex: number
  ) => {
    const updatedQuestions = [...testQuestions];
    updatedQuestions[questionIndex].answers[answerIndex].isCorrect =
      !updatedQuestions[questionIndex].answers[answerIndex].isCorrect;
    setTestQuestions(updatedQuestions);
  };

  const handleTestName = (value: string) => {
    setTestName(value);
  };

  const handleTestTime = (value: number) => {
    setTestTime(value);
  };

  const fetchUserClasses = async () => {
    try {
      const authToken = getAuthTokenFromCookies();

      const response = await fetch(
        `https://localhost:7024/api/Class/GetClass`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setClassData(data.$values);
      } else {
        console.error("Failed to fetch classes");
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const handleSubmit = async () => {
    const testObject = {
      TestName: testName,
      Time: testTime,
      ActiveDate: startDate,
      EndDate: endDate?.toISOString(),
      ClassId: classId,
      Questions: testQuestions.map((question) => {
        return {
          QuestionName: question.questionName,
          TestId: 0,
          Answer: question.answers,
        };
      }),
      UserTestData: {
        IsActive: isActive,
        IsFinished: false,
      },
    };

    try {
      const authToken = getAuthTokenFromCookies();
      const response = await fetch("https://localhost:7024/api/Test/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        credentials: "include",
        body: JSON.stringify(testObject),
      });

      if (response.ok) {
        console.log("Test created successfully");
        return navigate("/platform/test");
      } else {
        const errorMessage = await response.text();
        console.error("Server Error:", errorMessage);
      }
    } catch (error) {
      console.error("Error creating test:", error);
    }
  };

  useEffect(() => {
    fetchUserClasses();
  }, []);

  return (
    <PlatformLayout>
      <Select
        name="class"
        id="class"
        value={classId}
        onChange={(e: any) => setClassId(e.target.value)}
      >
        {classData &&
          classData.map((data: any) => {
            return <option value={data.Id}>{data.ClassName}</option>;
          })}
      </Select>
      <TimeWrapper>
        <h2>Nazwa testu:</h2>
        <TestInput
          type="text"
          placeholder="Np. Czasowniki regularne"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleTestName(e.target.value)
          }
        />
      </TimeWrapper>

      {testQuestions.map((question: any, questionIndex) => (
        <React.Fragment key={questionIndex}>
          <h1>Pytanie {questionIndex + 1}.</h1>
          <TestInput
            type="text"
            placeholder="Np. Lorem ipsum dolor sit amet"
            value={question.questionName}
            onChange={(e) =>
              handleQuestionChange(questionIndex, e.target.value)
            }
          />

          <AnswerWrapper>
            {question.answers.map((answer: any, answerIndex: any) => (
              <div key={answerIndex}>
                <TestInput
                  type="text"
                  placeholder={`Odpowiedź ${String.fromCharCode(
                    65 + answerIndex
                  )}`}
                  value={answer.answerName}
                  onChange={(e) =>
                    handleAnswerChange(
                      questionIndex,
                      answerIndex,
                      e.target.value
                    )
                  }
                />
                <label>
                  <input
                    type="radio"
                    name={`correctAnswer_${questionIndex}`}
                    checked={answer.isCorrect}
                    onChange={() =>
                      handleToggleCorrectAnswer(questionIndex, answerIndex)
                    }
                  />
                  Poprawna
                </label>
              </div>
            ))}
          </AnswerWrapper>
        </React.Fragment>
      ))}
      <InformationWrapper>
        <TestButton
          style={{ marginBottom: "1rem" }}
          onClick={handleAddQuestion}
        >
          Dodaj pytanie 🐻‍❄️
        </TestButton>
        <h3>Data rozpoczęcia testu:</h3>
        <DateTimePicker
          onChange={(date) => setStartDate(date)}
          value={startDate}
        />

        <h3>Data zakończenia testu:</h3>
        <DateTimePicker onChange={(date) => setEndDate(date)} value={endDate} />
        <div>
          <label>
            <TestInput
              type="checkbox"
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
            />
            Aktywny
          </label>
        </div>
        <div>
          <TimeWrapper>
            Czas trwania testu w minutach:
            <TestInput
              placeholder="Np. 60"
              type="number"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = parseInt(e.target.value);
                handleTestTime(value);
              }}
            />
          </TimeWrapper>
        </div>
        <Cta
          style={{ alignSelf: "flex-start" }}
          onClick={handleSubmit}
          label="Stwórz"
          isJobOffer
        />
      </InformationWrapper>
    </PlatformLayout>
  );
};
