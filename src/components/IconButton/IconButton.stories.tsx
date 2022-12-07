import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { XCircleIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import { InformationCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

import { IconButton } from './IconButton';

const meta = {
  component: IconButton,
  title: 'Directory/IconButton',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof IconButton>;

export default meta;

export const Sync: ComponentStory<typeof IconButton> = (args) => (
  <IconButton
    {...args}
    className="h-12 w-12 rounded-full bg-Primary-600 text-Primary-100"
  >
    <IconButton.Icon icon={ArrowPathIcon} className="h-6 w-6" />
  </IconButton>
);

export const Reset: ComponentStory<typeof IconButton> = (args) => (
  <IconButton {...args} className="h-4 w-4">
    <IconButton.Icon icon={XCircleIcon} className="text-Gray-500" />
  </IconButton>
);

export const Predict: ComponentStory<typeof IconButton> = (args) => (
  <IconButton {...args} className="h-6 w-6">
    <IconButton.Icon icon={ClockIcon} className="text-black" stroke-width="2" />
  </IconButton>
);

export const Info: ComponentStory<typeof IconButton> = (args) => (
  <IconButton {...args} className="h-6 w-6">
    <IconButton.Icon
      icon={InformationCircleIcon}
      className="text-Primary-600"
      stroke-width="2"
    />
  </IconButton>
);
