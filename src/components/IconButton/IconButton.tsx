import { tw } from '@/utils/tailwindMerge';
import { Icon } from '@/components/Icon';

type IconButtonProps<T extends React.ElementType> = Component<T>;

export function IconButton({
  children,
  className,
  ...restProps
}: IconButtonProps<'button'>) {
  return (
    <button
      type="button"
      className={tw('flex h-5 w-5 items-center justify-center', className)}
      {...restProps}
    >
      {children}
    </button>
  );
}

IconButton.Icon = Icon;
