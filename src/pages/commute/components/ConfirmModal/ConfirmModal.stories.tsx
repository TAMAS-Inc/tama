import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ConfirmModal } from './ConfirmModal';

const meta = {
  component: ConfirmModal,
  title: 'Components/ConfirmModal',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof ConfirmModal>;

export default meta;

const Template: ComponentStory<typeof ConfirmModal> = (args) => (
  <ConfirmModal {...args} />
);

export const Default = Template.bind({});

Default.args = {};
