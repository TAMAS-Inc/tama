import { forwardRef, Ref } from 'react';
import { tw } from '@/utils/tailwindMerge';

type TextButtonProps<T extends React.ElementType> = Component<T>;

export const TextButton = forwardRef(
  (
    { children, className, ...restProps }: TextButtonProps<'button'>,
    ref?: Ref<HTMLButtonElement>
  ) => (
    <button
      ref={ref}
      type="button"
      className={tw('h-6 rounded bg-Gray-100 px-3 text-body3', className)}
      {...restProps}
    >
      {children}
    </button>
  )
);
