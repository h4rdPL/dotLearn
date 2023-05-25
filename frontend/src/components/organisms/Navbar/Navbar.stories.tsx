import { Navbar } from "./Navbar";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "dotlearn/components/organism/Navbar",
  component: Navbar,
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {};
