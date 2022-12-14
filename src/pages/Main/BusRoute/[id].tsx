import { tw } from '@/utils/tailwindMerge';
import { AD, NavigationHeader, Notification } from '@/components';

type BusRouteProps<T extends React.ElementType> = Component<T>;

export default function BusRoute({
  className,
  ...restProps
}: BusRouteProps<'div'>) {
  return (
    <div className={tw('', className)} {...restProps}>
      <NavigationHeader>5001번</NavigationHeader>
      <Notification />
      <AD />
    </div>
  );
}
