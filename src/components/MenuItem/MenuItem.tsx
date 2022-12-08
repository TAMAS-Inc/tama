import { tw } from '@/utils/tailwindMerge';

type MenuItemProps<T extends React.ElementType> = Component<T>;

export function MenuItem({
  children,
  className,
  ...restProps
}: MenuItemProps<'button'>) {
  return (
    <button
      type="button"
      className={tw(
        'flex h-14 w-64 flex-col justify-center border-b border-Gray-100 bg-White pl-4',
        className
      )}
      {...restProps}
    >
      {children}
    </button>
  );
}
