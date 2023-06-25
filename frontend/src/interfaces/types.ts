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
