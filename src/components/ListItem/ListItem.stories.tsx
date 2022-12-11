import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ListItem } from './ListItem';

const meta = {
  component: ListItem,
  title: 'Directory/ListItem',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
  args: { title: 'AWSCore', subtitle: '2022.12.08' },
} as ComponentMeta<typeof ListItem>;

export default meta;

export const Notice: ComponentStory<typeof ListItem> = ({ ...args }) => (
  <ListItem {...args}>
    <ListItem.Title>{args.title}</ListItem.Title>
    <ListItem.Subtitle>{args.subtitle}</ListItem.Subtitle>
    <ListItem.NextIcon />
  </ListItem>
);

export const OpenSource: ComponentStory<typeof ListItem> = ({ ...args }) => (
  <ListItem className="h-14" {...args}>
    <ListItem.Title>{args.title}</ListItem.Title>
    <ListItem.NextIcon />
  </ListItem>
);

export const Menu: ComponentStory<typeof ListItem> = ({ ...args }) => (
  <ListItem className="h-14 pl-4" {...args}>
    <ListItem.Title>{args.title}</ListItem.Title>
  </ListItem>
);
