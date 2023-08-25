import { FlashCardsInterface } from "../../interfaces/types";

export const FlashCards: FlashCardsInterface[] = [
  {
    id: 1,
    name: "Czasowniki",
    flashcards: [
      {
        id: 1,
        concept: "go",
        translation: "iść",
        definition: "definition for go"
      },
      {
        id: 2,
        concept: "swim",
        translation: "pływać",
        definition: "definition for swim"
      },
    ]
  },
  {
    id: 2,
    name: "Rzeczowniki",
    flashcards: [
      {
        id: 1,
        concept: "government",
        translation: "rząd",
        definition: "definition for government"
      },
      {
        id: 2,
        concept: "democracy",
        translation: "demokracja",
        definition: "definition for democracy"
      },
    ]
  },
];
