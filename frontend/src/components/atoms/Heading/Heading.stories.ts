import { Meta, StoryObj } from "@storybook/react";
import { Heading } from "./Heading";

const meta = {
  title: "dotlearn/components/atom/Heading",
  component: Heading,
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    firstLabel: "Zacznij się uczyć",
    secondLabel: "z nami",
  },
};
