import { ChevronDownIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { tw } from '@/utils/tailwindMerge';
import {
  InputContainer,
  StatusButton,
  BaseModal,
  List,
  IconButton,
} from '@/components';

const routes = [
  {
    routeId: '228000176',
    routeName: '5001A',
    remainSeatCnt: '34',
    remainStationCnt: '3',
    predictReaminTime: '12분 34초',
    predictRemainSeatCnt: '12',
  },
  {
    routeId: '228000177',
    routeName: '5001B',
    remainSeatCnt: '34',
    remainStationCnt: '4',
    predictReaminTime: '12분 34초',
    predictRemainSeatCnt: '12',
  },
];

type BusSelectionModalProps<T extends React.ElementType> = {
  onDimBgClick: React.MouseEventHandler<HTMLDivElement>;
  onDownIconClick: React.MouseEventHandler<HTMLButtonElement>;
  selectedRoutes: string[];
  stationName: string;
  setSelectedRoutes: React.Dispatch<React.SetStateAction<string[]>>;
  onConfirmClick: React.MouseEventHandler<HTMLButtonElement>;
} & Component<T>;

export function BusSelectionModal({
  children,
  className,
  onDimBgClick: handleDimBgClick,
  onDownIconClick: handleDownIconClick,
  selectedRoutes,
  setSelectedRoutes,
  stationName,
  onConfirmClick: handleConfirmClick,
  ...restProps                                                                                                                 
}: BusSelectionModalProps<'div'>) {
  const handleChangeCheckbox = (title: string) =>
    !selectedRoutes.includes(title)
      ? setSelectedRoutes((prevBus) => [...prevBus, title])
      : setSelectedRoutes((prevBus) => [
          ...prevBus.filter((busTitle) => busTitle !== title),
        ]);

  return (
    <BaseModal className={tw('', className)} {...restProps}>
      <BaseModal.Content className="top-56 h-full w-full rounded-t-2xl bg-White">
        <List className="rounded-t-2xl">
          <List.Item className="rounded-t-2xl pl-6">
            <List.Title>{stationName}</List.Title>
            <IconButton
              onClick={handleDownIconClick}
              className="absolute right-6 h-6 w-6"
            >
              <IconButton.Icon
                icon={ChevronDownIcon}
                className="fill-Gray-400"
              />
            </IconButton>
          </List.Item>

          {routes.map(({ routeName }) => (
            <List.Item key={routeName} className="relative pl-4">
              <List.Title className="pl-2 text-body1 text-Primary-700">
                {routeName}
              </List.Title>
              <InputContainer className="absolute top-6 right-6 h-6 w-6">
                <InputContainer.Label>
                  <List.Icon
                    className={tw(
                      'absolute top-0 right-0 h-7 w-7',
                      !selectedRoutes.includes(routeName)
                        ? 'bg-White fill-White stroke-Gray-300'
                        : 'bg-White fill-Primary-700'
                    )}
                    icon={
                      !selectedRoutes.includes(routeName)
                        ? PlusCircleIcon
                        : CheckCircleIcon
                    }
                  />
                  <InputContainer.Label.Input
                    onChange={() => handleChangeCheckbox(routeName)}
                    type="checkbox"
                    className="bg-Gray-500"
                  />
                </InputContainer.Label>
              </InputContainer>
            </List.Item>
          ))}
        </List>
        <StatusButton
          onClick={handleConfirmClick}
          disabled={!selectedRoutes.length}
          className="fixed left-4 bottom-8 w-[calc(100%-32px)]"
        >
          확인
        </StatusButton>
      </BaseModal.Content>
      <BaseModal.DimBg onClick={handleDimBgClick} />
    </BaseModal>
  );
}
