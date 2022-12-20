import type { ComponentMeta, ComponentStory } from '@storybook/react';

import RouteMap from './[id]';

const meta = {
  component: RouteMap,
  title: 'Pages/RouteMap',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof RouteMap>;

export default meta;

export const Default: ComponentStory<typeof RouteMap> = (args) => (
  <RouteMap {...args} />
);
