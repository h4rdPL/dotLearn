import { Meta, StoryObj } from "@storybook/react";
import { Mission } from "./Mission";

const meta = {
  title: "dotlearn/components/molecule/Mission",
  component: Mission,
} satisfies Meta<typeof Mission>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
