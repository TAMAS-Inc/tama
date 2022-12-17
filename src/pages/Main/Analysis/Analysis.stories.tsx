import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Analysis from '.';

const meta = {
  component: Analysis,
  title: 'Pages/Analysis',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof Analysis>;

export default meta;

export const Default: ComponentStory<typeof Analysis> = (args) => (
  <Analysis {...args} />
);
