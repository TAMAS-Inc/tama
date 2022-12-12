import { tw } from '@/utils/tailwindMerge';
import { Toast } from '../Toast';
import { useCookie } from '@/hooks/useCookie';

type NotificationProps<T extends React.ElementType> = Component<T>;

export function Notification({
  children,
  className,
  ...restProps
}: NotificationProps<'div'>) {
  const [isClosed, setIsClosed] = useCookie('isNotificationClosed', false);

  return isClosed ? null : (
    <Toast className={tw('h-9 pl-4 pr-4 font-bold', className)} {...restProps}>
      <Toast.Content className="pl-2">
        🎉 타까마까가 출시되었습니다!
      </Toast.Content>
      <Toast.CloseButton
        onClick={() => {
          setIsClosed(true, 1);
        }}
      />
    </Toast>
  );
}
