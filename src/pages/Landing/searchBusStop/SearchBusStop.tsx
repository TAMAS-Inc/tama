import { tw } from '@/utils/tailwindMerge';
import { InputContainer, NavigationHeader } from '@/components';

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
      <NavigationHeader className="-ml-4">
        <InputContainer className="relative h-12 w-full pl-3">
          <InputContainer.Label>
            <InputContainer.Label.Input
              className="bg-Gray-100"
              placeholder="정류장 검색"
            />
          </InputContainer.Label>
          <InputContainer.ResetButton className="absolute top-3 right-3 h-6 w-6 fill-Gray-500" />
        </InputContainer>
      </NavigationHeader>
    </div>
  );
}
