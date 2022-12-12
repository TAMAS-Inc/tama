import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Agreement from './index';

const meta = {
  component: Agreement,
  title: 'Page/Agreement',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof Agreement>;

export default meta;

const Template: ComponentStory<typeof Agreement> = (args) => (
    <Agreement {...args} />
);

export const Default = Template.bind({});

Default.args = {};
