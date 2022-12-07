import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Header } from './Header';

const meta = {
  component: Header,
  title: 'Directory/Header',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/EJJcCP1c4fEXZMnCcXNYbB/TAMAS?node-id=385%3A7190&t=Si2ElFMLkl5w4B58-4',
    },
  },
} as ComponentMeta<typeof Header>;

export default meta;

export const Main: ComponentStory<typeof Header> = (args) => (
  <Header {...args}>
    <Header.Dropdown isOpen>춘시기</Header.Dropdown>
    <Header.Menu />
  </Header>
);

export const Sub: ComponentStory<typeof Header> = (args) => (
  <Header {...args}>
    <Header.BackButton />
    <Header.Title>출근 시간 입력</Header.Title>
  </Header>
);
