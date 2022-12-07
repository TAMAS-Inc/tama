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
} as ComponentMeta<typeof ToggleIconButton>;

export default meta;

const isChecked = true;
export const Checked: ComponentStory<typeof ToggleIconButton> = (args) => (
  <ToggleIconButton checked={isChecked}>
    <ToggleIconButton.Icon
      fill="#A87600"
      icon={isChecked ? CheckCircleIcon : PlusCircleIcon}
      {...args}
    />
  </ToggleIconButton>
);

export const Unchecked: ComponentStory<typeof ToggleIconButton> = (args) => (
  <ToggleIconButton checked={!isChecked}>
    <ToggleIconButton.Icon
      icon={!isChecked ? CheckCircleIcon : PlusCircleIcon}
      {...args}
    />
  </ToggleIconButton>
);

// dropdown
export const DropdonwChecked: ComponentStory<typeof ToggleIconButton> = (
  args
) => (
  <ToggleIconButton checked={isChecked}>
    <ToggleIconButton.Icon
      icon={isChecked ? ChevronDownIcon : ChevronUpIcon}
      {...args}
    />
  </ToggleIconButton>
);

export const DropdonwUnchecked: ComponentStory<typeof ToggleIconButton> = (
  args
) => (
  <ToggleIconButton checked={!isChecked}>
    <ToggleIconButton.Icon
      icon={!isChecked ? ChevronDownIcon : ChevronUpIcon}
      {...args}
    />
  </ToggleIconButton>
);
