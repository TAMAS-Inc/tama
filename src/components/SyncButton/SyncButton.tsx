import { useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { tw } from '@/utils/tailwindMerge';
import { IconButton } from '@/components';

type SyncButtonProps<T extends React.ElementType> = Component<T>;

export function SyncButton({
  children,
  className,
  onClick: handleClick,
  ...restProps
}: SyncButtonProps<'button'>) {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 1000);
    if (handleClick) handleClick(e);
  };

  return (
    <IconButton
      className={tw(
        'fixed bottom-16 right-4 mb-3 h-12 w-12 rounded-full bg-Primary-600',
        className
      )}
      onClick={handleSyncClick}
      {...restProps}
    >
      <IconButton.Icon
        icon={ArrowPathIcon}
        className={tw(
          isSyncing ? 'animate-spin' : '',
          'h-6 w-6 stroke-Primary-100'
        )}
      />
    </IconButton>
  );
}
