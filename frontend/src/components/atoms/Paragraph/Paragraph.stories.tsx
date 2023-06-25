import { Meta, StoryObj } from "@storybook/react";
import { Paragraph } from "./Paragraph";

const meta = {
  title: "dotlearn/components/atom/Paragraph",
  component: Paragraph,
} satisfies Meta<typeof Paragraph>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Made with 💜 by h4rdPL",
    isLight: true,
  },
};

export const Quotes: Story = {
  args: {
    label:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.  Lorem Ipsum has been the industry's. Lorem Ipsum is simply dummy text of the printing and typesetting industry.  Lorem Ipsum has been the industry's.Lorem Ipsum is simply ",
    isLight: false,
    isQuotes: true,
  },
};
