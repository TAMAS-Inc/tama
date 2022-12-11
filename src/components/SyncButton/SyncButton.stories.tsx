import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { SyncButton } from './SyncButton';

const meta = {
  component: SyncButton,
  title: 'Toast/SyncButton',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof SyncButton>;

export default meta;

export const Default: ComponentStory<typeof SyncButton> = (args) => (
  <SyncButton {...args} />
);
