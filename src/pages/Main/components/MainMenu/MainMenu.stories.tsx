import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { MainMenu } from './MainMenu';

const meta = {
  component: MainMenu,
  title: 'Components/MainMenu',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof MainMenu>;

export default meta;

const Template: ComponentStory<typeof MainMenu> = (args) => (
  <MainMenu {...args} />
);

export const Default = Template.bind({});

Default.args = {};
