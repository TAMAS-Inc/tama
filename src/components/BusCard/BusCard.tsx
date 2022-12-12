import {
  InformationCircleIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { tw } from '@/utils/tailwindMerge';
import { Icon } from '@/components/Icon';
import { ToggleIconButton } from '../ToggleIconButton';

type BusCardProps<T extends React.ElementType> = {
  routeName: string | number;
  stationName: string;
  direction: string;
  isChecked: boolean;
} & Component<T>;

export function BusCard({
  children,
  className,
  ...restProps
}: BusCardProps<'div'>) {
  return (
    <div
      className={tw(
        'relative flex h-16 items-center border-b border-Gray-100 pl-6',
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  );
}

type RouteNameProps<T extends React.ElementType> = Component<T>;

function RouteName({ children, className, ...restProps }: RouteNameProps<'p'>) {
  return (
    <p
      className={tw('pl-2 text-body1 text-Primary-700', className)}
      {...restProps}
    >
      {children}
    </p>
  );
}

type StationNameProps<T extends React.ElementType> = Component<T>;

function StationName({
  children,
  className,
  ...restProps
}: StationNameProps<'p'>) {
  return (
    <p className={tw('mb-1 text-body2', className)} {...restProps}>
      {children}
    </p>
  );
}

type InfoProps<T extends React.ElementType> = Component<T>;

function Info({ children, className, ...restProps }: InfoProps<'div'>) {
  return (
    <div
      className={tw(
        'absolute left-1/2 flex -translate-x-1/2 flex-col text-left',
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  );
}

type ContentProps<T extends React.ElementType> = Component<T>;

function Content({ children, className, ...restProps }: ContentProps<'p'>) {
  return (
    <p className={tw('text-body3', className)} {...restProps}>
      {children}
    </p>
  );
}

type InfoIconProps<T extends React.ElementType> = Component<T>;

function InfoIcon({ className }: InfoIconProps<'button'>) {
  return (
    <button
      type="button"
      className="absolute right-6 flex h-full items-center justify-center"
    >
      <Icon
        icon={InformationCircleIcon}
        className={tw('h-7 w-7 text-Primary-600', className)}
        stroke-width="2"
      />
    </button>
  );
}

type CheckIconProps<T extends React.ElementType> = {
  isChecked?: boolean;
} & Component<T>;

function CheckIcon({ className, isChecked }: CheckIconProps<'button'>) {
  return (
    <ToggleIconButton.Icon
      className={tw(
        'absolute right-6 flex h-full w-7 items-center justify-center',
        isChecked ? ' fill-Primary-700' : 'text-Gray-300',
        className
      )}
      icon={isChecked ? CheckCircleIcon : PlusCircleIcon}
    />
  );
}

BusCard.RouteName = RouteName;
BusCard.StationName = StationName;
BusCard.Info = Info;
BusCard.Content = Content;
BusCard.InfoIcon = InfoIcon;
BusCard.CheckIcon = CheckIcon;
