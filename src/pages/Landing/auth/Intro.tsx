import { ComponentProps } from 'react';
import { LandingLayout } from '../LandingLayout';

type IntroProps<T extends React.ElementType> = ComponentProps<
  typeof LandingLayout
> &
  Component<T>;

export function Intro({ className, ...restProps }: IntroProps<'div'>) {
  return (
    <LandingLayout className="pl-4 pr-4" {...restProps}>
      <p className="mt-24 border-b border-b-Gray-400 pb-8">
        고객님의 편리한 타까마까 이용을 위해 아래 접근권한의 허용이 필요합니다.
      </p>
      <p className="text-body-1 mt-8 mb-8 border-b border-b-Gray-400 pb-8 font-bold">
        위치 정보 제공 (선택)
      </p>
      <p>
        위 접근권한은 고객님께 더 나은 서비스를 제공하기 위해 사용됩니다.
        허용에동의하지 않으셔도 타까마까를 이용하실 수 있습니다.
      </p>
    </LandingLayout>
  );
}
