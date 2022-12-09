import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Notice from '.';

const meta = {
  component: Notice,
  title: 'Pages/Notice',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof Notice>;

export default meta;

export const Default: ComponentStory<typeof Notice> = (args) => (
  <Notice {...args} />
);
