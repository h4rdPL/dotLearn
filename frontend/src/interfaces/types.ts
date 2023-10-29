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
  to?: string;
  as?: any;
  onClick?: (e : any) => void;
  disabled?: any;
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
  id?: number;
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
  map(arg0: (question: any) => any): import("react").ReactNode;
  $values: any;
  Id: string;
  TestName: string;
  Time: string;
  IsActive: boolean;
  ActiveDate: string;
  ProfessorFirstName: string;
  ProfessorLastName: string;
  Questions: QuestionInterface[];
}

export interface QuestionInterface {
  $values: string;
  id: number;
  questionName: string;
  answers: AnswerInterface[];
}

export interface AnswerInterface {
  id: number;
  answerName: string;
  isCorrect: boolean;
}

export interface FlashCardState {
  flipped: boolean;
}

export interface Message {
  text: string;
  isUser: boolean;
  isBot?: boolean;
}

export interface FlashCardValue {
  Id: string;
  Content: string;
  Definition: string;
}

export interface FlashCardSet {
  length: any;
  Definition: string;
  Id: number;
  Name: string;
  Category: string;
  Content?: string;
  StudentId: number;
  FlashCards: FlashCardValue[];
}


export interface DataInterface {
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  Role: string;
}

export interface LoginDataInterface {
  Email: string;
  Password: string;
}
