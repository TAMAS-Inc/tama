import { tw } from '@/utils/tailwindMerge';

type IconProps<T extends React.ElementType> = {
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
} & Component<T>;

export function Icon({
  children,
  className,
  icon: IconElement,
  ...restProps
}: IconProps<'svg'>) {
  return (
    <IconElement className={tw('h-6 w-6 stroke-2', className)} {...restProps} />
  );
}
