import { Meta, StoryObj } from "@storybook/react";
import { Span } from "./Span";

const meta = {
  title: "platform/components/atom/Span",
  component: Span,
} satisfies Meta<typeof Span>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Czasowniki nieregularne",
    titleLabel: "Język angielski /",
    gradeLabel: "3",
    isGrade: true
  },
};
