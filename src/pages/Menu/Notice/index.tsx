import { Link } from 'react-router-dom';
import { tw } from '@/utils/tailwindMerge';
import { List, LoadingWithDelay, NavigationHeader } from '@/components';
import { useNotice } from '@/pages/Main/hooks/useNotice';
import NotFound from '@/pages/404';

type NoticeProps<T extends React.ElementType> = Component<T>;

export default function Notice({
  className,
  ...restProps
}: NoticeProps<'div'>) {
  const { isError, isLoading, data } = useNotice();

  if (isError) <NotFound />;

  return (
    <div className={tw('', className)} {...restProps}>
      <NavigationHeader>공지사항</NavigationHeader>
      <List>
        {isLoading ? (
          <LoadingWithDelay />
        ) : (
          data?.map(({ noticeId, title }) => (
            <Link key={noticeId} to={`/menu/notice/${noticeId}`}>
              <List.Item>
                <List.Title>{title}</List.Title>
                <List.Icon />
              </List.Item>
            </Link>
          ))
        )}
      </List>
    </div>
  );
}
