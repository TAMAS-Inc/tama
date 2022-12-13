import { useCookie } from '@/hooks/useCookie';
import { tw } from '@/utils/tailwindMerge';
import { Toast } from '../Toast';

type ADProps<T extends React.ElementType> = Component<T>;

export function AD({ children, className, ...restProps }: ADProps<'div'>) {
  const [isClosed, setIsClosed] = useCookie('isADClosed', false);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsClosed(true, 0.2);
  };

  if (isClosed) return null;

  return (
    <Toast
      className={tw('fixed bottom-0 right-0 h-16 w-full', className)}
      {...restProps}
    >
      <Toast.Content className="pl-2">광고 문의 주세용</Toast.Content>
      <Toast.CloseButton onClick={handleClick} />
    </Toast>
  );
}
