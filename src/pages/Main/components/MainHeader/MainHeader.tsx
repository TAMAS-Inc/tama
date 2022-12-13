import { useState, useEffect } from 'react';
import { tw } from '@/utils/tailwindMerge';
import { Header, DropdownModal } from '@/components';
import { MainMenu } from '../MainMenu';

type MainHeaderProps<T extends React.ElementType> = Component<T>;

export function MainHeader({
  children,
  className,
  ...restProps
}: MainHeaderProps<'div'>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [current, setCurrent] = useState('춘시기네');

  const handleDropdown: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsDropdownOpen(true);
  };

  const handleMenu: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsMenuOpen(true);
  };

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [current]);

  return (
    <Header className={tw('pt-8', className)} {...restProps}>
      <Header.Dropdown onClick={handleDropdown}>{current}</Header.Dropdown>
      {isDropdownOpen && (
        <DropdownModal
          handleCurrent={setCurrent}
          handleDropdown={setIsDropdownOpen}
        />
      )}
      <Header.Predict />
      <Header.Menu onClick={handleMenu} />
      {isMenuOpen && <MainMenu handleMenu={setIsMenuOpen} />}
    </Header>
  );
}
