import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Notification } from './Notification';

const meta = {
  component: Notification,
  title: 'Toast/Notification',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof Notification>;

export default meta;

export const Default: ComponentStory<typeof Notification> = (args) => (
  <Notification {...args} />
);
