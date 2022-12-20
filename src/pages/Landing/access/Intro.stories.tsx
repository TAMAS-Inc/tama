import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Access from '.';

const meta = {
  component: Access,
  title: 'Page/Access',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof Access>;

export default meta;

const Template: ComponentStory<typeof Access> = (args) => <Access {...args} />;

export const Default = Template.bind({});

Default.args = {};
