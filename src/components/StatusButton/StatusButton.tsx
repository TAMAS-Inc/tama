import { createContext, useMemo } from 'react';
import { tw } from '@/utils/tailwindMerge';
import { Icon } from '@/components/Icon';

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
          'h-16 w-full rounded bg-Primary-300 text-body1 text-Black',
          className,
          disabled && 'bg-Gray-300 text-White'
        )}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>
    </StatusButtonContext.Provider>
  );
}

StatusButton.Icon = Icon;
