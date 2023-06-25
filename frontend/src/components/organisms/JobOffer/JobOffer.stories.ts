import { Meta, StoryObj } from "@storybook/react";
import { JobOffer } from "./JobOffer";
const meta = {
  title: "dotlearn/components/organism/JobOffer",
  component: JobOffer,
} satisfies Meta<typeof JobOffer>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary = {};
