import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Main from '.';

const meta = {
  component: Main,
  title: 'Pages/Main',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof Main>;

export default meta;

export const Default: ComponentStory<typeof Main> = () => <Main />;
