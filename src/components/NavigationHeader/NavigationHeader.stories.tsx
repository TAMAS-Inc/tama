import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { NavigationHeader } from './NavigationHeader';

const meta = {
  component: NavigationHeader,
  title: 'Header/NavigationHeader',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof NavigationHeader>;

export default meta;

export const Default: ComponentStory<typeof NavigationHeader> = (args) => (
  <NavigationHeader {...args}>타이틀을 입력해주세요</NavigationHeader>
);
