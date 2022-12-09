import { tw } from '@/utils/tailwindMerge';
import { Icon } from '@/components/Icon';

type BusPredictCardProps<T extends React.ElementType> = Component<T>;

export function BusPredictCard({
  children,
  className,
  ...restProps
}: BusPredictCardProps<'div'>) {
  return (
    <div
      className={tw(
        'flex h-10 justify-evenly border-b border-Gray-100 px-4',
        className
      )}
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
        'flex w-20 items-center justify-center text-center text-body2',
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
        'flex w-20 items-center justify-center text-center text-body2',
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
        'flex w-20 items-center justify-center text-center text-body2',
        className
      )}
      {...restProps}
    >
      {children}
    </p>
  );
}

type AnalysisButtonProps<T extends React.ElementType> = Component<T>;

function AnalysisButton({
  children,
  className,
  ...restProps
}: AnalysisButtonProps<'button'>) {
  return (
    <button
      type="button"
      className={tw(
        'flex w-20 items-center justify-center text-center text-body2',
        className
      )}
      {...restProps}
    >
      {children}
    </button>
  );
}

BusPredictCard.AnalysisButton = AnalysisButton;
BusPredictCard.BusNumber = BusNumber;
BusPredictCard.Seat = Seat;
BusPredictCard.Time = Time;
BusPredictCard.Icon = Icon;
