import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import {
  ChevronUpIcon,
  ChevronDownIcon,
  PlusCircleIcon,
  CheckCircleIcon as CheckCircleIconOff,
} from '@heroicons/react/24/outline';

import { ToggleIconButton } from './ToggleIconButton';
import { tw } from '@/utils/tailwindMerge';

const meta = {
  component: ToggleIconButton,
  title: 'Components/Button/ToggleIconButton',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
  args: { checked: true },
} as ComponentMeta<typeof ToggleIconButton>;

export default meta;

export const Default: ComponentStory<typeof ToggleIconButton> = ({
  checked,
  ...args
}) => (
  <ToggleIconButton {...args}>
    <ToggleIconButton.Icon
      className={tw(checked ? 'fill-Primary-700' : 'fill-none')}
      icon={checked ? CheckCircleIcon : PlusCircleIcon}
    />
  </ToggleIconButton>
);

// dropdown
export const DropdownChecked: ComponentStory<typeof ToggleIconButton> = ({
  checked,
  ...args
}) => (
  <ToggleIconButton {...args}>
    <ToggleIconButton.Icon icon={checked ? ChevronDownIcon : ChevronUpIcon} />
  </ToggleIconButton>
);

// checkbox
export const Checkbox: ComponentStory<typeof ToggleIconButton> = ({
  checked,
  ...args
}) => (
  <ToggleIconButton {...args}>
    <ToggleIconButton.Icon
      icon={checked ? CheckCircleIcon : CheckCircleIconOff}
    />
  </ToggleIconButton>
);
