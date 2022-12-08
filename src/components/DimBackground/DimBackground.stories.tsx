import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { DimBackground } from './DimBackground';

const meta = {
  component: DimBackground,
  title: 'Directory/DimBackground',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
  args: {
    isOpened: true,
  },
} as ComponentMeta<typeof DimBackground>;

export default meta;

export const Default: ComponentStory<typeof DimBackground> = ({
  isOpened,
  ...args
}) => <DimBackground isOpened={isOpened} {...args} />;
