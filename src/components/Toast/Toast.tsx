import { XMarkIcon } from '@heroicons/react/24/outline';
import { tw } from '@/utils/tailwindMerge';
import { IconButton } from '../IconButton';

type ToastProps<T extends React.ElementType> = Component<T>;

export function Toast({
  children,
  className,
  ...restProps
}: ToastProps<'div'>) {
  return (
    <div
      className={tw(
        'relative flex items-center bg-Primary-500 text-body3',
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  );
}

type ContentProps<T extends React.ElementType> = Component<T>;

function Content({ children, className, ...restProps }: ContentProps<'div'>) {
  return (
    <div className={tw('text-White', className)} {...restProps}>
      {children}
    </div>
  );
}

type CloseButtonProps<T extends React.ElementType> = Component<T>;

function CloseButton({
  children,
  className,
  ...restProps
}: CloseButtonProps<'button'>) {
  return (
    <IconButton
      className={tw('absolute right-0 mr-2.5', className)}
      {...restProps}
    >
      <IconButton.Icon icon={XMarkIcon} className="h-4 w-4 stroke-White" />
    </IconButton>
  );
}

Toast.Content = Content;
Toast.CloseButton = CloseButton;
