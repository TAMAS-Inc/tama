import { v4 as uuid } from 'uuid';
import { useRef, useEffect, useState, ChangeEventHandler } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDownIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { tw } from '@/utils/tailwindMerge';
import { currentStationState, newCommuteState, userStationsState } from '../../state/atom';
import {
  NavigationHeader,
  InputContainer,
  TextButton,
  StatusButton,
  BaseModal,
  List,
} from '@/components';
import { useCommutes } from '@/hooks/useCommutes';

type CommuteProps<T extends React.ElementType> = Component<T>;
type Location = {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state: {
    comId?: string;
  };
};

const buses = [
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

export default function Commute({
  children,
  className,
  ...restProps
}: CommuteProps<'div'>) {
  const location: Location = useLocation();
  

  const { commutes, addCommute } = useCommutes();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [newCommute, setNewCommute] = useRecoilState(newCommuteState);

  const [selectedRoutes, setSelectedRoutes] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonStationRef = useRef<HTMLButtonElement>(null);
  const buttonBusRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.value = newCommute.comName;
      setNewCommute(prev => ({...prev, comName: inputRef.current.value }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (buttonStationRef?.current) {
      buttonStationRef.current.textContent = newCommute.station.stationName ;
    }
    // if (buttonBusRef?.current) {
    //   if (stationName) {
    //     buttonBusRef.current.textContent =
    //       selectedRoutes.length === 0
    //         ? bus.join(', ') ?? '버스 선택'
    //         : selectedRoutes.join(',');
    //   }
    // }
  }, [newCommute]);

  const handleOpenClick = () => setIsOpen(true);
  const handleCloseClick = () => setIsOpen(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewCommute(prev=>( {...prev, comName: e.target.value}));
  };

  const handleChangeCheckbox = (title: string) =>
    !selectedRoutes.includes(title)
      ? setSelectedRoutes((prevBus) => [...prevBus, title])
      : setSelectedRoutes((prevBus) => [
          ...prevBus.filter((busTitle) => busTitle !== title),
        ]);

  const handleConfirmClick = () => {
    // addCommute()
  }

  return (
    <div className="pl-4 pr-4" {...restProps}>
      <NavigationHeader className="-ml-4">출근길 관리</NavigationHeader>
      <div className="mt-8">
        <h2 className="mb-2 text-body2">내 정류장 별칭 입력</h2>
        <InputContainer className="relative h-12 w-full">
          <InputContainer.Label>
            <InputContainer.Label.Input
              ref={inputRef}
              className="border border-Gray-300"
              onChange={handleChange}
            />
          </InputContainer.Label>
          <InputContainer.ResetButton className="absolute top-3 right-3 h-6 w-6 fill-Gray-500" />
        </InputContainer>
      </div>
      <div className="mt-8">
        <h2 className="mb-2 text-body2">정류장 이름</h2>
        <Link to="/searchStation" state={{ userStation: userStationName }}>
          <TextButton
            ref={buttonStationRef}
            className="relative h-12 w-full rounded-lg border border-Gray-300 bg-White text-left text-body2 text-Gray-400"
          >
            정류장 검색
          </TextButton>
        </Link>
      </div>
      <div className="mt-8">
        <h2 className="mb-2 text-body2">버스 번호</h2>
        <TextButton
          ref={buttonBusRef}
          onClick={handleOpenClick}
          className="relative h-12 w-full rounded-lg border border-Gray-300 bg-White text-left text-body2 text-Gray-400"
        >
          버스 선택
        </TextButton>
      </div>
      <Link
        to="/main"
      >
        <StatusButton
          disabled={!location.state}
          onClick={handleConfirmClick}
          className="fixed bottom-8 w-[calc(100%-32px)]"
        >
          확인
        </StatusButton>
      </Link>
      {isOpen && (
        <BaseModal>
          <BaseModal.Content className="top-56 h-full w-full rounded-t-2xl bg-White">
            <List className="rounded-t-2xl">
              <List.Item
                onClick={(e) => {
                  if (!(e.target as HTMLElement).closest('svg')) return;
                  handleCloseClick();
                }}
                className="rounded-t-2xl pl-6"
              >
                <List.Title>{buttonStationRef.current?.textContent}</List.Title>
                <List.Icon icon={ChevronDownIcon} />
              </List.Item>

              {buses.map(({ routeName }) => (
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
              onClick={handleCloseClick}
              disabled={!selectedRoutes.length}
              className="fixed left-4 bottom-8 w-[calc(100%-32px)]"
            >
              확인
            </StatusButton>
          </BaseModal.Content>
          <BaseModal.DimBg onClick={handleCloseClick} />
        </BaseModal>
      )}
    </div>
  );
}
