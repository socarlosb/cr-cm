import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MemberItem } from "src/components/MemberItem";
import "../styles/globals.css";

const member = {
  tag: "#JVP00GPVJ",
  name: "\\_JAQUAVIAN_/",
  role: "member",
  lastSeen: "20220715T141027.000Z",
  expLevel: 9,
  trophies: 3985,
  arena: {
    id: 54000012,
    name: "Arena 16",
  },
  clanRank: 29,
  previousClanRank: 29,
  donations: 0,
  donationsReceived: 0,
  clanChestPoints: 0,
  currentRaceFame: 0,
  currentRaceDecksUsed: 0,
  currentRaceDecksUsedToday: 0,
  currentRaceBoatAttacks: 0,
  lastRaceFame: 75,
  lastRaceDecksUsed: 1,
  lastRaceBoatAttacks: 1,
  previousRaceFame: "-",
  previousRaceDecksUsed: "-",
  previousRaceBoatAttacks: "-",
};
const options = {
  clanTag: "#YVYYC9QC",
  awayMaxDays: 7,
  awayDangerDays: 3,
  warWeekFame: 1000,
};
const topValues = {
  currentRaceTopFame: 800,
  currentRaceTopBoatAttacks: 4,
  currentRaceTopDecksUsed: 16,
  lastRaceTopFame: 2650,
  lastRaceTopBoatAttacks: 16,
  lastRaceTopDecksUsed: 26,
  previousRaceTopFame: 3150,
  previousRaceTopBoatAttacks: 16,
  previousRaceTopDecksUsed: 27,
  donationsGiven: 581,
  donationsReceived: 510,
};
const index = 28;
const warState = "warDay";

export default {
  component: MemberItem,
} as ComponentMeta<typeof MemberItem>;

const Template: ComponentStory<typeof MemberItem> = (args) => (
  <MemberItem {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  member,
  options,
  topValues,
  index,
  warState,
};
