import { tw } from '@/utils/tailwindMerge';
import { ToastContainer } from '../ToastContainer';

type ADProps<T extends React.ElementType> = Component<T>;

export function AD({ children, className, ...restProps }: ADProps<'div'>) {
  return (
    <ToastContainer
      className={tw('fixed bottom-0 right-0 h-16 w-full', className)}
      {...restProps}
    >
      <ToastContainer.Toast className="pl-2">
        광고 문의 주세용
      </ToastContainer.Toast>
      <ToastContainer.CloseButton />
    </ToastContainer>
  );
}
