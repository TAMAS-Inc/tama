import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import {
  ChevronUpIcon,
  ChevronDownIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';

import { ToggleIconButton } from './ToggleIconButton';

const meta = {
  component: ToggleIconButton,
  title: 'Directory/ToggleIconButton',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
  args: { checked: true },
} as ComponentMeta<typeof ToggleIconButton>;

export default meta;

export const Checked: ComponentStory<typeof ToggleIconButton> = ({
  checked,
  ...args
}) => (
  <ToggleIconButton {...args} checked={checked}>
    <ToggleIconButton.Icon
      fill={checked ? '#A87600' : '#878787'}
      stroke={checked ? 'none' : '#fff'}
      icon={checked ? CheckCircleIcon : PlusCircleIcon}
    />
  </ToggleIconButton>
);

// dropdown
export const DropdownChecked: ComponentStory<typeof ToggleIconButton> = ({
  checked,
  ...args
}) => (
  <ToggleIconButton checked={checked} {...args}>
    <ToggleIconButton.Icon icon={checked ? ChevronDownIcon : ChevronUpIcon} />
  </ToggleIconButton>
);
