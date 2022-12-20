import { useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { tw } from '@/utils/tailwindMerge';
import { IconButton } from '@/components';

type SyncButtonProps<T extends React.ElementType> = Component<T>;

export function SyncButtonWithoutTime({
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
        'fixed bottom-16 right-4 mb-3 h-14 w-14 rounded-full bg-Gray-600 text-White',
        className
      )}
      onClick={handleSyncClick}
      {...restProps}
    >
      <IconButton.Icon
        icon={ArrowPathIcon}
        className={tw(
          isSyncing ? 'animate-spin' : '',
          'absolute h-12 w-12 stroke-White stroke-1'
        )}
      />
      {children}
    </IconButton>
  );
}
