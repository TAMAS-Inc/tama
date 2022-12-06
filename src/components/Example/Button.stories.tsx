import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from './Button';

const meta = {
  component: Button,
  title: 'Button',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof Button>;

export default meta;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: '버튼',
};
