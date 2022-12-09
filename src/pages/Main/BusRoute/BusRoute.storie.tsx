import type { ComponentMeta, ComponentStory } from '@storybook/react';

import BusRoute from './[id]';

const meta = {
  component: BusRoute,
  title: 'Pages/BusRoute',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof BusRoute>;

export default meta;

export const Default: ComponentStory<typeof BusRoute> = (args) => (
  <BusRoute {...args} />
);
