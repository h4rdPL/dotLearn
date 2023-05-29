export interface MenuProps {
  isActive: boolean;
}
export interface HeadingProps {
  firstLabel: string;
  secondLabel: string;
}

export interface LinkProps {
  label: string;
}

export interface InformationProps {
  firstLabel?: string;
  secondLabel?: string;
  thirdLabel?: string;
  description?: string;
  secondary?: boolean;
}

export interface SecondaryHeadingProps {
  label: string;
}

export interface ParagraphProps {
  label: string;
}
