import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Table } from './Table';

const meta = {
  component: Table,
  title: 'Directory/Table',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof Table>;

export default meta;

export const Template: ComponentStory<typeof Table> = (args) => (
  <Table {...args}>
    <Table.Header>
      <Table.HeaderItem>예상 시간</Table.HeaderItem>
      <Table.HeaderItem>예상 잔여 좌석</Table.HeaderItem>
      <Table.HeaderItem>버스 번호</Table.HeaderItem>
      <Table.HeaderItem>상세 분석</Table.HeaderItem>
    </Table.Header>
    <Table.Body>
      <Table.BodyItem>07:25</Table.BodyItem>
      <Table.BodyItem>14</Table.BodyItem>
      <Table.BodyItem>5001</Table.BodyItem>
      <Table.BodyItem>
        <Table.Icon />
      </Table.BodyItem>
    </Table.Body>
  </Table>
);
