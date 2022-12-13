import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { DropdownModal } from './DropdownModal';

const meta = {
  component: DropdownModal,
  title: 'Components/DropdownModal',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof DropdownModal>;

export default meta;

const Template: ComponentStory<typeof DropdownModal> = (args) => (
  <DropdownModal {...args} />
);

export const Default = Template.bind({});

Default.args = {};
