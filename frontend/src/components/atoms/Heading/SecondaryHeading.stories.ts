import { Meta } from "@storybook/react";
import { SecondaryHeading } from "./SecondaryHeading";

const meta = {
    title: "dotlearn/components/atom/SecondaryHeading",
    component: SecondaryHeading
} satisfies Meta<typeof SecondaryHeading>

export default meta;

export const Primary = {
    args: {
        label: "Zaufali_nam"
    }
};