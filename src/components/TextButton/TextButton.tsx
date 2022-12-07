import { twMerge as tw } from 'tailwind-merge';

type TextButtonProps<T extends React.ElementType> = {} & Component<T>;

export function TextButton({
  children,
  className,
  ...restProps
}: TextButtonProps<'button'>) {
  return (
    <button
      type="button"
      className={tw('text-Body3 px-3 h-6 bg-Gray-100 rounded', className)}
      {...restProps}
    >
      {children}
    </button>
  );
}
