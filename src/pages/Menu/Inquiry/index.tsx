/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { tw } from '@/utils/tailwindMerge';
import {
  InputContainer,
  NavigationHeader,
  StatusButton,
  MessageModal,
} from '@/components';
import { postInquiry } from './hooks/useInquiry';

type InquiryProps<T extends React.ElementType> = Component<T>;

export default function Inquiry({
  className,
  ...restProps
}: InquiryProps<'div'>) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [readMore, setReadMore] = useState(false);

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm<Inquiry>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<Inquiry> = async (data) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const req = await postInquiry(data);
      setIsModalOpen(true);
    } catch {
      setIsError(true);
      setIsModalOpen(true);
    }
  };

  const handleModalClick = () => {
    setIsModalOpen(false);
    if (!isError) {
      navigate(-1);
    }
  };

  const handleClick = () => {
    setReadMore(!readMore);
  };

  interface Scheme {
    key: keyof Inquiry;
    type: 'text' | 'textarea' | 'checkbox';
    label: string;
    placeholder?: string;
    validator: {
      required?: string | boolean;
      pattern?: {
        value: RegExp;
        message: string;
      };
    };
  }
  const schemes: Scheme[] = [
    {
      key: 'email',
      type: 'text',
      label: '이메일',
      placeholder: 'example@gmail.com',
      validator: {
        required: '이메일을 입력해 주세요',
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
          message: '이메일 형식이 아닙니다.',
        },
      },
    },
    {
      key: 'title',
      type: 'text',
      label: '제목',
      placeholder: '문의 제목을 입력해주세요',
      validator: {
        required: '제목을 입력해 주세요',
      },
    },
    {
      key: 'content',
      type: 'textarea',
      label: '문의 내용',
      placeholder: '문의 내용을 입력해주세요',
      validator: {
        required: '내용을 입력해 주세요',
      },
    },
    {
      key: 'agreement',
      type: 'checkbox',
      label: '개인정보 수집 및 이용 동의',
      validator: {
        required: true,
      },
    },
  ];

  return (
    <div className={tw('', className)} {...restProps}>
      <NavigationHeader>이메일 문의하기</NavigationHeader>
      <form
        className="mt-8 mr-4 ml-4 flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {schemes
          .filter((scheme) => scheme.type === 'text')
          .map(({ key, label, placeholder, validator }) => (
            <InputContainer key={key} className="h-full w-full">
              <InputContainer.Label className=" block">
                <span className="text-body2 font-bold">{label}</span>
                <InputContainer.Label.Input
                  className="mt-2 h-12 border border-Gray-300 text-body3 focus-visible:border-2 focus-visible:border-Black"
                  placeholder={placeholder}
                  {...register(key, validator)}
                />
                <span className="text-gray-500 ml-2 text-body3">
                  {errors && errors[key]?.message}
                </span>
              </InputContainer.Label>
            </InputContainer>
          ))}
        <InputContainer className="h-full w-full">
          <InputContainer.Label className=" block">
            <span className="text-body2 font-bold">
              {schemes.find((scheme) => scheme.key === 'content')?.label}
            </span>
            <textarea
              className="mt-2 h-52 w-full resize-none rounded-lg border border-Gray-300 p-3 text-body3 focus-visible:border-2 focus-visible:border-Black"
              placeholder={
                schemes.find((scheme) => scheme.key === 'content')?.placeholder
              }
              {...register(
                'content',
                schemes.find((scheme) => scheme.key === 'content')?.validator
              )}
            />
            <span className="text-gray-500 ml-2 text-body3">
              {errors && errors.content?.message}
            </span>
          </InputContainer.Label>
        </InputContainer>
        <InputContainer className={tw('mt-4 flex rounded-none', className)}>
          <InputContainer.Label>
            <InputContainer.Label.Input
              type="checkbox"
              className="mr-2 h-6 w-6 bg-Gray-500"
              {...register(
                'agreement',
                schemes.find((scheme) => scheme.key === 'agreement')?.validator
              )}
            />
            개인정보 수집 및 이용동의 (필수)
          </InputContainer.Label>
        </InputContainer>

        <button
          type="button"
          className="w-full text-right font-bold text-Gray-500"
          onClick={handleClick}
        >
          {readMore ? '숨기기 ▲' : '개인정보 수집 및 이용 동의 내용보기 ▼'}
        </button>
        {readMore && (
          <p className="text-body3 text-Gray-300">
            개인정보처리자는 다음의 어느 하나에 해당하는 경우에는 개인정보를
            수집할 수 있으며 그 수집 목적의 범위에서 이용할 수
            있습니다(「개인정보 보호법」 제15조제1항). 정보주체의 동의를 받은
            경우 법률에 특별한 규정이 있거나 법령상 의무를 준수하기 위하여
            불가피한 경우 공공기관이 법령 등에서 정하는 소관 업무의 수행을
            위하여 불가피한 경우 정보주체와의 계약의 체결 및 이행을 위하여
            불가피하게 필요한 경우 정보주체 또는 그 법정대리인이 의사표시를 할
            수 없는 상태에 있거나 주소불명 등으로 사전 동의를 받을 수 없는
            경우로서 명백히 정보주체 또는 제3자의 급박한 생명, 신체, 재산의
            이익을 위하여 필요하다고 인정되는 경우 개인정보처리자의 정당한
            이익을 달성하기 위하여 필요한 경우로서 명백하게 정보주체의 권리보다
            우선하는 경우. 이 경우 개인정보처리자의 정당한 이익과 상당한 관련이
            있고 합리적인 범위를 초과하지 않은 경우에 한함 ※ 이를 위반하여
            개인정보를 수집한 자는 5천만원 이하의 과태료를
            부과받습니다(「개인정보 보호법」 제75조제1항제1호). ※
            개인정보처리자란 업무를 목적으로 개인정보파일을 운용하기 위하여
            스스로 또는 다른 사람을 통하여 개인정보를 처리하는 공공기관, 법인,
            단체 및 개인 등을 말합니다(「개인정보 보호법」 제2조제5호).
            개인정보처리자는 위에 따른 동의를 받을 때에는 다음의 사항을
            정보주체에게 알려야 합니다. 다음의 어느 하나의 사항을 변경하는
            경우에도 이를 알리고 동의를 받아야 합니다(「개인정보
            보호법」제15조제2항). 개인정보의 수집·이용 목적 수집하려는
            개인정보의 항목 개인정보의 보유 및 이용 기간 동의를 거부할 권리가
            있다는 사실 및 동의 거부에 따른 불이익이 있는 경우에는 그 불이익의
            내용 ※ 이를 위반하여 정보주체에게 알려야 할 사항을 알리지 않은 자는
            3천만원 이하의 과태료를 부과받습니다(「개인정보
            보호법」제75조제2항제1호). 개인정보처리자는 당초 수집 목적과
            합리적으로 관련된 범위에서 정보주체에게 불이익이 발생하는지 여부,
            암호화 등 안전성 확보에 필요한 조치를 하였는지 여부 등을 고려하여
            정보주체의 동의 없이 개인정보를 이용할 수 있습니다(「개인정보
            보호법」제15조제3항).
          </p>
        )}
        <StatusButton
          type="submit"
          className="font-bold"
          disabled={!formState.isValid}
        >
          작성 완료
        </StatusButton>
      </form>
      {isModalOpen && (
        <MessageModal>
          <MessageModal.ModalContainer>
            <MessageModal.Content className="flex flex-col">
              {isError ? (
                <p>🥲 문의하기에 실패하였습니다!</p>
              ) : (
                <>
                  <p>정상적으로 처리되었습니다.</p>
                  <p>감사합니다.</p>
                </>
              )}
            </MessageModal.Content>
            <MessageModal.ButtonContainer>
              <MessageModal.Button onClick={handleModalClick}>
                확인
              </MessageModal.Button>
            </MessageModal.ButtonContainer>
          </MessageModal.ModalContainer>
          <MessageModal.DimBackground />
        </MessageModal>
      )}
    </div>
  );
}
