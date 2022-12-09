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
  args: { disabled: true },
} as ComponentMeta<typeof StatusButton>;

export default meta;

export const Agree: ComponentStory<typeof StatusButton> = ({
  disabled,
  ...args
}) => (
  <StatusButton className="font-bold" disabled={disabled} {...args}>
    확인
  </StatusButton>
);

export const PrivacyAgreement: ComponentStory<typeof StatusButton> = ({
  disabled,
  ...args
}) => (
  <StatusButton
    className={
      disabled ? 'text-body2 font-bold' : 'relative text-body2 font-bold'
    }
    disabled={disabled}
    {...args}
  >
    <StatusButton.Icon
      className={
        disabled
          ? 'hidden'
          : 'absolute left-[24%] top-5 h-6 w-6 -translate-x-1/2'
      }
      icon={CheckIcon}
    />
    개인정보 수집 및 이용동의
  </StatusButton>
);

export const BusSelection: ComponentStory<typeof StatusButton> = ({
  disabled,
  ...args
}) => (
  <StatusButton
    className={
      disabled ? 'h-12 pl-3 text-left' : 'h-12 bg-White pl-3 text-left'
    }
    disabled={disabled}
    {...args}
  >
    {disabled ? '정류장을 먼저 선택해주세요' : '버스를 선택해주세요'}
  </StatusButton>
);
