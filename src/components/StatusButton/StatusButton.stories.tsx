import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { CheckIcon } from '@heroicons/react/24/solid';
import { StatusButton } from './StatusButton';

const meta = {
  component: StatusButton,
  title: 'Directory/StatusButton',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof StatusButton>;

const disabled = true;

export default meta;

export const AgreeButton: ComponentStory<typeof StatusButton> = (args) => (
  <StatusButton className="font-bold" {...args}>
    확인
  </StatusButton>
);

export const DisabledAgreeButton: ComponentStory<typeof StatusButton> = (
  args
) => (
  <StatusButton className="font-bold" disabled {...args}>
    확인
  </StatusButton>
);

export const PrivacyAgreementButton: ComponentStory<typeof StatusButton> = (
  args
) => (
  <StatusButton
    className="relative pl-[102px] text-left text-body2 font-bold"
    {...args}
  >
    <StatusButton.Icon
      className="absolute top-5 left-[70px] h-6 w-6"
      icon={CheckIcon}
    />
    개인정보 수집 및 이용동의
  </StatusButton>
);

export const DisabledPrivacyAgreementButton: ComponentStory<
  typeof StatusButton
> = (args) => (
  <StatusButton className="text-body2 font-bold" disabled {...args}>
    개인정보 수집 및 이용동의
  </StatusButton>
);

export const BusSelectionButton: ComponentStory<typeof StatusButton> = (
  args
) => (
  <StatusButton
    disabled={!disabled}
    className="h-12 bg-White pl-3 text-left"
    {...args}
  >
    {!disabled ? '정류장을 먼저 선택해주세요' : '버스를 선택해주세요'}
  </StatusButton>
);

export const DisabledBusSelectionButton: ComponentStory<typeof StatusButton> = (
  args
) => (
  <StatusButton
    disabled={disabled}
    className="h-12 bg-Gray-400 pl-3 text-left"
    {...args}
  >
    {disabled ? '정류장을 먼저 선택해주세요' : '버스를 선택해주세요'}
  </StatusButton>
);
