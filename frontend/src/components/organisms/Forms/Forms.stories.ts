import { Meta, StoryObj } from "@storybook/react";
import { Forms } from "./Forms";

const meta = {
  title: "dotlearn/components/organism/Forms",
  component: Forms,
  tags: ["autodocs"],
} satisfies Meta<typeof Forms>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
