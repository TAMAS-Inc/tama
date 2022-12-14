import { tw } from '@/utils/tailwindMerge';
import { Icon } from '../Icon';

type ToggleIconButtonProps<T extends React.ElementType> = {
  checked?: boolean
} & Component<T>;

export function ToggleIconButton({
  children,
  className,
  ...restProps
}: ToggleIconButtonProps<'button'>) {
  return (
    <button
      type="button"
      className={tw('flex h-7 w-7 items-center justify-center', className)}
      {...restProps}
    >
      {children}
    </button>
  );
}

ToggleIconButton.Icon = Icon;
