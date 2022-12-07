import { twMerge as tw } from 'tailwind-merge';

type IconButtonProps<T extends React.ElementType> = Component<T>;

export function IconButton({
  children,
  className,
  ...restProps
}: IconButtonProps<'div'>) {
  return (
    <div
      className={tw('flex items-center justify-center ', className)}
      {...restProps}
    >
      {children}
    </div>
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

IconButton.IconContainer = IconContainer;
