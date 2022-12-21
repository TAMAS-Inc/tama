import { ChangeEventHandler, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { CheckIcon } from '@heroicons/react/24/solid';
import { InputContainer, StatusButton } from '@/components';
import { useCommutes } from '@/hooks/useCommutes';
import { agreementState } from '@/state/atom';
import { tw } from '@/utils/tailwindMerge';

type AgreementProps<T extends React.ElementType> = Component<T>;

interface CheckboxProps {
  onChange: ChangeEventHandler;
  name: string;
  state: boolean;
  children: React.ReactNode;
  className?: string;
}

function Checkbox({
  onChange,
  state,
  name,
  children,
  className,
}: CheckboxProps) {
  return (
    <InputContainer className={tw('mt-4 flex rounded-none', className)}>
      <InputContainer.Label className="cursor-pointer">
        <InputContainer.Label.Input
          name={name}
          type="checkbox"
          className="absolute h-0 w-0 cursor-pointer opacity-0"
          onChange={onChange}
          checked={state}
        />
        <div
          className={tw(
            'abosolute top-0 left-0 mx-2 h-6 w-6 rounded ',
            'after:absolute after:left-9 after:top-5 after:hidden after:h-10 after:w-5 after:border after:content-none',
            state ? 'bg-Primary-400 after:block ' : 'border-[1px] bg-White'
          )}
        >
          {state && <CheckIcon className="fill-White" />}
        </div>
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
  const navigate = useNavigate();
  const { createNewCommute } = useCommutes();
  const [agreement, setAgreement] = useRecoilState(agreementState);

  const isAllAgreed = Object.values(agreement).every((value) => value);

  const handleCheckAllChange = () => {
    if (isAllAgreed)
      setAgreement({ allowLocation: false, allowMarketing: false });
    else setAgreement({ allowLocation: true, allowMarketing: true });
  };

  const handleConfirmButtonClick = () => {
    const comId = createNewCommute('춘식이네');
    navigate(`/commute/edit/${comId}`);
  };

  return (
    <div className="pl-4 pr-4" {...restProps}>
      <p className="mt-24 pb-12">
        만나서 반갑습니다. 아래 약관에 동의하시면 행복한 출근길이 시작될 거예요!
      </p>

      <Checkbox
        name="all"
        onChange={handleCheckAllChange}
        state={isAllAgreed}
        className="border-bottom flex w-full rounded-none border-b border-b-Gray-400 pb-4"
      >
        전체 동의
      </Checkbox>

      <Checkbox
        name="location"
        onChange={(e) => {
          const { checked } = e.target as HTMLInputElement;
          setAgreement((prev) => ({ ...prev, allowLocation: checked }));
        }}
        state={agreement.allowLocation}
      >
        위치 기반 서비스 약관 동의 (필수)
      </Checkbox>

      <Checkbox
        name="ad"
        onChange={(e) => {
          const { checked } = e.target as HTMLInputElement;
          setAgreement((prev) => ({ ...prev, allowMarketing: checked }));
        }}
        state={agreement.allowMarketing}
      >
        마케팅 정보 수신 동의 (선택)
      </Checkbox>

      <StatusButton
        disabled={!agreement.allowLocation}
        className="fixed bottom-8 w-[calc(100%-32px)]"
        onClick={handleConfirmButtonClick}
      >
        확인
      </StatusButton>
    </div>
  );
}
