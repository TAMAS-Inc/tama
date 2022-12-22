import { useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { ReactComponent as RotateRightIcon } from '@/assets/icons/rotate_right.svg';
import { tw } from '@/utils/tailwindMerge';
import { IconButton } from '@/components';

type SyncButtonProps<T extends React.ElementType> = Component<T>;

export function SyncButtonWithoutTime({
  children,
  className,
  onClick: handleClick,
  ...restProps
}: SyncButtonProps<'button'>) {
  const [isSpinning, setIsSpinning] = useState(false);
  const spin = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
    }, 1000);
  };
  const handleSyncClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    spin();
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
      <RotateRightIcon
        className={tw(
          // fetchTime === INTERVAL_TIME + 1 || fetchTime === 0
          isSpinning ? 'animate-spin' : 'animate-none',
          'color absolute h-8 w-8 stroke-White stroke-1'
        )}
      />
    </IconButton>
  );
}
