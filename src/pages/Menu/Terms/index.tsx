import { tw } from '@/utils/tailwindMerge';
import { NavigationHeader } from '@/components';

type TermsProps<T extends React.ElementType> = Component<T>;

export default function Terms({ className, ...restProps }: TermsProps<'div'>) {
  return (
    <div className={tw('pt-8', className)} {...restProps}>
      <NavigationHeader>이용약관</NavigationHeader>
    </div>
  );
}
