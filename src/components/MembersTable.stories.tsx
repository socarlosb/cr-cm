import { ComponentMeta, ComponentStory } from "@storybook/react";
import { filterDemo, membersDemo, optionsDemo, warStateDemo } from "resDemo";
import { MembersTable } from "src/components/MembersTable";

export default {
  component: MembersTable,
  argTypes: {
    filter: {
      options: ["clanRank", "name", "role", "lastSeen"],
      control: { type: "select" },
    },
  },
} as ComponentMeta<typeof MembersTable>;

const Template: ComponentStory<typeof MembersTable> = (args) => (
  <MembersTable {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  members: membersDemo,
  filter: filterDemo,
  options: optionsDemo,
  warState: warStateDemo,
};
