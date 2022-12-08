import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { BusPredictTableHead } from './BusPredictTableHead';

const meta = {
  component: BusPredictTableHead,
  title: 'Directory/BusPredictTableHead',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof BusPredictTableHead>;

export default meta;

const Template: ComponentStory<typeof BusPredictTableHead> = (args) => (
  <BusPredictTableHead {...args}>
    <BusPredictTableHead.Time>예상 시간</BusPredictTableHead.Time>
    <BusPredictTableHead.Seat>예상 잔여 좌석</BusPredictTableHead.Seat>
    <BusPredictTableHead.BusNumber>버스 번호</BusPredictTableHead.BusNumber>
    <BusPredictTableHead.Analysis>상세 분석</BusPredictTableHead.Analysis>
  </BusPredictTableHead>
);

export const Default = Template.bind({});

Default.args = {};
