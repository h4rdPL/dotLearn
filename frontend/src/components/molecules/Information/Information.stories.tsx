import { Meta, StoryObj } from "@storybook/react";
import { Information } from "./Information";

const meta = {
  title: "dotlearn/components/molecule/Information",
  component: Information,
} satisfies Meta<typeof Information>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    firstLabel: "Możesz robić",
    secondLabel: "testy",
    thirdLabel: "online",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
};

export const Secondary: Story = {
  args: {
    firstLabel: "Rób własne",
    thirdLabel: "fiszki",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  }
}