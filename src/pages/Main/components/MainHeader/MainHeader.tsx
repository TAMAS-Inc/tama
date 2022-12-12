import { useState } from 'react';
import { tw } from '@/utils/tailwindMerge';
import { Header } from '@/components/Header';
import { MainMenu } from '../MainMenu';
import { MainDropdown } from '../MainDropdown';

type MainHeaderProps<T extends React.ElementType> = Component<T>;

export function MainHeader({
  children,
  className,
  ...restProps
}: MainHeaderProps<'div'>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <Header className={tw('pt-8', className)} {...restProps}>
      <Header.Dropdown onClick={() => setIsDropdownOpen(true)}>
        {children}
      </Header.Dropdown>
      {isDropdownOpen ? (
        <MainDropdown handleDropdown={setIsDropdownOpen} />
      ) : (
        ''
      )}
      <Header.Predict />
      <Header.Menu onClick={() => setIsMenuOpen(true)} />
      {isMenuOpen ? <MainMenu handleMenu={setIsMenuOpen} /> : ''}
    </Header>
  );
}
