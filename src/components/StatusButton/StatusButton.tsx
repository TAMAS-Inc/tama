import { tw } from '@/utils/tailwindMerge';
import { Icon } from '@/components/Icon';

type StatusButtonProps<T extends React.ElementType> = Component<T>;

export function StatusButton({
  children,
  className,
  disabled,
  ...restProps
}: StatusButtonProps<'button'>) {
  return (
    <button
      type="button"
      className={tw(
        'h-16 w-full rounded bg-Primary-300 text-body1 text-Black',
        disabled ? 'bg-Gray-300 text-White' : '',
        className
      )}
      {...restProps}
    >
      {children}
    </button>
  );
}

StatusButton.Icon = Icon;
