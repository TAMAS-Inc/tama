import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { LandingLayout } from './LandingLayout';

const meta = {
  component: LandingLayout,
  title: 'Page/LandingLayout',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof LandingLayout>;

export default meta;

const Template: ComponentStory<typeof LandingLayout> = (args) => (
  <LandingLayout {...args} />
);

export const Default = Template.bind({});

Default.args = {};
