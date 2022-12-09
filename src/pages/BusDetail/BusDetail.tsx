import { tw } from '@/utils/tailwindMerge';
import { AD, NavigationHeader, Notification } from '@/components';

type BusDetailProps<T extends React.ElementType> = Component<T>;

export function BusDetail({ className, ...restProps }: BusDetailProps<'div'>) {
  return (
    <div className={tw('pt-8', className)} {...restProps}>
      <NavigationHeader>5001번</NavigationHeader>
      <Notification />
      <AD />
    </div>
  );
}
