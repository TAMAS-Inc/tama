import {
  useContext,
  useMemo,
  createContext,
  useState,
  useEffect,
  useRef,
  ChangeEventHandler,
} from 'react';
import { tw } from '@/utils/tailwindMerge';

interface InputContainerContextValue {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const InputContainerContext = createContext<InputContainerContextValue | null>(
  null
);

const useInputContainerContext = () => {
  const ctx = useContext(InputContainerContext);

  if (!ctx) {
    throw new Error('Test 컴포넌트 안에서만 쓰여야합니다!');
  }

  return ctx;
};

type InputContainerProps<T extends React.ElementType> = Component<T>;

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

type InputProps<T extends React.ElementType> = Component<T>;

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

InputContainer.Input = Input;

type IconProps<T extends React.ElementType> = {
  icon: (
    props: React.ComponentProps<'svg'> & {
      title?: string;
      titleId?: string;
    }
  ) => JSX.Element;
} & Component<T>;

function IconContainer({
  children,
  className,
  icon: Icon,
  ...restProps
}: IconProps<'svg'>) {
  const { inputValue, setInputValue } = useInputContainerContext();

  const handleClick = () => {
    if (!inputValue) return;
    setInputValue('');
  };

  if (inputValue === '') return null;

  return (
    <Icon onClick={handleClick} className={tw('', className)} {...restProps} />
  );
}

InputContainer.Icon = IconContainer;
