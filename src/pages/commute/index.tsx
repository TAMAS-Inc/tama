import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  NavigationHeader,
  InputContainer,
  TextButton,
  Icon,
  StatusButton,
} from '@/components';

type CommuteProps<T extends React.ElementType> = Component<T>;

export default function Commute({
  children,
  className,
  ...restProps
}: CommuteProps<'div'>) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="pl-4 pr-4" {...restProps}>
      <NavigationHeader className="-ml-4">출근길 관리</NavigationHeader>
      <div className="mt-8">
        <h2 className="mb-2 text-body2">내 정류장 별칭 입력</h2>
        <InputContainer className="relative h-12 w-full">
          <InputContainer.Label>
            <InputContainer.Label.Input
              ref={inputRef}
              className="border border-Gray-300"
            />
          </InputContainer.Label>
          <InputContainer.ResetButton className="absolute top-3 right-3 h-6 w-6 fill-Gray-500" />
        </InputContainer>
      </div>
      <div className="mt-8">
        <h2 className="mb-2 text-body2">정류장 이름</h2>
        <Link to="/searchBusStop">
          <TextButton className="relative h-12 w-full rounded-lg border border-Gray-300 bg-White text-left text-body2 text-Gray-400">
            <Icon
              icon={MagnifyingGlassIcon}
              className="absolute top-3 right-3 h-6 w-6 text-Gray-400"
              stroke-width="2"
            />
            정류장 검색
          </TextButton>
        </Link>
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
      <Link to="/commute">
        <StatusButton
          className="fixed bottom-8 w-[calc(100%-32px)]"
        >
          확인
        </StatusButton>
      </Link>
    </div>
  );
}
