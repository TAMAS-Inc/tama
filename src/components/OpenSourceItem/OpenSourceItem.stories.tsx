import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { OpenSourceItem } from './OpenSourceItem';

const meta = {
  component: OpenSourceItem,
  title: 'Directory/OpenSourceItem',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof OpenSourceItem>;

export default meta;

export const Default: ComponentStory<typeof OpenSourceItem> = (args) => (
  <OpenSourceItem {...args}>
    <OpenSourceItem.Title>AWSCore</OpenSourceItem.Title>
    <OpenSourceItem.Icon
      icon={ChevronRightIcon}
      className="absolute right-6 h-6 w-6 fill-Gray-400"
    />
  </OpenSourceItem>
);
