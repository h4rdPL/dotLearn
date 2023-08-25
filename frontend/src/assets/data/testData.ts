import { TestInterface } from "../../interfaces/types"
export const testData: TestInterface[] = [
    {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        testName: "Test 1",
        question: [
          {
            id: 1,
            questionName: "Question 1 for Test 1",
            answers: [
              {
                id: 1,
                answerName: "Answer 1",
                isCorrect: true
              },
              {
                id: 2,
                answerName: "Answer 2",
                isCorrect: false
              },
              {
                id: 3,
                answerName: "Answer 3",
                isCorrect: false
              },
              {
                id: 4,
                answerName: "Answer 4",
                isCorrect: false
              }
            ]
          },
          {
            id: 2,
            questionName: "Question 2 for Test 1",
            answers: [
              {
                id: 5,
                answerName: "Answer 1",
                isCorrect: false
              },
              {
                id: 6,
                answerName: "Answer 2",
                isCorrect: true
              },
              {
                id: 7,
                answerName: "Answer 3",
                isCorrect: false
              },
              {
                id: 8,
                answerName: "Answer 4",
                isCorrect: false
              }
            ]
          },
          {
            id: 3,
            questionName: "Question 3 for Test 1",
            answers: [
              {
                id: 9,
                answerName: "Answer 1",
                isCorrect: false
              },
              {
                id: 10,
                answerName: "Answer 2",
                isCorrect: false
              },
              {
                id: 11,
                answerName: "Answer 3",
                isCorrect: true
              },
              {
                id: 12,
                answerName: "Answer 4",
                isCorrect: false
              }
            ]
          },
          {
            id: 4,
            questionName: "Question 4 for Test 1",
            answers: [
              {
                id: 13,
                answerName: "Answer 1",
                isCorrect: false
              },
              {
                id: 14,
                answerName: "Answer 2",
                isCorrect: false
              },
              {
                id: 15,
                answerName: "Answer 3",
                isCorrect: false
              },
              {
                id: 16,
                answerName: "Answer 4",
                isCorrect: true
              }
            ]
          }
        ],
        students: [
          {
            firstName: "Alice",
            lastName: "Johnson",
            email: "alice.johnson@example.com",
            password: "student123",
            role: 0,
            id: 1,
            cardId: 1
          }
        ],
        professor: {
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          password: "password123",
          role: 1,
          id: "1",
          subject: "Angielski"
        },
        classEntities: {
          id: 1,
          classCode: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          subject: "Angielski",
          professor: {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            password: "password123",
            role: 1,
            id: "1",
            subject: "Angielski"
          },
          student: [
            {
              firstName: "Alice",
              lastName: "Johnson",
              email: "alice.johnson@example.com",
              password: "student123",
              role: 0,
              id: 1,
              cardId: 1
            }
          ]
        },
        time: 60,
        isActive: true,
        activeDate: "2023-08-23T17:09:19.260Z"
      },
      {
        id: "a285f64-5717-4562-b3fc-2c963f66afa6",
        testName: "Test 2",
        question: [
          {
            id: 1,
            questionName: "Question 1 for Test 2",
            answers: [
              {
                id: 1,
                answerName: "Answer 1",
                isCorrect: true
              },
              {
                id: 2,
                answerName: "Answer 2",
                isCorrect: false
              },
              {
                id: 3,
                answerName: "Answer 3",
                isCorrect: false
              },
              {
                id: 4,
                answerName: "Answer 4",
                isCorrect: false
              }
            ]
          },
        ],
        students: [
          {
            firstName: "Bob",
            lastName: "Williams",
            email: "bob.williams@example.com",
            password: "student123",
            role: 0,
            id: 2,
            cardId: 2
          }
        ],
        professor: {
          id: "3",
          firstName: "Jane",
          lastName: "Smith",
          email: "jane.smith@example.com",
          password: "password123",
          role: 1,
          subject: "Angielski"
        },
        classEntities: {
          id: 2,
          classCode: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          subject: "Angielski",
          professor: {
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@example.com",
            password: "password123",
            role: 1,
            id: "3",
            subject: "Angielski"
          },
          student: [
            {
              firstName: "Bob",
              lastName: "Williams",
              email: "bob.williams@example.com",
              password: "student123",
              role: 0,
              id: 4,
              cardId: 2
            }
          ]
        },
        time: 90,
        isActive: false,
        activeDate: "2023-08-25T14:20:00.000Z"
      },
  ]
  