import { Input } from "./Input";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "dotlearn/components/atom/Input",
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {
  args: {
    placeholder: "Adres email",
  },
};
