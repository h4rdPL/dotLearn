import { Placeholder } from "./Placeholder";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "dotlearn/components/atom/Placeholder",
  component: Placeholder,
} satisfies Meta<typeof Placeholder>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {
  args: {
    placeholder: "Adres email",
  },
};
