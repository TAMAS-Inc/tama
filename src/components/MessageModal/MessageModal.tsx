import { tw } from '@/utils/tailwindMerge';
import { TextButton } from '../TextButton';

type ModalProps<T extends React.ElementType> = Component<T>;
type ButtonProps<T extends React.ElementType> = Component<T>;
type ContentProps<T extends React.ElementType> = Component<T>;
type DimBackgroundProps<T extends React.ElementType> = Component<T>;
type ModalContainerProps<T extends React.ElementType> = Component<T>;
type ButtonContainerProps<T extends React.ElementType> = Component<T>;

export function MessageModal({
  children,
  className,
  ...restProps
}: ModalProps<'div'>) {
  return (
    <div
      className={tw('fixed top-0 left-0 z-[100] h-screen w-screen', className)}
      aria-modal="true"
      {...restProps}
    >
      {children}
    </div>
  );
}

function ModalContainer({
  children,
  className,
  ...restProps
}: ModalContainerProps<'div'>) {
  return (
    <div
      className={tw(
        'absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded',
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  );
}

function Content({ children, className, ...restProps }: ContentProps<'div'>) {
  return (
    <div
      className={tw(
        'flex h-[120px] w-[278px] items-center justify-center rounded-tl rounded-tr bg-White text-center text-body2',
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  );
}

function ButtonContainer({
  children,
  className,
  ...restProps
}: ButtonContainerProps<'div'>) {
  return (
    <div
      className={tw(
        'flex h-12 w-[278px] justify-evenly border-t border-Gray-300',
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  );
}

function Button({ children, className, ...restProps }: ButtonProps<'button'>) {
  return (
    <MessageModal.TextButton
      className={tw('h-full w-full rounded-none text-body2 ', className)}
      {...restProps}
    >
      {children}
    </MessageModal.TextButton>
  );
}

function DimBackground({
  children,
  className,
  ...restProps
}: DimBackgroundProps<'div'>) {
  return (
    <div
      className={tw(
        'fixed left-0 top-0 h-full w-full bg-Gray-700 opacity-80',
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  );
}

MessageModal.ModalContainer = ModalContainer;
MessageModal.DimBackground = DimBackground;
MessageModal.Content = Content;
MessageModal.ButtonContainer = ButtonContainer;
MessageModal.TextButton = TextButton;
MessageModal.Button = Button;
