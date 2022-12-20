import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { DropdownModal, Header } from '@/components';
import { currentComIdState, currentCommuteState } from '@/state/atom';
import { tw } from '@/utils/tailwindMerge';
import { MainMenu } from '../MainMenu';

type MainHeaderProps<T extends React.ElementType> = Component<T>;

export function MainHeader({
  children,
  className,
  ...restProps
}: MainHeaderProps<'div'>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentComId = useRecoilValue(currentComIdState);
  const currentCommute = useRecoilValue(currentCommuteState);

  const handleDropdownClick: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsDropdownOpen(true);
  };

  const handleMenuClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsMenuOpen(true);
  };

  const handleDropdownDimBgClick: React.MouseEventHandler<HTMLDivElement> = (
    e
  ) => {
    if (e.target === e.currentTarget) setIsDropdownOpen(false);
  };

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [currentComId]);

  return (
    <Header className={tw('overflow-hidden', className)} {...restProps}>
      <Header.Dropdown onClick={handleDropdownClick}>
        {children ?? currentCommute.comName}
      </Header.Dropdown>
      <DropdownModal
        isModalOpen={isDropdownOpen}
        onDimBgClick={handleDropdownDimBgClick}
      />
      <Header.Menu onClick={handleMenuClick} />
      <MainMenu
        isModalOpen={isMenuOpen}
        onDimBgClick={() => setIsMenuOpen(false)}
        onCloseButtonClick={() => setIsMenuOpen(false)}
      />
    </Header>
  );
}
