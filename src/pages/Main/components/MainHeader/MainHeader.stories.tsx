import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { MainHeader } from './MainHeader';

const meta = {
  component: MainHeader,
  title: 'Header/MainHeader',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof MainHeader>;

export default meta;

export const Default: ComponentStory<typeof MainHeader> = (args) => (
  <MainHeader {...args}>정류장 별칭</MainHeader>
);
