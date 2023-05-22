import { Link } from "./Link";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
    title: "dotlearn/components/atom/link",
    component: Link,
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {
    args: {
        label: "Strona główna",
    },
};
