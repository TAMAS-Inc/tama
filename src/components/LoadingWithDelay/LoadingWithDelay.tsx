import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { tw } from '@/utils/tailwindMerge';

type LoadingWithDelayProps<T extends React.ElementType> = {
  delay?: number;
} & Component<T>;

export function LoadingWithDelay({
  className,
  delay = 200,
  ...restProps
}: LoadingWithDelayProps<'div'>) {
  const [showLoadingIndicator, setLoadingIndicatorVisibility] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoadingIndicatorVisibility(true), delay);

    return () => {
      clearTimeout(timer);
    };
  });

  return showLoadingIndicator ? (
    <div className="mt-8 flex flex-col items-center text-Gray-400">
      <ClipLoader
        color="#ffd677"
        className={tw('mb-2', className)}
        {...restProps}
      />
      <div>Loading . . .</div>
    </div>
  ) : null;
}
