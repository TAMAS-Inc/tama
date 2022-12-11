import { tw } from '@/utils/tailwindMerge';
import { NavigationHeader } from '@/components';

type NoticeProps<T extends React.ElementType> = Component<T>;

export default function Notice({
  className,
  ...restProps
}: NoticeProps<'div'>) {
  return (
    <div className={tw('pt-8', className)} {...restProps}>
      <NavigationHeader>공지사항</NavigationHeader>
    </div>
  );
}
