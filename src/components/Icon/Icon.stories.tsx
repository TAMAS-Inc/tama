import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { XCircleIcon } from '@heroicons/react/24/solid';
import {
  ArrowPathIcon,
  InformationCircleIcon,
  ClockIcon,
  ChevronLeftIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

import { Icon } from './Icon';

const meta = {
  component: Icon,
  title: 'Directory/Icon',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof Icon>;

export default meta;

export const Back: ComponentStory<typeof Icon> = (args) => (
  <Icon {...args} icon={ChevronLeftIcon} className="h-6 w-6" />
);

export const Menu: ComponentStory<typeof Icon> = (args) => (
  <Icon {...args} icon={Bars3Icon} className="h-6 w-6" />
);

export const Sync: ComponentStory<typeof Icon> = (args) => (
  <Icon {...args} icon={ArrowPathIcon} className="h-6 w-6" />
);

export const Reset: ComponentStory<typeof Icon> = (args) => (
  <Icon {...args} icon={XCircleIcon} className="h-6 w-6 text-Gray-500" />
);

export const Predict: ComponentStory<typeof Icon> = (args) => (
  <Icon
    {...args}
    icon={ClockIcon}
    className="text-black h-6 w-6"
    stroke-width="2"
  />
);

export const Info: ComponentStory<typeof Icon> = (args) => (
  <Icon
    {...args}
    icon={InformationCircleIcon}
    className="h-6 w-6 text-Primary-600"
    stroke-width="2"
  />
);

export const Search: ComponentStory<typeof Icon> = (args) => (
  <Icon
    {...args}
    icon={MagnifyingGlassIcon}
    className="h-6 w-6 text-Primary-600"
    stroke-width="2"
  />
);
