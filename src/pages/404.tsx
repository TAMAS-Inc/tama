import { tw } from '@/utils/tailwindMerge';
import { Error } from '@/components';

type NotFoundProps<T extends React.ElementType> = Component<T>;

export default function NotFound({ className }: NotFoundProps<'div'>) {
  return (
    <div className={tw('relative mx-4 pt-20', className)}>
      <Error>
        <Error.SVG />
        <Error.Text>
          찾으시는 페이지가 없네요!
          <br />
          아래 버튼을 눌러
          <br />
          타까마까의 서비스를 이용해보세요!
        </Error.Text>
        <Error.InduceLink path="/main">타까마까 홈으로 가기</Error.InduceLink>
      </Error>
    </div>
  );
}
