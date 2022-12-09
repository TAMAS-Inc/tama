import { ComponentProps } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { LandingLayout } from '../LandingLayout';
import {
  NavigationHeader,
  InputContainer,
  TextButton,
  Icon,
} from '@/components';

type CommuteProps<T extends React.ElementType> = ComponentProps<
  typeof LandingLayout
> &
  Component<T>;

export function Commute({
  children,
  className,
  ...restProps
}: CommuteProps<'div'>) {
  return (
    <LandingLayout className="pl-4 pr-4" {...restProps}>
      <NavigationHeader className="-ml-4">출근길 관리</NavigationHeader>
      <div className="mt-8">
        <h2 className="mb-2 text-body2">내 정류장 별칭 입력</h2>
        <InputContainer className="relative h-12 w-full">
          <InputContainer.Label>
            <InputContainer.Label.Input className="border border-Gray-300" />
          </InputContainer.Label>
          <InputContainer.ResetButton className="absolute top-3 right-3 h-6 w-6 fill-Gray-500" />
        </InputContainer>
      </div>
      <div className="mt-8">
        <h2 className="mb-2 text-body2">정류장 이름</h2>
        <TextButton className="relative h-12 w-full rounded-lg border border-Gray-300 bg-White text-left text-body2 text-Gray-400">
          <Icon
            icon={MagnifyingGlassIcon}
            className="absolute top-3 right-3 h-6 w-6 text-Gray-400"
            stroke-width="2"
          />
          정류장 검색
        </TextButton>
      </div>
      <div className="mt-8">
        <h2 className="mb-2 text-body2">버스 번호</h2>
        <TextButton className="relative h-12 w-full rounded-lg border border-Gray-300 bg-White text-left text-body2 text-Gray-400">
          <Icon
            icon={MagnifyingGlassIcon}
            className="absolute top-3 right-3 h-6 w-6 text-Gray-400"
            stroke-width="2"
          />
        </TextButton>
      </div>
    </LandingLayout>
  );
}
