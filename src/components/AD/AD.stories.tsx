import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { AD } from './AD';

const meta = {
  component: AD,
  title: 'Toast/AD',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof AD>;

export default meta;

export const Default: ComponentStory<typeof AD> = (args) => <AD {...args} />;
