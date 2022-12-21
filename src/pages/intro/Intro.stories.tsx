import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Intro from './index';

const meta = {
  component: Intro,
  title: 'Page/Intro',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof Intro>;

export default meta;

const Template: ComponentStory<typeof Intro> = () => <Intro />;

export const Default = Template.bind({});

Default.args = {};
