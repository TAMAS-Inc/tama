import { tw } from '@/utils/tailwindMerge';

type FormProps<T extends React.ElementType> = {} & Component<T>;

export function Form({ children, className, ...restProps }: FormProps<'form'>) {
  return (
    <form className={tw('', className)} {...restProps}>
      {children}
    </form>
  );
}
