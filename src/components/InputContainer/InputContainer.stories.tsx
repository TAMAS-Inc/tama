import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { InputContainer } from './InputContainer';

const meta = {
  component: InputContainer,
  title: 'Directory/InputContainer',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof InputContainer>;

export default meta;

export const Default: ComponentStory<typeof InputContainer> = (args) => (
  <InputContainer className="relative" {...args}>
    <InputContainer.Input className="border" />
    <InputContainer.ResetButton className="absolute top-1.5 right-3" />
  </InputContainer>
);

export const Search: ComponentStory<typeof InputContainer> = (args) => (
  <InputContainer className="relative" {...args}>
    <InputContainer.Input className="bg-Gray-100" placeholder="정류장 검색" />
    <InputContainer.ResetButton className="absolute top-1.5 right-3" />
  </InputContainer>
);

export const Searching: ComponentStory<typeof InputContainer> = (args) => (
  <InputContainer className="relative" {...args}>
    <InputContainer.Input className="bg-Gray-100" />
    <InputContainer.ResetButton className="absolute top-1.5 right-3" />
  </InputContainer>
);

export const Checkbox: ComponentStory<typeof InputContainer> = (args) => (
  <InputContainer className="relative" {...args}>
    <InputContainer.Input className="bg-Gray-100" />
    <InputContainer.ResetButton className="absolute top-1.5 right-3" />
  </InputContainer>
);
