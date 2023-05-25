import { Meta, StoryObj } from "@storybook/react";
import { Cta } from "./Cta";

const meta = {
  title: "dotlearn/components/atom/Cta",
  component: Cta,
} satisfies Meta<typeof Cta>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
