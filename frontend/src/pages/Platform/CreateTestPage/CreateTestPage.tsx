import React, { useState } from "react";
import { PlatformLayout } from "../../../templates/PlatformLayout";
import { styled } from "styled-components";
import { Cta } from "../../../components/atoms/Button/Cta";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
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

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const CreateTestPage = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [testQuestions, setTestQuestions] = useState([
    {
      id: 1,
      question: "",
      answers: ["", "", "", ""],
    },
  ]);

  const handleAddQuestion = () => {
    const newQuestion = {
      id: testQuestions.length + 1,
      question: "",
      answers: ["", "", "", ""],
    };
    setTestQuestions([...testQuestions, newQuestion]);
  };

  const handleQuestionChange = (index: any, value: any) => {
    const updatedQuestions = [...testQuestions];
    updatedQuestions[index].question = value;
    setTestQuestions(updatedQuestions);
  };

  const handleAnswerChange = (
    questionIndex: any,
    answerIndex: any,
    value: any
  ) => {
    const updatedQuestions = [...testQuestions];
    updatedQuestions[questionIndex].answers[answerIndex] = value;
    setTestQuestions(updatedQuestions);
  };

  return (
    <PlatformLayout>
      <div>Nowy test</div>
      <select name="" id="">
        <option value="">Klasa 1</option>
        <option value="">Klasa 1</option>
        <option value="">Klasa 1</option>
        <option value="">Klasa 1</option>
      </select>
      {testQuestions.map((question, questionIndex) => (
        <React.Fragment key={question.id}>
          <h1>Pytanie {question.id}.</h1>
          <TestInput
            type="text"
            placeholder="Np. Lorem ipsum dolor sit amet"
            value={question.question}
            onChange={(e) =>
              handleQuestionChange(questionIndex, e.target.value)
            }
          />
          <AnswerWrapper>
            {question.answers.map((answer, answerIndex) => (
              <span key={answerIndex}>
                {String.fromCharCode(65 + answerIndex)}.{" "}
                <TestInput
                  type="text"
                  placeholder="Np. Lorem ipsum dolor sit amet"
                  value={answer}
                  onChange={(e) =>
                    handleAnswerChange(
                      questionIndex,
                      answerIndex,
                      e.target.value
                    )
                  }
                />
              </span>
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
        <h3>Data aktywności testu:</h3>
        <DateTimePicker onChange={onChange} value={value} />
        <Cta style={{ alignSelf: "flex-start" }} label="Stwórz" isJobOffer />
      </InformationWrapper>
    </PlatformLayout>
  );
};
