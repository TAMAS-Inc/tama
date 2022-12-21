import { Link } from 'react-router-dom';
import { tw } from '@/utils/tailwindMerge';
import { List, LoadingWithDelay, NavigationHeader, Error } from '@/components';
import { useNotice } from '@/pages/Main/hooks/useNotice';

type NoticeProps<T extends React.ElementType> = Component<T>;

export default function Notice({
  className,
  ...restProps
}: NoticeProps<'div'>) {
  const { isError, isLoading, data } = useNotice();

  if (isError)
    <div className={tw('', className)} {...restProps}>
      <Error>
        <Error.SVG />
        <Error.Text>
          현재 보고 계신 페이지를 이용할 수 없습니다.
          <br />
          재접속 후에도 화면이 나타나지 않는다면
          <br />
          아래 버튼을 눌러 알려주세요!
        </Error.Text>
        <Error.InduceLink path="/menu/inquiry">문의하러 가기</Error.InduceLink>
      </Error>
    </div>;

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
