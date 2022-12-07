import { tw } from '@/utils/tailwindMerge';
import { TextButton } from '../TextButton/TextButton';

type ModalProps<T extends React.ElementType> = Component<T>;

export function Modal({
  children,
  className,
  ...restProps
}: ModalProps<'div'>) {
  return (
    <div className={tw('', className)} {...restProps}>
      {children}
    </div>
  );
}

type ButtonsProps<T extends React.ElementType> = Component<T>;

function Buttons({ children, className, ...restProps }: ButtonsProps<'div'>) {
  return (
    <div className={tw('', className)} {...restProps}>
      {children}
    </div>
  );
}

type ContentProps<T extends React.ElementType> = Component<T>;

function Content({ children, className, ...restProps }: ContentProps<'div'>) {
  return (
    <div className={tw('', className)} {...restProps}>
      {children}
    </div>
  );
}

Modal.Content = Content;
Modal.Buttons = Buttons;
Modal.TextButton = TextButton;
