import { Sidebar } from "./Sidebar";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "platform/components/organism/sidebar",
  component: Sidebar,
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {};
