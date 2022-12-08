import { tw } from '@/utils/tailwindMerge';
import { Header } from '@/components/Header';

type MainHeaderProps<T extends React.ElementType> = Component<T>;

export function MainHeader({
  children,
  className,
  ...restProps
}: MainHeaderProps<'div'>) {
  return (
    <Header className={tw('pt-8', className)} {...restProps}>
      <Header.Dropdown>{children}</Header.Dropdown>
      <Header.Predict />
      <Header.Menu />
    </Header>
  );
}
