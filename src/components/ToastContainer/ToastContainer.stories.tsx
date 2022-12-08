import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ToastContainer } from './ToastContainer';

const meta = {
  component: ToastContainer,
  title: 'Directory/ToastContainer',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof ToastContainer>;

export default meta;

export const AD: ComponentStory<typeof ToastContainer> = (args) => (
  <ToastContainer {...args} className="h-16">
    <ToastContainer.Toast>💰 광고입니다</ToastContainer.Toast>
    <ToastContainer.CloseButton />
  </ToastContainer>
);
export const Notification: ComponentStory<typeof ToastContainer> = (args) => (
  <ToastContainer {...args} className="h-9">
    <ToastContainer.Toast>🌟 공지입니다</ToastContainer.Toast>
    <ToastContainer.CloseButton />
  </ToastContainer>
);
