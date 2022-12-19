import { useState, ChangeEventHandler } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { hangulIncludes, chosungIncludes } from '@toss/hangul';
import { CheckCircleIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import Highlighter from 'react-highlight-words';
import {
  BaseModal,
  Header,
  InputContainer,
  List,
  StatusButton,
} from '@/components';
import { tw } from '@/utils/tailwindMerge';
import { useCommutes } from '@/hooks/useCommutes';
import { useAvailableStations } from '../hooks/useAvailableStations';
import { useAvailableRoutes } from '../hooks/useAvailableRoutes';
import NotFound from '@/pages/404';

type SearchBusStopProps<T extends React.ElementType> = Component<T>;

// export const dummyRoutes: Route[] = [
//   {
//     routeId: '228000176',
//     routeName: '5001',
//   },
//   {
//     routeId: '228000389',
//     routeName: '5003A',
//   },
// ];

// const stations = [
//   {
//     stationId: '228000682',
//     stationName: '기흥역',
//   },
// ];

export default function SearchBusStop({
  className,
  ...restProps
}: SearchBusStopProps<'div'>) {
  const navigate = useNavigate();
  const { id: comId } = useParams() as { id: Commute['comId'] };
  const { commutes, editCommute } = useCommutes();

  const commute = commutes.find((c) => c.comId === comId) as Commute;

  const [inputValue, setInputValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  const {
    isLoading: isStationsLoading,
    isError: isStationsError,
    data: stations,
  } = useAvailableStations();

  const {
    isLoading: isRouteLoading,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isError: isRouteError,
    data: routes,
  } = useAvailableRoutes({ stationId: selectedStation?.stationId ?? null });

  const filteredStations = stations?.filter(
    (station) =>
      hangulIncludes(station.stationName, inputValue) ||
      chosungIncludes(station.stationName, inputValue)
  );

  const handleCloseClick = () => setIsModalOpen(false);
  const handleResetClick = () => {
    setInputValue('');
  };
  const handleStationClick = (station: Station) => {
    setSelectedStation(station);
    editCommute(comId, {
      ...commute,
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
      ? editCommute(comId, {
          ...commute,
          routes: [...commute.routes, route],
        })
      : editCommute(comId, {
          ...commute,
          routes: commute.routes.filter((r) => r.routeId !== route.routeId),
        });

  const handleRoutesConfirmClick = () => {
    navigate(-1);
  };

  if (!comId) return null;
  if (isStationsError) return <NotFound />;

  return (
    <div className={tw('mt-4 w-full', className)} {...restProps}>
      <Header>
        <Header.BackButton />
        <Header.Title className="grow">
          <InputContainer className="relative w-full pl-3 ">
            <InputContainer.Label>
              <InputContainer.Label.Input
                onChange={handleInputChange}
                className="bg-Gray-100"
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
        <div className="pt-4 text-center text-body1">
          해당 이름을 가진 정류장이 없어요 😭
        </div>
      ) : (
        <List className="pl-4">
          {isStationsLoading ||
            filteredStations?.map((station) => (
              <List.Item
                key={station.stationId}
                onClick={() => handleStationClick(station)}
                className="pl-2"
              >
                <List.Title>
                  <Highlighter
                    searchWords={[inputValue]}
                    textToHighlight={station.stationName}
                  />
                </List.Title>
              </List.Item>
            ))}
        </List>
      )}
      {isModalOpen && (
        <BaseModal>
          <BaseModal.Content className="top-56 h-full w-full rounded-t-2xl bg-White">
            <List className="rounded-t-2xl">
              <List.Item
                onClick={handleCloseClick}
                className="rounded-t-2xl pl-6"
              >
                <List.Title>{selectedStation?.stationName}</List.Title>
                <List.Icon icon={ChevronDownIcon} />
              </List.Item>

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
                          }}
                          type="checkbox"
                          className="hidden"
                        />
                        <List.Icon
                          className={tw(
                            'absolute top-6 right-4 h-7 w-7',
                            !commute.routes.find((r) => r.routeId === routeId)
                              ? 'bg-White fill-White stroke-Gray-300'
                              : 'bg-White fill-Primary-700'
                          )}
                          icon={
                            !commute.routes.find((r) => r.routeId === routeId)
                              ? PlusCircleIcon
                              : CheckCircleIcon
                          }
                        />
                      </InputContainer.Label>
                    </InputContainer>
                  </List.Item>
                ))}
            </List>
            <StatusButton
              onClick={handleRoutesConfirmClick}
              disabled={!commute.routes.length}
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
