import type { ComponentMeta, ComponentStory } from '@storybook/react';

import OpenSource from '.';

const meta = {
  component: OpenSource,
  title: 'Pages/OpenSource',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof OpenSource>;

export default meta;

export const Default: ComponentStory<typeof OpenSource> = (args) => (
  <OpenSource {...args} />
);
