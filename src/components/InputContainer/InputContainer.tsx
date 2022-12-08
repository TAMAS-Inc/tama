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
import { tw } from '@/utils/tailwindMerge';
import { IconButton } from '@/components/IconButton';
import { Icon } from '@/components/Icon';

interface InputContainerContextValue {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}
type InputContainerProps<T extends React.ElementType> = Component<T>;
type InputProps<T extends React.ElementType> = Component<T>;

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

function ResetButton({
  icon,
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
      <IconButton.Icon icon={icon} />
    </IconButton>
  );
}

InputContainer.Input = Input;
InputContainer.ResetButton = ResetButton;
