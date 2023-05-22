import { Button } from "./Button";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "dotlearn/components/atom/button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {
  args: {
    label: "Dołącz!",
  },
};
