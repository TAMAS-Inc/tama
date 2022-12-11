import {
  InformationCircleIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { tw } from '@/utils/tailwindMerge';
import { Icon } from '@/components/Icon';
import { ToggleIconButton } from '../ToggleIconButton';

type BusListProps<T extends React.ElementType> = {
  busNumber: string | number;
  isChecked: boolean;
} & Component<T>;

export function BusList({
  children,
  className,
  ...restProps
}: BusListProps<'div'>) {
  return (
    <div className={tw('w-full', className)} {...restProps}>
      {children}
    </div>
  );
}

type ItemProps<T extends React.ElementType> = Component<T>;

function Item({ children, className, ...restProps }: ItemProps<'div'>) {
  return (
    <div
      className={tw(
        'relative flex h-16 items-center border-b border-Gray-100 px-4',
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  );
}

type BusNumberProps<T extends React.ElementType> = Component<T>;

function BusNumber({ children, className, ...restProps }: BusNumberProps<'p'>) {
  return (
    <p
      className={tw('pl-2 text-body1 text-Primary-700', className)}
      {...restProps}
    >
      {children}
    </p>
  );
}

type InfoProps<T extends React.ElementType> = Component<T>;

function Info({ children, className, ...restProps }: InfoProps<'div'>) {
  return (
    <div
      className={tw(
        'absolute left-1/2 flex -translate-x-1/2 flex-col',
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  );
}

type InfoContentProps<T extends React.ElementType> = Component<T>;

function InfoContent({
  children,
  className,
  ...restProps
}: InfoContentProps<'p'>) {
  return (
    <p className={tw('text-body3', className)} {...restProps}>
      {children}
    </p>
  );
}

BusList.InfoContent = InfoContent;

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

BusList.Item = Item;
BusList.BusNumber = BusNumber;
BusList.Info = Info;
BusList.InfoIcon = InfoIcon;
BusList.CheckIcon = CheckIcon;
