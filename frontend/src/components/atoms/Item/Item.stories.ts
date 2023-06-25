import { Item } from "./Item";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "dotlearn/components/atom/Item",
  component: Item,
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {
  args: {
    label: "Dołącz!",
  },
};
