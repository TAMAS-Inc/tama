import { Link } from 'react-router-dom';
import { tw } from '@/utils/tailwindMerge';
import { List, NavigationHeader } from '@/components';
import { useNotice } from '@/pages/Main/hooks/useNotice';

type NoticeProps<T extends React.ElementType> = Component<T>;

export default function Notice({
  className,
  ...restProps
}: NoticeProps<'div'>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isError, isLoading, data } = useNotice();

  return (
    <div className={tw('', className)} {...restProps}>
      <NavigationHeader>공지사항</NavigationHeader>
      <List>
        {data?.map(({ noticeId, title }) => (
          <Link key={noticeId} to={`/menu/notice/${noticeId}`}>
            <List.Item>
              <List.Title>{title}</List.Title>
              <List.Icon />
            </List.Item>
          </Link>
        ))}
      </List>
    </div>
  );
}
