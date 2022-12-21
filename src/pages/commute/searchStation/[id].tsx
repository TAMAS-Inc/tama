import { useState, ChangeEventHandler, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { hangulIncludes, chosungIncludes } from '@toss/hangul';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import Highlighter from 'react-highlight-words';
import {
  BaseModal,
  Header,
  InputContainer,
  List,
  LoadingWithDelay,
  Error,
  TextButton,
} from '@/components';
import { tw } from '@/utils/tailwindMerge';
import { useCommutes } from '@/hooks/useCommutes';
import { useAvailableStations } from '../hooks/useAvailableStations';
import { useAvailableRoutes } from '../hooks/useAvailableRoutes';
import NotFound from '@/pages/404';

type SearchBusStopProps<T extends React.ElementType> = Component<T>;

export default function SearchBusStop({
  className,
  ...restProps
}: SearchBusStopProps<'div'>) {
  const navigate = useNavigate();
  const { id: comId } = useParams() as { id: Commute['comId'] };
  const { editing, editCommute } = useCommutes();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [targetId, setTargetId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  const {
    isLoading: isStationsLoading,
    isError: isStationsError,
    data: stations,
  } = useAvailableStations();

  const inputRef = useRef<HTMLInputElement>(null);

  const {
    isLoading: isRouteLoading,
    isError: isRouteError,
    data: routes,
  } = useAvailableRoutes({ stationId: selectedStation?.stationId ?? null });

  const filteredStations = stations?.filter(
    (station) =>
      hangulIncludes(station.stationName, inputValue) ||
      chosungIncludes(station.stationName, inputValue)
  );

  const handlePopupMessage = () => {
    setIsPopupOpen(true);
    setTimeout(() => setIsPopupOpen(false), 1000);
  };
  const handleCloseClick = () => setIsModalOpen(false);
  const handleResetClick = () => {
    setInputValue('');
    inputRef.current?.focus();
  };
  const handleStationClick = (station: Station) => {
    setSelectedStation(station);
    editCommute({
      ...editing,
      station,
      routes: [],
    });
    setIsModalOpen(true);
  };
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };
  const handleRouteCheckChange = (route: Route, checked: boolean) =>
    checked
      ? editCommute({
          ...editing,
          routes: [...editing.routes, route],
        })
      : editCommute({
          ...editing,
          routes:
            editing.routes.filter((r) => r.routeId !== route.routeId) ?? [],
        });

  const handleNavigateBefore = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  });

  if (!comId || isStationsError || isRouteError) return <NotFound />;

  return (
    <div className={tw('', className)} {...restProps}>
      <Header>
        <Header.BackButton />
        <Header.Title className="grow">
          <InputContainer className="relative w-full pl-3 ">
            <InputContainer.Label>
              <InputContainer.Label.Input
                ref={inputRef}
                onChange={handleInputChange}
                className="truncate bg-Gray-100 pr-10"
                placeholder="정류장 검색"
              />
            </InputContainer.Label>
            <InputContainer.ResetButton
              onClick={handleResetClick}
              className="absolute top-1 right-3 h-6 w-6"
            />
          </InputContainer>
        </Header.Title>
      </Header>

      {filteredStations?.length === 0 ? (
        <Error>
          <Error.SVG />
          <Error.Text>
            검색하신 입력어로 정류장을 찾을 수 없어요.
            <br />
            다른 검색어로 다시 시도해주세요.
          </Error.Text>
        </Error>
      ) : (
        <List>
          {isStationsLoading ? (
            <LoadingWithDelay />
          ) : (
            filteredStations?.map((station) => (
              <List.Item
                key={station.stationId}
                onClick={() => handleStationClick(station)}
                className="pl-4 focus:bg-Primary-400"
              >
                <List.Title>
                  <Highlighter
                    searchWords={[inputValue]}
                    textToHighlight={station.stationName}
                  />
                </List.Title>
                <div className="text-[12px] text-Gray-500">
                  {station.mobileNo ?? '번호 없음'}
                </div>
              </List.Item>
            ))
          )}
        </List>
      )}
      <BaseModal className="h-full w-full overflow-hidden ">
        <BaseModal.Content
          className={tw(
            'fixed inset-0 top-56 z-50 h-[calc(100%-14rem)] w-full rounded-t-2xl bg-White transition duration-300 ease-in-out',
            isModalOpen ? 'translate-y-0' : 'translate-y-[1800px]'
          )}
        >
          <List className="rounded-t-2xl">
            <div className="flex h-20 items-center justify-between rounded-t-2xl border-b border-Gray-100 pl-6 pr-4">
              <List.Title className="w-40 truncate">
                {selectedStation?.stationName}
              </List.Title>
              <TextButton
                onClick={handleNavigateBefore}
                className="bg-transparent text-body2"
              >
                완료
              </TextButton>
            </div>
            {!isRouteLoading &&
              routes?.map(({ routeName, routeId }) => (
                <List.Item key={routeId} className="relative pl-4">
                  <InputContainer className="h-full w-full pl-2 text-body1 text-Primary-700">
                    <InputContainer.Label>
                      {routeName}
                      <InputContainer.Label.Input
                        onChange={(e) => {
                          handleRouteCheckChange(
                            { routeName, routeId },
                            e.target.checked
                          );
                          handlePopupMessage();
                          setTargetId(routeId);
                        }}
                        type="checkbox"
                        className="hidden"
                      />
                      <List.Icon
                        className={tw(
                          'absolute top-6 right-4 h-7 w-7',
                          !editing.routes.find((r) => r.routeId === routeId)
                            ? 'bg-White fill-White stroke-Gray-300'
                            : 'bg-White fill-Primary-400'
                        )}
                        icon={
                          !editing.routes.find((r) => r.routeId === routeId)
                            ? PlusCircleIcon
                            : CheckCircleIcon
                        }
                      />
                    </InputContainer.Label>
                  </InputContainer>
                </List.Item>
              ))}
            <div
              className={tw(
                'absolute left-1/2 bottom-10 -translate-x-1/2 -translate-y-1/2 rounded-md bg-Gray-600 py-1 px-2 text-center text-Gray-100 transition-opacity',
                isPopupOpen ? 'opacity-100' : 'opacity-0'
              )}
            >
              {!editing.routes.find((e) => e.routeId === targetId)
                ? '제거 '
                : '추가 '}
              되었습니다.
            </div>
          </List>
        </BaseModal.Content>
        <BaseModal.DimBg
          onClick={handleCloseClick}
          className={tw(
            'fixed inset-0 z-20  bg-Gray-700 opacity-80',
            isModalOpen ? '' : 'hidden'
          )}
        />
      </BaseModal>
    </div>
  );
}
