import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { BusDetail } from './BusDetail';

const meta = {
  component: BusDetail,
  title: 'Pages/BusDetail',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof BusDetail>;

export default meta;

export const Default: ComponentStory<typeof BusDetail> = (args) => (
  <BusDetail {...args} />
);
