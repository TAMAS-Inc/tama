import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Prediction from '.';

const meta = {
  component: Prediction,
  title: 'Pages/Prediction',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof Prediction>;

export default meta;

export const Default: ComponentStory<typeof Prediction> = (args) => (
  <Prediction {...args} />
);
