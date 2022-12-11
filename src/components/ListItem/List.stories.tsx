import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { List } from './List';
import { BusCard } from '../BusCard';

const meta = {
  component: List,
  title: 'Directory/List',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
  args: {
    title: 'AWSCore',
    subtitle: '2022.12.08',
    routeName: 5001,
    isChecked: true,
  },
} as ComponentMeta<typeof List>;

export default meta;

export const Notice: ComponentStory<typeof List> = ({ ...args }) => (
  <List {...args}>
    <List.Item>
      <List.Title>{args.title}</List.Title>
      <List.Subtitle>{args.subtitle}</List.Subtitle>
      <List.Icon />
    </List.Item>
    <List.Item>
      <List.Title>{args.title}</List.Title>
      <List.Subtitle>{args.subtitle}</List.Subtitle>
      <List.Icon />
    </List.Item>
  </List>
);

export const OpenSource: ComponentStory<typeof List> = ({ ...args }) => (
  <List {...args}>
    <List.Item className="h-14">
      <List.Title>{args.title}</List.Title>
      <List.Icon />
    </List.Item>
  </List>
);

export const Menu: ComponentStory<typeof List> = ({ ...args }) => (
  <List {...args}>
    <List.Item className="h-14 pl-4">
      <List.Title>{args.title}</List.Title>
    </List.Item>
  </List>
);

export const BusSelection: ComponentStory<typeof List> = ({ ...args }) => (
  <List {...args}>
    <List.Item className="h-16 pl-6">
      <BusCard.RouteName>{args.routeName}</BusCard.RouteName>
      <BusCard.CheckIcon isChecked={args.isChecked} />
    </List.Item>

    <List.Item className="h-16 pl-6">
      <BusCard.RouteName>5003B</BusCard.RouteName>
      <BusCard.CheckIcon isChecked={args.isChecked} />
    </List.Item>
  </List>
);

export const BusRealTime: ComponentStory<typeof List> = ({ ...args }) => (
  <List {...args}>
    <List.Item className="h-16 pl-6">
      <BusCard.RouteName>{args.routeName}</BusCard.RouteName>
      <BusCard.Info>
        <BusCard.Content>12분 34초</BusCard.Content>
        <BusCard.Content>5번째 전 (실시간 20석, 예측 4석)</BusCard.Content>
      </BusCard.Info>
      <BusCard.InfoIcon />
    </List.Item>

    <List.Item className="h-16 pl-6">
      <BusCard.RouteName>5003B</BusCard.RouteName>
      <BusCard.Info>
        <BusCard.Content>12분 34초</BusCard.Content>
        <BusCard.Content>5번째 전 (실시간 20석, 예측 4석)</BusCard.Content>
      </BusCard.Info>
      <BusCard.InfoIcon />
    </List.Item>
  </List>
);
