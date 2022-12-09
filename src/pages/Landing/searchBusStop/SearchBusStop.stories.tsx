import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { SearchBusStop } from './SearchBusStop';

const meta = {
  component: SearchBusStop,
  title: 'Directory/Page/SearchBusStop',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof SearchBusStop>;

export default meta;

const Template: ComponentStory<typeof SearchBusStop> = (args) => (
  <SearchBusStop {...args} />
);

export const Default = Template.bind({});

Default.args = {};
