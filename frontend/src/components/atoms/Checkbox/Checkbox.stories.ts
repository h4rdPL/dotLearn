import { Checkbox } from "./Checkbox";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "dotlearn/components/atom/Checkbox",
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {
  //   args: {
  //     label: "Dołącz!",
  //   },
};
// export const Secondary: Story = {
//   //   args: {
//   //     label: "Sprawdź oferty!",
//   //     secondary: true,
//   //   },
// };
