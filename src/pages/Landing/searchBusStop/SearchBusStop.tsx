import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { tw } from '@/utils/tailwindMerge';
import { InputContainer, Icon } from '@/components';

type SearchBusStopProps<T extends React.ElementType> = Component<T>;

export function SearchBusStop({
  className,
  ...restProps
}: SearchBusStopProps<'div'>) {
  return (
    <div
      className={tw('mt-8 flex items-center pl-4 pr-4', className)}
      {...restProps}
    >
      <Icon
        icon={ChevronLeftIcon}
        className="h-6 w-6 text-Gray-400"
        stroke-width="2"
      />
      <InputContainer className="relative h-12 w-full pl-3">
        <InputContainer.Input
          className="bg-Gray-100"
          placeholder="정류장 검색"
        />
        <InputContainer.ResetButton className="absolute top-3 right-3 h-6 w-6 fill-Gray-100" />
      </InputContainer>
    </div>
  );
}
