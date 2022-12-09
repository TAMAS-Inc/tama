import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { TextButton } from './TextButton';

const meta = {
  component: TextButton,
  title: 'Components/Button/TextButton',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof TextButton>;

export default meta;

export const Default: ComponentStory<typeof TextButton> = (args) => (
  <TextButton {...args}>버튼</TextButton>
);

export const Edit: ComponentStory<typeof TextButton> = (args) => (
  <TextButton {...args} className="h-8 bg-White text-body1">
    버튼
  </TextButton>
);
