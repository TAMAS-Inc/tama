import { XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { tw } from '@/utils/tailwindMerge';
import { IconButton, List } from '@/components';
import { BaseModal } from '../../../../components/BaseModal/BaseModal';

type MainMenuProps<T extends React.ElementType> = {
  isModalOpen: boolean;
  onDimBgClick: React.MouseEventHandler<HTMLDivElement>;
  onCloseButtonClick: React.MouseEventHandler<HTMLButtonElement>;
} & Component<T>;

export function MainMenu({
  children,
  className,
  isModalOpen,
  onDimBgClick: handleDimBgClick,
  onCloseButtonClick: handleCloseButtonClick,
  ...restProps
}: MainMenuProps<'div'>) {
  const data = {
    공지사항: 'notice',
    문의하기: 'inquiry',
    이용약관: 'terms',
    '오픈소스 이용': 'opensource',
  };
  return (
    <BaseModal className={tw('relative', className)} {...restProps}>
      <BaseModal.Content
        className={tw(
          'fixed top-0 right-0 z-50 h-full w-[300px]  bg-White transition duration-500 ease-in-out',
          isModalOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <List className="relative">
          <IconButton
            onClick={handleCloseButtonClick}
            className="absolute -top-4 right-4 z-10 h-10 w-10"
          >
            <IconButton.Icon icon={XMarkIcon} className="h-6 w-6" />
          </IconButton>
          <List.Item className="h-25 mt-9 pl-4 pb-6">
            <List.Title className="text-left font-bold">
              오늘도 산뜻한 출근길 되세요!
            </List.Title>
          </List.Item>
          {Object.entries(data).map(([content, path]) => (
            <Link key={content} to={`/menu/${path}`}>
              <List.Item className="h-14 pl-4">
                <List.Title>{content}</List.Title>
              </List.Item>
            </Link>
          ))}
        </List>
      </BaseModal.Content>
      <BaseModal.DimBg
        onClick={handleDimBgClick}
        className={tw(isModalOpen ? '' : 'hidden')}
      />
    </BaseModal>
  );
}
