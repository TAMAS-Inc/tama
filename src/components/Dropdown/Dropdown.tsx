import { twMerge as tw } from 'tailwind-merge';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { useContext, useMemo, createContext } from 'react';
import { ToggleIconButton } from '../ToggleIconButton';

interface DropdownContextValue {
  isOpen: boolean | undefined;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

const useDropdownContext = () => {
  const ctx = useContext(DropdownContext);

  if (!ctx) {
    throw new Error('Test 컴포넌트 안에서만 쓰여야합니다!');
  }

  return ctx;
};

type DropdownProps<T extends React.ElementType> = {
  isOpen?: boolean;
} & Component<T>;

export function Dropdown({
  children,
  className,
  isOpen,
  ...restProps
}: DropdownProps<'div'>) {
  const ctxValue = useMemo(
    (): DropdownContextValue => ({
      isOpen,
    }),
    [isOpen]
  );

  return (
    <DropdownContext.Provider value={ctxValue}>
      <div
        className={tw(
          'flex w-[120px] cursor-pointer items-center justify-between border-b-[1px] border-b-Gray-100',
          className
        )}
        {...restProps}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

type ButtonProps<T extends React.ElementType> = Component<T>;

function Button({ children, className, ...restProps }: ButtonProps<'button'>) {
  const { isOpen } = useDropdownContext();

  return (
    <ToggleIconButton
      checked={isOpen}
      className={tw('h-4 w-4', className)}
      {...restProps}
    >
      <ToggleIconButton.Icon
        className="stroke-Gray-300"
        icon={isOpen ? ChevronUpIcon : ChevronDownIcon}
      />
    </ToggleIconButton>
  );
}

Dropdown.Button = Button;

type ContentProps<T extends React.ElementType> = Component<T>;

function Content({ children, className, ...restProps }: ContentProps<'p'>) {
  return (
    <p className={tw('text-Body1 font-bold', className)} {...restProps}>
      {children}
    </p>
  );
}

Dropdown.Content = Content;
