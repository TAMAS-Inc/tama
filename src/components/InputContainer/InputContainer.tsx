/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  useContext,
  useMemo,
  createContext,
  useState,
  useEffect,
  useRef,
  ChangeEventHandler,
  ComponentProps,
} from 'react';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { tw } from '@/utils/tailwindMerge';
import { IconButton } from '@/components/IconButton';
import { Icon } from '@/components/Icon';

interface InputContainerContextValue {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}
type InputContainerProps<T extends React.ElementType> = Component<T>;
type InputProps<T extends React.ElementType> = Component<T>;
type LabelProps<T extends React.ElementType> = Component<T>;

const InputContainerContext = createContext<InputContainerContextValue | null>(
  null
);

const useInputContainerContext = () => {
  const ctx = useContext(InputContainerContext);

  if (!ctx) {
    throw new Error('InputContainer 컴포넌트 안에서만 쓰여야합니다!');
  }

  return ctx;
};

export function InputContainer({
  children,
  className,
  ...restProps
}: InputContainerProps<'div'>) {
  const [inputValue, setInputValue] = useState('');
  const ctxValue = useMemo(
    (): InputContainerContextValue => ({ inputValue, setInputValue }),
    [inputValue]
  );

  return (
    <InputContainerContext.Provider value={ctxValue}>
      <div
        className={tw('h-[32px] w-[322px] rounded-lg', className)}
        {...restProps}
      >
        {children}
      </div>
    </InputContainerContext.Provider>
  );
}

function Input({ className, ...restProps }: InputProps<'input'>) {
  const { inputValue, setInputValue } = useInputContainerContext();
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputValue === '') {
      const $input = inputRef.current as unknown as HTMLInputElement;
      $input.value = '';
    }
  }, [inputValue]);

  const handleChange: ChangeEventHandler = (e) => {
    const $input = e.target as HTMLInputElement;
    setInputValue($input.value);
  };

  return (
    <input
      ref={inputRef}
      className={tw('h-full w-full rounded-lg pl-3 outline-none', className)}
      onChange={handleChange}
      {...restProps}
    />
  );
}

function Label({ children, className, ...restProps }: LabelProps<'label'>) {
  return (
    <label
      className={tw('flex h-full w-full items-center', className)}
      {...restProps}
    >
      {children}
    </label>
  );
}

function ResetButton({
  // icon,
  className,
  ...restProps
}: ComponentProps<typeof Icon> & ComponentProps<typeof IconButton>) {
  const { inputValue, setInputValue } = useInputContainerContext();

  const handleClick = () => {
    if (!inputValue) return;
    setInputValue('');
  };

  if (inputValue === '') return null;

  return (
    <IconButton onClick={handleClick} {...restProps}>
      <IconButton.Icon
        className={tw('absolute top-1 right-3 h-6 w-6', className)}
        icon={XCircleIcon}
      />
    </IconButton>
  );
}

InputContainer.Label = Label;
InputContainer.ResetButton = ResetButton;
Label.Input = Input;
