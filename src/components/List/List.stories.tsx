import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { List } from './List';

const meta = {
  component: List,
  title: 'Components/List',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
  args: { title: 'AWSCore', subtitle: '2022.12.08' },
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
