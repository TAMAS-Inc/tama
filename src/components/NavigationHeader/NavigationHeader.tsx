import { tw } from '@/utils/tailwindMerge';
import { Header } from '@/components/Header';

type NavigationHeaderProps<T extends React.ElementType> = Component<T>;

export function NavigationHeader({
  children,
  className,
  title,
  ...restProps
}: NavigationHeaderProps<'div'>) {
  return (
    <Header className={tw('pt-4', className)} {...restProps}>
      <Header.BackButton />
      <Header.Title>{children}</Header.Title>
    </Header>
  );
}
