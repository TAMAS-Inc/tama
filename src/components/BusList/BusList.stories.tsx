import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { BusList } from './BusList';

const meta = {
  component: BusList,
  title: 'Directory/BusList',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
  args: { busNumber: 5001, isChecked: true },
} as ComponentMeta<typeof BusList>;

export default meta;

export const Realtime: ComponentStory<typeof BusList> = ({ ...args }) => (
  <BusList {...args}>
    <BusList.Item>
      <BusList.BusNumber>{args.busNumber}</BusList.BusNumber>
      <BusList.Info>
        <BusList.InfoContent>12분 34초</BusList.InfoContent>
        <BusList.InfoContent>
          5번째 전 (실시간 20석, 예측 4석)
        </BusList.InfoContent>
      </BusList.Info>
      <BusList.InfoIcon />
    </BusList.Item>
  </BusList>
);

export const Selection: ComponentStory<typeof BusList> = ({ ...args }) => (
  <BusList {...args}>
    <BusList.Item>
      <BusList.BusNumber>5003</BusList.BusNumber>
      <BusList.CheckIcon isChecked={args.isChecked} />
    </BusList.Item>
  </BusList>
);
