import { useParams } from 'react-router-dom';
import { tw } from '@/utils/tailwindMerge';
import { LoadingWithDelay, NavigationHeader } from '@/components';
import { useNotice } from '@/pages/Main/hooks/useNotice';
import NotFound from '@/pages/404';

type NoticeProps<T extends React.ElementType> = Component<T>;

export default function Notice({
  className,
  ...restProps
}: NoticeProps<'div'>) {
  const { id } = useParams();
  const { isError, isLoading, data } = useNotice();

  if (isError) <NotFound />;

  const notice = data?.find((d) => d.noticeId === id);
  return (
    <div className={tw('', className)} {...restProps}>
      {isLoading ? (
        <LoadingWithDelay />
      ) : (
        <div>
          <NavigationHeader>{notice?.title}</NavigationHeader>
          <div className="mt-8 mr-4 ml-4">{notice?.content}</div>
        </div>
      )}
    </div>
  );
}
