import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { tw } from '@/utils/tailwindMerge';
import { Icon } from '@/components/Icon';

type ListProps<T extends React.ElementType> = {
  subtitle?: string;
} & Component<T>;

export function List({ children, className, ...restProps }: ListProps<'div'>) {
  return (
    <div className={tw('h-full w-full', className)} {...restProps}>
      {children}
    </div>
  );
}

type ItemProps<T extends React.ElementType> = Component<T>;

function Item({ children, className, ...restProps }: ItemProps<'button'>) {
  return (
    <button
      type="button"
      className={tw(
        'relative flex h-20 w-full flex-col justify-center border-b border-Gray-100 bg-White pl-10 text-Black',
        className
      )}
      {...restProps}
    >
      {children}
    </button>
  );
}

type TitleProps<T extends React.ElementType> = Component<T>;

function Title({ children, className, ...restProps }: TitleProps<'p'>) {
  return (
    <p className={tw('text-body2', className)} {...restProps}>
      {children}
    </p>
  );
}

type SubtitleProps<T extends React.ElementType> = Component<T>;

function Subtitle({ children, className, ...restProps }: SubtitleProps<'p'>) {
  return (
    <p
      className={tw('text-body3 font-bold text-Gray-400', className)}
      {...restProps}
    >
      {children}
    </p>
  );
}

type LIconProps<T extends React.ElementType> = Component<T>;

function LIcon({ className }: LIconProps<'div'>) {
  return (
    <Icon
      icon={ChevronRightIcon}
      className={tw('absolute right-6 h-6 w-6 fill-Gray-400', className)}
    />
  );
}

List.Item = Item;
List.Title = Title;
List.Subtitle = Subtitle;
List.Icon = LIcon;
