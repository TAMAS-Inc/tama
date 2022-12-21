import { useState, useEffect } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { tw } from '@/utils/tailwindMerge';
import { IconButton } from '@/components';

type SyncButtonProps<T extends React.ElementType> = {
  onClick: () => void;
} & Component<T>;

export function SyncButton({
  children,
  className,
  onClick: handleClick,
  ...restProps
}: SyncButtonProps<'button'>) {
  const INTERVAL_TIME = 15;

  const [fetchTime, setFetchTime] = useState(INTERVAL_TIME);

  useEffect(() => {
    const timeId = setInterval(() => {
      setFetchTime((time) => {
        if (time === 0) {
          handleClick();
          return INTERVAL_TIME;
        }
        return time - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timeId);
    };
  }, [fetchTime, handleClick]);

  const handleSyncClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setFetchTime(INTERVAL_TIME);
    if (handleClick) handleClick();
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
          fetchTime === INTERVAL_TIME ? 'animate-spin' : '',
          'absolute h-12 w-12 stroke-White stroke-1'
        )}
      />
      {fetchTime}
    </IconButton>
  );
}
