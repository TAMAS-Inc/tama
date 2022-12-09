import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { InputItem } from './InputItem';

const meta = {
  component: InputItem,
  title: 'Components/InputItem',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof InputItem>;

export default meta;

const Template: ComponentStory<typeof InputItem> = (args) => (
  <InputItem {...args} />
);

export const Default = Template.bind({});

Default.args = {};
