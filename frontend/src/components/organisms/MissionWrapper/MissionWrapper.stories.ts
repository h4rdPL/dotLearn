import { Meta, StoryObj } from "@storybook/react";
import { MissionWrapper } from "./MissionWrapper";

const meta = {
  title: "dotlearn/components/organism/MissionWrapper",
  component: MissionWrapper,
} satisfies Meta<typeof MissionWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
