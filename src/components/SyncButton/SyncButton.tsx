import _ from 'lodash';
import { useState, useEffect } from 'react';
import { ReactComponent as RotateRightIcon } from '@/assets/icons/rotate_right.svg';
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
  const [isSpinning, setIsSpinning] = useState(false);

  const spin = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
    }, 1000);
  };

  useEffect(() => {
    const timeId = setInterval(() => {
      setFetchTime((time) => {
        if (time < 1) {
          handleClick();
          spin();
          return INTERVAL_TIME + 1;
        }
        return time - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timeId);
    };
  }, [fetchTime, handleClick]);

  const handleSyncClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setFetchTime(INTERVAL_TIME + 1);
    spin();
    if (handleClick) handleClick();
  };

  return (
    <IconButton
      className={tw(
        'fixed bottom-5 right-4 mb-3 h-14 w-14 rounded-full bg-Gray-800  text-White',
        className
      )}
      onClick={_.throttle(handleSyncClick)}
      {...restProps}
    >
      <RotateRightIcon
        className={tw(
          // fetchTime === INTERVAL_TIME + 1 || fetchTime === 0
          isSpinning ? 'animate-spin' : 'animate-none',
          'color absolute h-8 w-8 stroke-White stroke-1'
        )}
      />
      {/* <IconButton.Icon icon={RotateRightIcon} /> */}
      <p className="pt-1 text-[12px] font-bold">
        {fetchTime < 1 || fetchTime === INTERVAL_TIME + 1 ? '' : fetchTime}
      </p>
    </IconButton>
  );
}
