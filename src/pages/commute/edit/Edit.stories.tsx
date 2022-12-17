import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Edit from '.';

const meta = {
  component: Edit,
  title: 'Components/Edit',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof Edit>;

export default meta;

const Template: ComponentStory<typeof Edit> = (args) => <Edit {...args} />;

export const Default = Template.bind({});

Default.args = {};
