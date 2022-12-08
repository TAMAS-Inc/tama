import { useMemo, createContext } from 'react';
import { tw } from '@/utils/tailwindMerge';

interface DimBackgroundContextValue {
  isOpened: boolean | undefined;
}

const DimBackgroundContext = createContext<DimBackgroundContextValue | null>(
  null
);

type DimBackgroundProps<T extends React.ElementType> = {
  isOpened?: boolean;
} & Component<T>;

export function DimBackground({
  children,
  className,
  isOpened,
  ...restProps
}: DimBackgroundProps<'div'>) {
  const ctxValue = useMemo(
    (): DimBackgroundContextValue => ({ isOpened }),
    [isOpened]
  );

  return (
    <DimBackgroundContext.Provider value={ctxValue}>
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
    </DimBackgroundContext.Provider>
  );
}
