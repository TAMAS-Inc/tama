import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { MyStationCard } from './MyStationCard';

const meta = {
  component: MyStationCard,
  title: 'Components/MyStationCard',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof MyStationCard>;

export default meta;

const Template: ComponentStory<typeof MyStationCard> = (args) => (
  <MyStationCard {...args} />
);

export const Default = Template.bind({});

Default.args = {};
