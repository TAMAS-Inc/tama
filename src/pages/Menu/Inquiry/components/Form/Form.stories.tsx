import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Form } from './Form';

const meta = {
  component: Form,
  title: 'Components/Form',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof Form>;

export default meta;

const Template: ComponentStory<typeof Form> = (args) => <Form {...args} />;

export const Default = Template.bind({});

Default.args = {};
