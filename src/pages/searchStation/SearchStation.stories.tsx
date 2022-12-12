import type { ComponentMeta, ComponentStory } from '@storybook/react';

import SearchBusStop from './index';

const meta = {
  component: SearchBusStop,
  title: 'Page/SearchBusStop',
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
