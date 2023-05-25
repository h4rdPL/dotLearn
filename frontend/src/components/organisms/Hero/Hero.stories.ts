import { Meta, StoryObj } from "@storybook/react";
import { Hero } from "./Hero";

const meta = {
  title: "dotlearn/components/organism/Hero",
  component: Hero,
  tags: ["autodocs"],
} satisfies Meta<typeof Hero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
