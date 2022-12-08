import { tw } from '@/utils/tailwindMerge';
import { Icon } from '@/components/Icon';

type OpenSourceItemProps<T extends React.ElementType> = Component<T>;

export function OpenSourceItem({
  children,
  className,
  ...restProps
}: OpenSourceItemProps<'button'>) {
  return (
    <button
      type="button"
      className={tw(
        'relative flex h-14 w-[390px] flex-col justify-center border-b border-Gray-100 bg-White pl-10',
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

OpenSourceItem.Icon = Icon;
OpenSourceItem.Title = Title;
