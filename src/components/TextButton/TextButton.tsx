import { tw } from '@/utils/tailwindMerge';

type TextButtonProps<T extends React.ElementType> = Component<T>;

export function TextButton({
  children,
  className,
  ...restProps
}: TextButtonProps<'button'>) {
  return (
    <button
      type="button"
      className={tw('h-6 rounded bg-Gray-100 px-3 text-body3', className)}
      {...restProps}
    >
      {children}
    </button>
  );
}
