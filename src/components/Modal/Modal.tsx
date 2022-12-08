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
        'relative h-[844px] w-[390px]',
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
        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  );
}

Modal.ModalContainer = ModalContainer;

type ContentProps<T extends React.ElementType> = Component<T>;

function Content({ children, className, ...restProps }: ContentProps<'div'>) {
  return (
    <div
      className={tw(
        'flex h-[120px] w-[278px] items-center justify-center rounded-tl rounded-tr text-center text-body2',
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
      className={tw('w-[278px] text-body3 font-bold', className)}
      {...restProps}
    >
      {children}
    </div>
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
        '-z-10 h-full w-full bg-Gray-700',
        isOpened && 'hidden',
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  );
}

Modal.DimBackground = DimBackground;
Modal.Content = Content;
Modal.ButtonContainer = ButtonContainer;
Modal.TextButton = TextButton;
