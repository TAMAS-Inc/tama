import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Toast } from './Toast';

const meta = {
  component: Toast,
  title: 'Components/Toast',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof Toast>;

export default meta;

export const AD: ComponentStory<typeof Toast> = (args) => (
  <Toast {...args} className="h-16">
    <Toast.Content>đ° ę´ęł ěëë¤</Toast.Content>
    <Toast.CloseButton />
  </Toast>
);
export const Notification: ComponentStory<typeof Toast> = (args) => (
  <Toast {...args} className="h-9">
    <Toast.Content>đ ęłľě§ěëë¤</Toast.Content>
    <Toast.CloseButton />
  </Toast>
);
