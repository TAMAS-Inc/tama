import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { CommuteModal } from './CommuteModal';

const meta = {
  component: CommuteModal,
  title: 'Components/DropdownModal',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof CommuteModal>;

export default meta;

const Template: ComponentStory<typeof CommuteModal> = (args) => (
  <CommuteModal {...args} />
);

export const Default = Template.bind({});

Default.args = {};
