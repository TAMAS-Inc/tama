/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  ChangeEventHandler,
  ComponentProps,
  createContext,
  forwardRef,
  MouseEventHandler,
  useContext,
  Ref,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { IconButton } from '@/components/IconButton';
import { tw } from '@/utils/tailwindMerge';

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

const Input = forwardRef(
  (
    { className, onChange, ...restProps }: InputProps<'input'>,
    outerRef: Ref<HTMLInputElement>
  ) => {
    const { inputValue, setInputValue } = useInputContainerContext();

    useEffect(() => {
      if (outerRef && 'current' in outerRef) {
        const { current } = outerRef;
        if (current) setInputValue(current.value);
      }
    }, [outerRef, setInputValue]);

    useEffect(() => {
      if (inputValue === '' && outerRef && 'current' in outerRef) {
        const { current } = outerRef;
        if (current) current.value = '';
      }
    }, [inputValue, outerRef]);

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      setInputValue(e.target.value);
      if (onChange) onChange(e);
    };

    return (
      <input
        ref={outerRef}
        className={tw('h-full w-full rounded-lg pl-3 outline-none', className)}
        onChange={handleChange}
        {...restProps}
      />
    );
  }
);

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
  className,
  onClick,
  ...restProps
}: ComponentProps<typeof IconButton>) {
  const { inputValue, setInputValue } = useInputContainerContext();

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    setInputValue('');
    if (onClick) onClick(e);
  };

  if (inputValue === '') return null;

  return (
    <IconButton
      className={tw('', className)}
      onClick={handleClick}
      {...restProps}
    >
      <IconButton.Icon className="fill-Gray-500" icon={XCircleIcon} />
    </IconButton>
  );
}

InputContainer.Label = Label;
InputContainer.ResetButton = ResetButton;
Label.Input = Input;
