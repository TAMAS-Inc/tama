import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { tw } from '@/utils/tailwindMerge';
import { IconButton } from '@/components';

type SyncButtonProps<T extends React.ElementType> = Component<T>;

export function SyncButton({
  children,
  className,
  ...restProps
}: SyncButtonProps<'button'>) {
  return (
    <IconButton
      className={tw(
        'fixed bottom-16 right-4 mb-3 h-12 w-12 rounded-full bg-Primary-600',
        className
      )}
      {...restProps}
    >
      <IconButton.Icon
        icon={ArrowPathIcon}
        className="h-6 w-6 stroke-Primary-100"
      />
    </IconButton>
  );
}
