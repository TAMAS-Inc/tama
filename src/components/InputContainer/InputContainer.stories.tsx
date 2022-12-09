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
    <InputContainer.Label>
      <InputContainer.Label.Input className="border" />
    </InputContainer.Label>
    <InputContainer.ResetButton icon={XCircleIcon} />
  </InputContainer>
);

export const Search: ComponentStory<typeof InputContainer> = (args) => (
  <InputContainer className="relative" {...args}>
    <InputContainer.Label>
      <InputContainer.Label.Input
        className="bg-Gray-100"
        placeholder="정류장 검색"
      />
    </InputContainer.Label>
    <InputContainer.ResetButton icon={XCircleIcon} />
  </InputContainer>
);

export const Searching: ComponentStory<typeof InputContainer> = (args) => (
  <InputContainer className="relative" {...args}>
    <InputContainer.Label>
      <InputContainer.Label.Input className="bg-Gray-100" />
    </InputContainer.Label>
    <InputContainer.ResetButton icon={XCircleIcon} />
  </InputContainer>
);

export const Checkbox: ComponentStory<typeof InputContainer> = (args) => (
  <InputContainer className="relative" {...args}>
    <InputContainer.Label>
      <InputContainer.Label.Input
        type="checkbox"
        className="h-6 w-6 bg-Gray-500"
      />
      라벨입니다.
    </InputContainer.Label>
  </InputContainer>
);
