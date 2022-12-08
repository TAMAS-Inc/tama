import { tw } from '@/utils/tailwindMerge';

type BusPredictTableHeadProps<T extends React.ElementType> = Component<T>;

export function BusPredictTableHead({
  children,
  className,
  ...restProps
}: BusPredictTableHeadProps<'div'>) {
  return (
    <div
      className={tw('flex h-6 justify-evenly px-4', className)}
      {...restProps}
    >
      {children}
    </div>
  );
}

type TimeProps<T extends React.ElementType> = Component<T>;

function Time({ children, className, ...restProps }: TimeProps<'p'>) {
  return (
    <p
      className={tw(
        'flex w-80 items-center justify-center text-center text-body3',
        className
      )}
      {...restProps}
    >
      {children}
    </p>
  );
}

type SeatProps<T extends React.ElementType> = Component<T>;

function Seat({ children, className, ...restProps }: SeatProps<'p'>) {
  return (
    <p
      className={tw(
        'flex w-80 items-center justify-center text-center text-body3',
        className
      )}
      {...restProps}
    >
      {children}
    </p>
  );
}

type BusNumberProps<T extends React.ElementType> = Component<T>;

function BusNumber({ children, className, ...restProps }: BusNumberProps<'p'>) {
  return (
    <p
      className={tw(
        'flex w-80 items-center justify-center text-center text-body3',
        className
      )}
      {...restProps}
    >
      {children}
    </p>
  );
}

type AnalysisProps<T extends React.ElementType> = Component<T>;

function Analysis({ children, className, ...restProps }: AnalysisProps<'p'>) {
  return (
    <p
      className={tw(
        'flex w-80 items-center justify-center text-center text-body3',
        className
      )}
      {...restProps}
    >
      {children}
    </p>
  );
}

BusPredictTableHead.Analysis = Analysis;
BusPredictTableHead.BusNumber = BusNumber;
BusPredictTableHead.Seat = Seat;
BusPredictTableHead.Time = Time;
