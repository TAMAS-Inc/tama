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
  args: { routeName: 5001, isChecked: true },
} as ComponentMeta<typeof BusCard>;

export default meta;

export const Realtime: ComponentStory<typeof BusCard> = ({ ...args }) => (
  <BusCard {...args}>
    <BusCard.RouteName>{args.routeName}</BusCard.RouteName>
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
    <BusCard.CheckIcon isChecked={args.isChecked} />
  </BusCard>
);
