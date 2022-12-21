import { Bars3Icon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { ComponentProps } from 'react';
import { tw } from '@/utils/tailwindMerge';
import { Dropdown } from '../Dropdown';
import { IconButton } from '../IconButton';

type HeaderProps<T extends React.ElementType> = Component<T>;

export function Header({
  children,
  className,
  ...restProps
}: HeaderProps<'header'>) {
  return (
    <header
      className={tw(
        'fixed top-0 z-10 flex h-16 w-full items-center border-b-2 border-Gray-100 bg-White pl-4 pr-4',
        className
      )}
      {...restProps}
    >
      {children}
    </header>
  );
}

type BackButtonProps<T extends React.ElementType> = Component<T>;

function BackButton({
  children,
  className,
  ...restProps
}: BackButtonProps<'button'>) {
  const navigate = useNavigate();
  return (
    <IconButton
      className={tw('mr-3 h-6 w-6', className)}
      onClick={() => navigate(-1)}
      {...restProps}
    >
      <IconButton.Icon icon={ChevronLeftIcon} />
    </IconButton>
  );
}

type TitleProps<T extends React.ElementType> = Component<T>;

function Title({ children, className, ...restProps }: TitleProps<'div'>) {
  return (
    <div className={tw('text-body1 font-bold', className)} {...restProps}>
      {children}
    </div>
  );
}

type DropDownProps<T extends React.ElementType> = Component<T> &
  ComponentProps<typeof Dropdown>;

type MenuProps<T extends React.ElementType> = Component<T>;

function Menu({ children, className, ...restProps }: MenuProps<'button'>) {
  return (
    <IconButton
      className={tw('absolute right-7 h-6 w-6', className)}
      {...restProps}
    >
      <IconButton.Icon
        icon={Bars3Icon}
        className={tw('h-6 w-6 stroke-Black')}
      />
    </IconButton>
  );
}

function HDropdown({
  children,
  className,
  ...restProps
}: DropDownProps<'div'>) {
  return (
    <Dropdown className={tw('border-none', className)} {...restProps}>
      <Dropdown.Content className={tw('text-body1', className)} {...restProps}>
        {children}
      </Dropdown.Content>
      <Dropdown.Button />
    </Dropdown>
  );
}

Header.BackButton = BackButton;
Header.Title = Title;
Header.Dropdown = HDropdown;
Header.Menu = Menu;
