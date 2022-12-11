import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Terms from '.';

const meta = {
  component: Terms,
  title: 'Pages/Terms',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof Terms>;

export default meta;

export const Default: ComponentStory<typeof Terms> = (args) => (
  <Terms {...args} />
);
