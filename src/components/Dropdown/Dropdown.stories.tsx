import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Dropdown } from './Dropdown';

const meta = {
  component: Dropdown,
  title: 'Components/Dropdown',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof Dropdown>;

export default meta;

export const Default: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown {...args}>
    <Dropdown.Content>춘시기네</Dropdown.Content>
    <Dropdown.Button />
  </Dropdown>
);

export const Colored: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown isOpen {...args}>
    <Dropdown.Content className="text-Primary-600">춘시기네</Dropdown.Content>
    <Dropdown.Button />
  </Dropdown>
);
