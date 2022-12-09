import { tw } from '@/utils/tailwindMerge';
import { Icon, NavigationHeader } from '@/components';
import { StatusButton } from '../../../components/StatusButton/StatusButton';
import { CheckIcon, PlayIcon } from '@heroicons/react/24/solid';

type InquiryProps<T extends React.ElementType> = Component<T>;

export default function Inquiry({
  className,
  ...restProps
}: InquiryProps<'div'>) {
  return (
    <div className={tw(' pt-8', className)} {...restProps}>
      <NavigationHeader>이메일 문의하기</NavigationHeader>
      <StatusButton className="text-body2 font-bold" disabled>
        개인정보 수집 및 이용동의
      </StatusButton>
      <button type="button" className="w-full text-right text-Gray-500">
        개인정보 수집 및 이용 동의 내용보기 ▼
      </button>
      <StatusButton className="font-bold" disabled>
        작성 완료
      </StatusButton>
    </div>
  );
}
