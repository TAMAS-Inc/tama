import { useState, ComponentProps } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { CheckCircleIcon as CheckCircleIconOff } from '@heroicons/react/24/outline';
import { ToggleIconButton } from '@/components';
import { LandingLayout } from '../LandingLayout';

type AgreementProps<T extends React.ElementType> = ComponentProps<
  typeof LandingLayout
> &
  Component<T>;

export function Agreement({
  children,
  className,
  ...restProps
}: AgreementProps<'div'>) {
  const [entireAgree, setEntireAgree] = useState(false);
  const [locationAgree, setLocationAgree] = useState(false);
  const [adAgree, setAdAgree] = useState(false);
  const [isAgree, setIsAgree] = useState(false);

  // 어떤 조건이 만족했을 때, 동의가 false에서 true로 변경되어야 한다.

  return (
    <LandingLayout agree={isAgree} className="pl-4 pr-4" {...restProps}>
      <p className="mt-24 pb-12">
        만나서 반갑습니다. 아래 약관에 동의하시면 행복한 출근길이 시작될 거예요!
      </p>
      <div
        className="border-bottom flex border-b border-b-Gray-400 pb-4"
        onClick={() => {
          setEntireAgree(!entireAgree);
        }}
        aria-hidden="true"
      >
        <ToggleIconButton className="ml-2 mr-2">
          <ToggleIconButton.Icon
            icon={entireAgree ? CheckCircleIcon : CheckCircleIconOff}
          />
        </ToggleIconButton>
        <span className="font-bold">전체 동의</span>
      </div>
      <div
        className="border-bottom mt-4 flex pb-4"
        onClick={() => {
          setLocationAgree(!locationAgree);
        }}
        aria-hidden="true"
      >
        <ToggleIconButton className="ml-2 mr-2">
          <ToggleIconButton.Icon
            icon={locationAgree ? CheckCircleIcon : CheckCircleIconOff}
          />
        </ToggleIconButton>
        <span className="">위치 기반 서비스 약관 동의 (필수)</span>
      </div>
      <div
        className="border-bottom flex pb-4"
        onClick={() => setAdAgree(!adAgree)}
        aria-hidden="true"
      >
        <ToggleIconButton className="ml-2 mr-2">
          <ToggleIconButton.Icon
            icon={adAgree ? CheckCircleIcon : CheckCircleIconOff}
          />
        </ToggleIconButton>
        <span className="">마케팅 정보 수신 동의 (선택)</span>
      </div>
    </LandingLayout>
  );
}
