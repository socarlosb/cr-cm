import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { filterDemo, membersDemo, optionsDemo, warStateDemo } from "resDemo";
import Home from "src/pages";
import { IOptions } from "src/types";

export default {
  component: Home,
  argTypes: {
    filter: {
      options: ["clanRank", "name", "role", "lastSeen"],
      control: { type: "select" },
    },
  },
} as ComponentMeta<typeof Home>;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const Template: ComponentStory<typeof Home> = () => {
  const [options, setOptions] = useState<IOptions>(optionsDemo);

  return (
    <QueryClientProvider client={queryClient}>
      <Home />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  members: membersDemo,
  filter: filterDemo,
  options: optionsDemo,
  warState: warStateDemo,
};
