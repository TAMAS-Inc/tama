import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { BusPredictCard } from './BusPredictCard';

const meta = {
  component: BusPredictCard,
  title: 'Directory/BusPredictCard',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof BusPredictCard>;

export default meta;

export const Default: ComponentStory<typeof BusPredictCard> = (args) => (
  <BusPredictCard {...args}>
    <BusPredictCard.Time>07:25</BusPredictCard.Time>
    <BusPredictCard.Seat>14</BusPredictCard.Seat>
    <BusPredictCard.BusNumber>5001</BusPredictCard.BusNumber>
    <BusPredictCard.AnalysisButton>
      <BusPredictCard.Icon
        icon={InformationCircleIcon}
        className="h-6 w-6 text-Primary-600"
        stroke-width="2"
      />
    </BusPredictCard.AnalysisButton>
  </BusPredictCard>
);
