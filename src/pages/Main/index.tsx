import { tw } from '@/utils/tailwindMerge';
import { MainHeader, AD, Notification, SyncButton } from '@/components';

type MainProps<T extends React.ElementType> = Component<T>;

export default function Main({ className, ...restProps }: MainProps<'div'>) {
  return (
    <div className={tw('pt-8', className)} {...restProps}>
      <MainHeader>춘시기넹</MainHeader>
      <Notification />
      <SyncButton />
      <AD />
    </div>
  );
}
