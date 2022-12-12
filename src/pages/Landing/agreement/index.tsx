import { useState, ChangeEvent, useEffect, ChangeEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { InputContainer, StatusButton } from '@/components';
import { tw } from '@/utils/tailwindMerge';

type AgreementProps<T extends React.ElementType> = Component<T>;

interface CheckboxProps {
  handler: ChangeEventHandler;
  name: string;
  state: boolean;
  children: React.ReactNode;
  className?: string;
}

function Checkbox({
  handler,
  state,
  name,
  children,
  className,
}: CheckboxProps) {
  return (
    <InputContainer className={tw('mt-4 flex rounded-none', className)}>
      <InputContainer.Label>
        <InputContainer.Label.Input
          name={name}
          type="checkbox"
          className="mx-2 h-6 w-6 bg-Gray-500"
          onChange={handler}
          checked={state}
        />
        {children}
      </InputContainer.Label>
    </InputContainer>
  );
}

export default function Agreement({
  children,
  className,
  ...restProps
}: AgreementProps<'div'>) {
  const [checkList, setCheckList] = useState<string[]>([]);
  const [isAgree, setIsAgree] = useState<boolean>(false);

  const checkAll = (e: ChangeEvent<HTMLInputElement>) =>
    e.target.checked ? setCheckList(['location', 'ad']) : setCheckList([]);

  const check = (e: ChangeEvent<HTMLInputElement>) =>
    e.target.checked
      ? setCheckList([...checkList, e.target.name])
      : setCheckList(checkList.filter((choice) => choice !== e.target.name));

  useEffect(() => {
    if (checkList.includes('location') || checkList.length === 2) {
      setIsAgree(true);
    } else {
      setIsAgree(false);
    }
  }, [checkList]);

  return (
    <div className="pl-4 pr-4" {...restProps}>
      <p className="mt-24 pb-12">
        만나서 반갑습니다. 아래 약관에 동의하시면 행복한 출근길이 시작될 거예요!
      </p>

      <Checkbox
        name="all"
        handler={checkAll}
        state={checkList.length === 2}
        className="border-bottom flex w-full rounded-none border-b border-b-Gray-400 pb-4"
      >
        전체 동의
      </Checkbox>

      <Checkbox
        name="location"
        handler={check}
        state={checkList.includes('location')}
      >
        위치 기반 서비스 약관 동의 (필수)
      </Checkbox>

      <Checkbox name="ad" handler={check} state={checkList.includes('ad')}>
        마케팅 정보 수신 동의 (선택)
      </Checkbox>

      <Link to="/commute">
        <StatusButton
          disabled={!isAgree}
          className="fixed bottom-8 w-[calc(100%-32px)]"
        >
          확인
        </StatusButton>
      </Link>
    </div>
  );
}
