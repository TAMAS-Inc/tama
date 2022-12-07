import { createContext, useMemo } from 'react';
import { tw } from '@/utils/tailwindMerge';

interface StatusButtonContextValue {
  disabled: boolean | undefined;
}

const StatusButtonContext = createContext<StatusButtonContextValue | null>(
  null
);

type StatusButtonProps<T extends React.ElementType> = {
  disabled?: boolean;
} & Component<T>;

export function StatusButton({
  children,
  className,
  disabled,
  ...restProps
}: StatusButtonProps<'button'>) {
  const ctxValue = useMemo(
    (): StatusButtonContextValue => ({ disabled }),
    [disabled]
  );

  return (
    <StatusButtonContext.Provider value={ctxValue}>
      <button
        type="button"
        className={tw(
          'relative h-16 w-[358px] rounded bg-Primary-300 text-body1 text-Black',
          className,
          disabled ? 'bg-Gray-300 text-White' : ''
        )}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>
    </StatusButtonContext.Provider>
  );
}

type IconProps<T extends React.ElementType> = {
  icon: (
    props: React.ComponentProps<'svg'> & {
      title?: string;
      titleId?: string;
    }
  ) => JSX.Element;
} & Component<T>;

function IconContainer({
  children,
  className,
  icon: Icon,
  ...restProps
}: IconProps<'svg'>) {
  return <Icon className={tw('', className)} {...restProps} />;
}

StatusButton.Icon = IconContainer;
