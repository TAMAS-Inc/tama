import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { SyncButtonWithoutTime } from './SyncButtonWithoutTime';

const meta = {
  component: SyncButtonWithoutTime,
  title: 'Toast/SyncButtonWithoutTime',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof SyncButtonWithoutTime>;

export default meta;

export const Default: ComponentStory<typeof SyncButtonWithoutTime> = (args) => (
  <SyncButtonWithoutTime {...args} />
);
