import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { List } from './List';
import { BusCard } from '../BusCard';

const meta = {
  component: List,
  title: 'Components/List',
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
    stationName: '기흥여객차고지',
    direction: '롯데캐슬스카이, 이안두드림, 백남준아트센터',
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

export const MyBusStop: ComponentStory<typeof List> = ({ ...args }) => (
  <List {...args}>
    <List.Item className="flex h-16 flex-col items-start justify-center pl-6">
      <BusCard.Info className="static left-0 flex translate-x-0 flex-row">
        <BusCard.Content className="w-28 text-body1">춘시기네</BusCard.Content>
        <BusCard.StationName className="mb-0 flex items-center justify-center">
          {args.stationName}
        </BusCard.StationName>
      </BusCard.Info>
      <BusCard.Content className="text-Gray-400">
        {args.direction} 방면
      </BusCard.Content>
    </List.Item>

    <List.Item className="flex h-16 flex-col items-start justify-center pl-6">
      <BusCard.Info className="static left-0 flex translate-x-0 flex-row">
        <BusCard.Content className="w-28 text-body1">라이언네</BusCard.Content>
        <BusCard.StationName className="mb-0 flex items-center justify-center">
          기흥역
        </BusCard.StationName>
      </BusCard.Info>
      <BusCard.Content className="text-Gray-400">강남역 방면</BusCard.Content>
    </List.Item>
  </List>
);

export const BusStop: ComponentStory<typeof List> = ({ ...args }) => (
  <List {...args}>
    <List.Item className="flex h-16 flex-col items-start justify-center pl-6">
      <BusCard.StationName>{args.stationName}</BusCard.StationName>
      <BusCard.Info className="text-bold static left-0 flex translate-x-0 flex-row text-Gray-400">
        <BusCard.Content className="w-[50px]">50095</BusCard.Content>
        <BusCard.Content className="border-l border-Gray-200 pl-2">
          {args.direction} 방면
        </BusCard.Content>
      </BusCard.Info>
    </List.Item>

    <List.Item className="flex h-16 flex-col items-start justify-center pl-6">
      <BusCard.StationName>기흥역</BusCard.StationName>
      <BusCard.Info className="text-bold static left-0 flex translate-x-0 flex-row text-Gray-400">
        <BusCard.Content className="w-[50px]">50095</BusCard.Content>
        <BusCard.Content className="border-l border-Gray-200 pl-2">
          종점 방면
        </BusCard.Content>
      </BusCard.Info>
    </List.Item>
  </List>
);
