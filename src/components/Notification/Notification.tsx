import { Link } from 'react-router-dom';
import { tw } from '@/utils/tailwindMerge';
import { Toast } from '../Toast';
import { useCookie } from '@/hooks/useCookie';
import { useNotice } from '@/pages/Main/hooks/useNotice';

type NotificationProps<T extends React.ElementType> = Component<T>;

export function Notification({
  children,
  className,
  ...restProps
}: NotificationProps<'div'>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isError, isLoading, data } = useNotice();

  const [isClosed, setIsClosed] = useCookie('isNotificationClosed', false);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsClosed(true, 1);
  };
  if (isClosed) return null;

  return (
    <Toast
      className={tw('mb-2 h-9 pl-4 pr-4 font-bold', className)}
      {...restProps}
    >
      {isError ? (
        <Toast.Content className="pl-2">
          🦋 타까마까에 오신 것을 환영합니다!
        </Toast.Content>
      ) : (
        <Link to={`/menu/notice/${data && data[0].noticeId}`}>
          <Toast.Content className="pl-2">
            {data && data[0].title}
          </Toast.Content>
        </Link>
      )}
      <Toast.CloseButton onClick={handleClick} />
    </Toast>
  );
}
