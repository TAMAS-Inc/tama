import { useParams } from 'react-router-dom';
import { tw } from '@/utils/tailwindMerge';
import { NavigationHeader, Error } from '@/components';
import { useNotice } from '@/pages/Main/hooks/useNotice';
import NotFound from '@/pages/404';

type NoticeProps<T extends React.ElementType> = Component<T>;

export default function Notice({
  className,
  ...restProps
}: NoticeProps<'div'>) {
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isError, isLoading, data } = useNotice();

  const notice = data?.find((d) => d.noticeId === id);

  if (isError) return <NotFound />;

  return (
    <div className={tw('', className)} {...restProps}>
      <NavigationHeader>{notice?.title}</NavigationHeader>
      {isError ? (
        <Error>
          <Error.SVG />
          <Error.Text>
            현재 보고 계신 페이지를 이용할 수 없습니다.
            <br />
            재접속 후에도 화면이 나타나지 않는다면
            <br />
            아래 버튼을 눌러 알려주세요!
          </Error.Text>
          <Error.InduceLink path="/menu/inquiry">
            문의하러 가기
          </Error.InduceLink>
        </Error>
      ) : (
        <div className="mt-8 mr-4 ml-4">{notice?.content}</div>
      )}
    </div>
  );
}
