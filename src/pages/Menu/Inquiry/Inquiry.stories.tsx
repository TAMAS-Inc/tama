import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Inquiry from '.';

const meta = {
  component: Inquiry,
  title: 'Pages/Inquiry',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof Inquiry>;

export default meta;

export const Default: ComponentStory<typeof Inquiry> = (args) => (
  <Inquiry {...args} />
);
