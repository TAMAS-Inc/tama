import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { TextButton } from './TextButton';

const meta = {
  component: TextButton,
  title: 'Directory/TextButton',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof TextButton>;

export default meta;

const Template: ComponentStory<typeof TextButton> = (args) => (
  <TextButton {...args} />
);

export const Default: ComponentStory<typeof TextButton> = (args) => (
  <TextButton {...args}>버튼</TextButton>
);

export const Edit: ComponentStory<typeof TextButton> = (args) => (
  <TextButton {...args} className="text-Body1 h-8 bg-White">
    버튼
  </TextButton>
);
