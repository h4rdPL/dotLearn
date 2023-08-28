// TODO: RENAME INTERFACE

import { SyntheticEvent } from "react";

export interface ButtonProps {
  label: string;
  secondary?: boolean;
  style?: any;
  href?: string;
}

export interface MenuProps {
  isActive: boolean;
}
export interface HeadingProps {
  firstLabel: string;
  secondLabel: string;
}

export interface LinkProps {
  label?: string;
  href?: any;
}

export interface InformationProps {
  firstLabel?: string;
  secondLabel?: string;
  thirdLabel?: string;
  description?: string;
  secondary?: boolean;
}

export interface SecondaryHeadingProps {
  label: string | undefined;
  secondary?: boolean;
  style?: any;
  isSectionTitle?: boolean;
  isSmall?: boolean;
}

export interface ParagraphProps {
  label: string | undefined;
  isLight?: boolean;
  isQuotes?: boolean;
  style?: any;
  isJobOffer?: boolean;
}

export interface CTAInterface {
  isJobOffer?: boolean;
  label?: string;
  href?: string;
  style?: any;
  onClick?: (e : SyntheticEvent) => void; // Update the signature to accept no arguments
}

export interface MissionProps {
  secondary?: boolean;
  heading?: string;
  label?: string;
  icon?: string;
}

export interface ItemInterface {
  label?: string;
}
export interface InputProps {
  placeholder?: string;
  style?: any;
  isFileType?: boolean;
  value?: string;
  onChange?: (e: any) => any;
  type?: string;
  name?: string;
}

export interface CheckboxProps {
  isChecked?: boolean;
  onClick?: () => void;
  label?: string;
  id?: string;
  onChange?: any;
}

export interface JobInterface {
  id?: number;
  title?: string;
  salary?: string;
  employmentType?: string;
  location?: string;
  responsibilities?: string;
  expectations?: string[];
  offers?: string[];
  benefits?: string[];
}

// platform

export interface SpanInterface {
  label: string;
  titleLabel: string;
  gradeLabel?:string;
  isGrade: boolean;

}


interface Flashcard {
  id: number;
  concept: string;
  translation: string;
  definition: string;
}

export interface FlashCardsInterface {
  id: number;
  name: string;
  flashcards: Flashcard[];
}


export interface CalendarInterface {
  month?: number | undefined;
  year?: number | undefined;
}
interface Professor {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: number;
  id: string;
  subject: string;
}

interface Student {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: number;
  id: number;
  cardId: number;
}

export interface ClassData {
  id: number;
  classCode: string;
  subject: string; 
  professor: Professor;
  student: Student[];
}


export interface TestInterface {
  id?: string;
  testName?: string;
  question?: Question[];
  students?: Student[];
  professor?: Professor;
  classEntities?: ClassEntity;
  time?: number;
  isActive?: boolean;
  activeDate?: string;
}

interface Question {
  id: number;
  questionName: string;
  answers: Answer[];
}

interface Answer {
  id: number;
  answerName: string;
  isCorrect: boolean;
}

interface Student {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: number;
  id: number;
  cardId: number;
}

interface Professor {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: number;
  id: string;
  subject: string;
}


interface ClassEntity {
  id: number;
  classCode: string;
  subject: string;
  professor: Professor;
  student: Student[];
}

export interface FlashCardState {
  flipped: boolean;
}

export interface Message {
  text: string;
  isUser: boolean;
  isBot?: boolean;
}
