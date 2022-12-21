import { useParams } from 'react-router-dom';
import { tw } from '@/utils/tailwindMerge';
import { LoadingWithDelay, NavigationHeader, Error } from '@/components';
import { useNotice } from '@/pages/Main/hooks/useNotice';

type NoticeProps<T extends React.ElementType> = Component<T>;

export default function Notice({
  className,
  ...restProps
}: NoticeProps<'div'>) {
  const { id } = useParams();
  const { isError, isLoading, data } = useNotice();

  const notice = data?.find((d) => d.noticeId === id);

  if (isError)
    return (
      <div className={tw('', className)} {...restProps}>
        <NavigationHeader>{notice?.title}</NavigationHeader>
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
      </div>
    );

  return (
    <div className={tw('', className)} {...restProps}>
      <NavigationHeader>{notice?.title}</NavigationHeader>
      {isLoading ? (
        <LoadingWithDelay />
      ) : (
        <div>
          <div className="mt-8 mr-4 ml-4">{notice?.content}</div>
        </div>
      )}
    </div>
  );
}
