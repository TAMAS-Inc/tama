import { tw } from '@/utils/tailwindMerge';
import { NavigationHeader } from '@/components';

type OpenSourceProps<T extends React.ElementType> = Component<T>;

export default function OpenSource({
  className,
  ...restProps
}: OpenSourceProps<'div'>) {
  return (
    <div className={tw('pt-8', className)} {...restProps}>
      <NavigationHeader>오픈소스 이용</NavigationHeader>
    </div>
  );
}
