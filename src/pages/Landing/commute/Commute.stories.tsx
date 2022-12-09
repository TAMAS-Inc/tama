import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Commute } from './Commute';

const meta = {
  component: Commute,
  title: 'Directory/Page/Commute',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof Commute>;

export default meta;

const Template: ComponentStory<typeof Commute> = (args) => (
  <Commute {...args} />
);

export const Default = Template.bind({});

Default.args = {};
