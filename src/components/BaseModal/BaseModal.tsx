import { tw } from '@/utils/tailwindMerge';

type BaseModalProps<T extends React.ElementType> = {
  isOpened?: boolean;
} & Component<T>;

export function BaseModal({
  children,
  className,
  ...restProps
}: BaseModalProps<'div'>) {
  return (
    <div className={tw('fixed inset-0 z-50', className)} {...restProps}>
      {children}
    </div>
  );
}

type ContentProps<T extends React.ElementType> = Component<T>;

function Content({ children, className, ...restProps }: ContentProps<'div'>) {
  return (
    <div
      className={tw('absolute z-30  bg-Primary-300', className)}
      {...restProps}
    >
      {children}
    </div>
  );
}

BaseModal.Content = Content;

type DimBgProps<T extends React.ElementType> = Component<T>;

function DimBg({ children, className, ...restProps }: DimBgProps<'div'>) {
  return (
    <div
      className={tw('fixed inset-0 z-20  bg-Gray-700 opacity-80', className)}
      {...restProps}
    >
      {children}
    </div>
  );
}

BaseModal.DimBg = DimBg;
