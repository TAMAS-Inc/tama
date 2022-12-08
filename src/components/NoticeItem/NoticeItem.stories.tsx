import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { NoticeItem } from './NoticeItem';

const meta = {
  component: NoticeItem,
  title: 'Directory/NoticeItem',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof NoticeItem>;

export default meta;

export const Default: ComponentStory<typeof NoticeItem> = (args) => (
  <NoticeItem {...args}>
    <NoticeItem.Title>
      서비스 이용약관 개정 안내(12월 25일 시행)
    </NoticeItem.Title>
    <NoticeItem.Date>2022.12.08</NoticeItem.Date>
    <NoticeItem.Icon
      icon={ChevronRightIcon}
      className="absolute right-6 h-6 w-6 fill-Gray-400"
    />
  </NoticeItem>
);
