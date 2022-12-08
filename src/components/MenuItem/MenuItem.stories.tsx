import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { MenuItem } from './MenuItem';

const meta = {
  component: MenuItem,
  title: 'Directory/MenuItem',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof MenuItem>;

export default meta;

const Template: ComponentStory<typeof MenuItem> = (args) => (
  <MenuItem {...args}>공지사항</MenuItem>
);

export const Default = Template.bind({});

Default.args = {};
