import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { tw } from '@/utils/tailwindMerge';
import { Header, DropdownModal } from '@/components';
import { MainMenu } from '../MainMenu';
import { currentStationState } from '@/state/atom';

type MainHeaderProps<T extends React.ElementType> = Component<T>;

export function MainHeader({
  children,
  className,
  ...restProps
}: MainHeaderProps<'div'>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const currentStation = useRecoilValue(currentStationState);

  const handleDropdownClick: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsDropdownOpen(true);
  };

  const handleMenuClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsMenuOpen(true);
  };

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [currentStation]);

  return (
    <Header className={tw('pt-4', className)} {...restProps}>
      <Header.Dropdown onClick={handleDropdownClick}>
        {currentStation?.currentStation ?? children}
      </Header.Dropdown>
      {isDropdownOpen && <DropdownModal handleClick={setIsDropdownOpen} />}
      <Header.Menu onClick={handleMenuClick} />
      {isMenuOpen && <MainMenu handleClick={setIsMenuOpen} />}
    </Header>
  );
}
