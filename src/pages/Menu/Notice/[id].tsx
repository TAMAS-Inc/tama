import { useParams } from 'react-router-dom';
import { tw } from '@/utils/tailwindMerge';
import { NavigationHeader } from '@/components';
import { useNotice } from '@/pages/Main/hooks/useNotice';

type NoticeProps<T extends React.ElementType> = Component<T>;

export default function Notice({
  className,
  ...restProps
}: NoticeProps<'div'>) {
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isError, isLoading, data } = useNotice();

  const notice = data?.find((d) => d.noticeId === id);
  return (
    <div className={tw('', className)} {...restProps}>
      <NavigationHeader>{notice?.title}</NavigationHeader>
      <div className="mt-8 mr-4 ml-4">{notice?.content}</div>
    </div>
  );
}
