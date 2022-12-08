import { useMemo, createContext } from 'react';
import { tw } from '@/utils/tailwindMerge';
import { TextButton } from '../TextButton/TextButton';
import { DimBackground } from '../DimBackground/DimBackground';

interface ModalContextValue {
  isOpened: boolean | undefined;
}

const ModalContext = createContext<ModalContextValue | null>(null);

type ModalProps<T extends React.ElementType> = {
  isOpened?: boolean;
} & Component<T>;

export function Modal({
  children,
  className,
  isOpened,
  ...restProps
}: ModalProps<'div'>) {
  const ctxValue = useMemo((): ModalContextValue => ({ isOpened }), [isOpened]);

  return (
    <ModalContext.Provider value={ctxValue}>
      <div
        className={tw(
          'relative h-[844px] w-[390px]',
          !isOpened && 'hidden',
          className
        )}
        {...restProps}
      >
        {children}
      </div>
    </ModalContext.Provider>
  );
}

type ModlaContainerProps<T extends React.ElementType> = Component<T>;

function ModlaContainer({
  children,
  className,
  ...restProps
}: ModlaContainerProps<'div'>) {
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

Modal.ModalContainer = ModlaContainer;

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

type ButtonsProps<T extends React.ElementType> = Component<T>;

function Buttons({ children, className, ...restProps }: ButtonsProps<'div'>) {
  return (
    <div
      className={tw('w-[278px] text-body3 font-bold', className)}
      {...restProps}
    >
      {children}
    </div>
  );
}

Modal.DimBackground = DimBackground;
Modal.Content = Content;
Modal.Buttons = Buttons;
Modal.TextButton = TextButton;
