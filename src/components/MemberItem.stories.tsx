import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  indexDemo,
  memberDemo,
  optionsDemo,
  topValuesDemo,
  warStateDemo,
} from "resDemo";
import { MemberItem } from "src/components/MemberItem";

export default {
  component: MemberItem,
} as ComponentMeta<typeof MemberItem>;

const Template: ComponentStory<typeof MemberItem> = (args) => (
  <MemberItem {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  member: memberDemo,
  options: optionsDemo,
  topValues: topValuesDemo,
  index: indexDemo,
  warState: warStateDemo,
};
