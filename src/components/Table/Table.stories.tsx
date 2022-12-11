import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Table } from './Table';
import { IconButton } from '@/components/IconButton';

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
        <IconButton.Icon
          icon={InformationCircleIcon}
          className="h-7 w-7 stroke-2 text-Primary-600"
        />
      </Table.BodyItem>
    </Table.Body>
  </Table>
);
