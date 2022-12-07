import { twMerge as tw } from 'tailwind-merge';

type ToggleIconButtonProps<T extends React.ElementType> = {
  checked?: boolean;
} & Component<T>;

export function ToggleIconButton({
  children,
  className,
  checked,
  ...restProps
}: ToggleIconButtonProps<'button'>) {
  return (
    <button
      type="button"
      className={tw(
        'flex h-7 w-7 items-center justify-center',
        className
      )}
      {...restProps}
    >
      {children}
    </button>
  );
}

type IconProps<T extends React.ElementType> = {
  icon: (
    props: React.ComponentProps<'svg'> & {
      title?: string;
      titleId?: string;
    }
  ) => JSX.Element;
} & Component<T>;

function IconContainer({
  children,
  className,
  icon: Icon,
  ...restProps
}: IconProps<'svg'>) {
  return <Icon className={tw('', className)} {...restProps} />;
}

ToggleIconButton.Icon = IconContainer;
