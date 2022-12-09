import { useState, ComponentProps, ChangeEvent, useEffect } from 'react';
import { InputContainer } from '@/components';
import { LandingLayout } from '../LandingLayout';

type AgreementProps<T extends React.ElementType> = ComponentProps<
  typeof LandingLayout
> &
  Component<T>;

interface CheckList {
  name: string;
  isActive: boolean;
}

export function Agreement({
  children,
  className,
  ...restProps
}: AgreementProps<'div'>) {
  const [checkList, setCheckList] = useState<CheckList[]>([]);
  const [isAgree, setIsAgree] = useState<boolean>(false);

  const check = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setCheckList(() => [...checkList, { name, isActive: false }]);
  };

  return (
    // 페이지 코드가 길다 => 좀 더 리액트스럽게 만들어보도록 하자
    <LandingLayout agree={isAgree} className="pl-4 pr-4" {...restProps}>
      <p className="mt-24 pb-12">
        만나서 반갑습니다. 아래 약관에 동의하시면 행복한 출근길이 시작될 거예요!
      </p>
      <InputContainer className="border-bottom flex rounded-none border-b border-b-Gray-400 pb-4">
        <InputContainer.Label className="font-bold">
          <InputContainer.Label.Input
            name="all"
            type="checkbox"
            className="mx-2 h-6 w-6 bg-Gray-500"
          />
          전체 동의
        </InputContainer.Label>
      </InputContainer>

      <InputContainer className="mt-4 flex rounded-none">
        <InputContainer.Label>
          <InputContainer.Label.Input
            name="location"
            type="checkbox"
            className="mx-2 h-6 w-6 bg-Gray-500"
          />
          위치 기반 서비스 약관 동의 (필수)
        </InputContainer.Label>
      </InputContainer>

      <InputContainer className="mt-4 flex rounded-none">
        <InputContainer.Label>
          <InputContainer.Label.Input
            name="ad"
            type="checkbox"
            className="mx-2 h-6 w-6 bg-Gray-500"
          />
          마케팅 정보 수신 동의 (선택)
        </InputContainer.Label>
      </InputContainer>
    </LandingLayout>
  );
}
