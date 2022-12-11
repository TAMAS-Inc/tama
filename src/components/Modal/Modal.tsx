import { tw } from '@/utils/tailwindMerge';
import { TextButton } from '../TextButton';

type ModalProps<T extends React.ElementType> = {
  isOpened?: boolean;
} & Component<T>;

export function Modal({
  children,
  className,
  isOpened,
  ...restProps
}: ModalProps<'div'>) {
  return (
    <div
      className={tw(
        'fixed top-0 left-0 h-screen w-screen',
        !isOpened && 'hidden',
        className
      )}
      aria-modal="true"
      {...restProps}
    >
      {children}
    </div>
  );
}

type ModalContainerProps<T extends React.ElementType> = Component<T>;

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

type ContentProps<T extends React.ElementType> = Component<T>;

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

type ButtonContainerProps<T extends React.ElementType> = Component<T>;

function ButtonContainer({
  children,
  className,
  ...restProps
}: ButtonContainerProps<'div'>) {
  return (
    <div
      className={tw(
        'flex h-10 w-[278px] justify-evenly text-body3 font-bold',
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  );
}

type ButtonProps<T extends React.ElementType> = Component<T>;

function Button({ children, className, ...restProps }: ButtonProps<'button'>) {
  return (
    <Modal.TextButton
      className="h-full w-full rounded-none bg-Primary-300"
      {...restProps}
    >
      {children}
    </Modal.TextButton>
  );
}

type DimBackgroundProps<T extends React.ElementType> = {
  isOpened?: boolean;
} & Component<T>;

function DimBackground({
  children,
  className,
  isOpened,
  ...restProps
}: DimBackgroundProps<'div'>) {
  return (
    <div
      className={tw(
        '-z-10 h-full w-full bg-Gray-700 opacity-80',
        isOpened && 'hidden',
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  );
}

Modal.ModalContainer = ModalContainer;
Modal.DimBackground = DimBackground;
Modal.Content = Content;
Modal.ButtonContainer = ButtonContainer;
Modal.TextButton = TextButton;
Modal.Button = Button;
