import { tw } from '@/utils/tailwindMerge';

type InputItemProps<T extends React.ElementType> = Component<T>;

export function InputItem({
  children,
  className,
  ...restProps
}: InputItemProps<'input'>) {
  return <div className={tw('', className)} {...restProps} />;
}
