import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { InformationList } from './InformationList';

const meta = {
  component: InformationList,
  title: 'Directory/InformationList',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
  args: { title: 'AWSCore', subtitle: '2022.12.08' },
} as ComponentMeta<typeof InformationList>;

export default meta;

export const Notice: ComponentStory<typeof InformationList> = ({ ...args }) => (
  <InformationList {...args}>
    <InformationList.Title>{args.title}</InformationList.Title>
    <InformationList.Date>{args.subtitle}</InformationList.Date>

    <InformationList.Icon
      icon={ChevronRightIcon}
      className="absolute right-6 h-6 w-6 fill-Gray-400"
    />
  </InformationList>
);

export const OpenSource: ComponentStory<typeof InformationList> = ({
  ...args
}) => (
  <InformationList className="h-14" {...args}>
    <InformationList.Title>{args.title}</InformationList.Title>
    <InformationList.Icon
      icon={ChevronRightIcon}
      className="absolute right-6 h-6 w-6 fill-Gray-400"
    />
  </InformationList>
);

export const Menu: ComponentStory<typeof InformationList> = ({ ...args }) => (
  <InformationList className="h-14 w-64 pl-4" {...args}>
    <InformationList.Title>{args.title}</InformationList.Title>
  </InformationList>
);
