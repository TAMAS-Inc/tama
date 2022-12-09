import { tw } from '@/utils/tailwindMerge';
import { ToastContainer } from '../ToastContainer';

type NotificationProps<T extends React.ElementType> = Component<T>;

export function Notification({
  children,
  className,
  ...restProps
}: NotificationProps<'div'>) {
  return (
    <ToastContainer
      className={tw('h-9 pl-4 pr-4 font-bold', className)}
      {...restProps}
    >
      <ToastContainer.Toast className="pl-2">
        🎉 타까마까가 출시되었습니다!
      </ToastContainer.Toast>
      <ToastContainer.CloseButton />
    </ToastContainer>
  );
}
