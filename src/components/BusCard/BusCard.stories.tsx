import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { BusCard } from './BusCard';

const meta = {
  component: BusCard,
  title: 'Components/BusCard',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof BusCard>;

export default meta;

export const Realtime: ComponentStory<typeof BusCard> = ({ ...args }) => (
  <BusCard {...args}>
    <BusCard.RouteName>hi</BusCard.RouteName>
    <BusCard.Info>
      <BusCard.Content>12분 34초</BusCard.Content>
      <BusCard.Content>5번째 전 (실시간 20석, 예측 4석)</BusCard.Content>
    </BusCard.Info>
    <BusCard.InfoIcon />
  </BusCard>
);

export const Selection: ComponentStory<typeof BusCard> = ({ ...args }) => (
  <BusCard {...args}>
    <BusCard.RouteName>5003</BusCard.RouteName>
    <BusCard.CheckIcon isChecked />
  </BusCard>
);

export const BusStop: ComponentStory<typeof BusCard> = ({ ...args }) => (
  <BusCard className="flex flex-col items-start justify-center" {...args}>
    <BusCard.StationName>bye</BusCard.StationName>
    <BusCard.Info className="text-bold static left-0 flex translate-x-0 flex-row text-Gray-400">
      <BusCard.Content className="w-[50px]">50095</BusCard.Content>
      <BusCard.Content className="border-l border-Gray-200 pl-2">
        방면
      </BusCard.Content>
    </BusCard.Info>
  </BusCard>
);

export const MyBusStop: ComponentStory<typeof BusCard> = ({ ...args }) => (
  <BusCard className="flex flex-col items-start justify-center" {...args}>
    <BusCard.Info className="static left-0 flex translate-x-0 flex-row">
      <BusCard.Content className="w-28 text-body1">춘시기네</BusCard.Content>
      <BusCard.StationName className="mb-0 flex items-center justify-center">
        CU
      </BusCard.StationName>
    </BusCard.Info>
    <BusCard.Content className="text-Gray-400">방면</BusCard.Content>
  </BusCard>
);
