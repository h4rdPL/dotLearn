import { Meta, StoryObj } from "@storybook/react";
import { InformationWrapper } from "./InformationWrapper";
const meta = {
    title: "dotlearn/components/organism/InformationWrapper",
    component: InformationWrapper
} satisfies Meta<typeof InformationWrapper>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary = {};