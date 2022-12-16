import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircleIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import {
  BaseModal,
  Header,
  InputContainer,
  List,
  StatusButton,
} from '@/components';
import { tw } from '@/utils/tailwindMerge';
import { useCommutes } from '@/hooks/useCommutes';

type SearchBusStopProps<T extends React.ElementType> = Component<T>;
type SelectedStation = Station;

export const dummyRoutes: Route[] = [
  {
    routeId: '228000176',
    routeName: '5001',
  },
  {
    routeId: '228000389',
    routeName: '5003A',
  },
];

const stations = [
  {
    stationId: '228000682',
    stationName: '기흥역',
  },
];

export default function SearchBusStop({
  className,
  ...restProps
}: SearchBusStopProps<'div'>) {
  const navigate = useNavigate();
  const { id: comId } = useParams();
  const { commutes, editCommute } = useCommutes();

  const commute = commutes.find((c) => c.comId === comId)!;

  const [showTip, setShowTip] = useState<boolean>(true);
  const [selectedStation, setSelectedStation] = useState<Station>(
    commute.station!
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  if (!comId) return null;

  const handleCloseClick = () => setIsModalOpen(false);
  const handleResetClick = () => setShowTip(true);

  const handleStationClick = (station: SelectedStation) => {
    setSelectedStation(station);
    editCommute(comId, {
      ...commute,
      station,
      routes: [],
    });
    setIsModalOpen(true);
  };

  const handleChange = () => setShowTip(inputRef.current?.value === '');

  const handleRouteCheckChange = (route: Route, checked: boolean) => {
    if (checked) {
      editCommute(comId, {
        ...commute,
        routes: [...commute.routes, route],
      });
    } else {
      editCommute(comId, {
        ...commute,
        routes: commute.routes.filter((r) => r.routeId !== route.routeId),
      });
    }
  };
  const handleRoutesConfirmClick = () => {
    navigate(-1);
  };

  return (
    <div className={tw('mt-4 w-full', className)} {...restProps}>
      <Header>
        <Header.BackButton />
        <Header.Title className="grow">
          <InputContainer className="relative w-full pl-3 ">
            <InputContainer.Label>
              <InputContainer.Label.Input
                ref={inputRef}
                onChange={handleChange}
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

      {showTip ? (
        <div className="mt-4 pl-4">정류장 리스트</div>
      ) : (
        <List className="mt-4 pl-4">
          {stations.map((station) => (
            <List.Item
              key={station.stationId}
              onClick={() => handleStationClick(station)}
              className="pl-2"
            >
              <List.Title>{station.stationName}</List.Title>
              {/* <List.Subtitle>{subtitle} | 종점방면</List.Subtitle> */}
            </List.Item>
          ))}
        </List>
      )}
      {isModalOpen && (
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
                <List.Title>{selectedStation.stationName}</List.Title>
                <List.Icon icon={ChevronDownIcon} />
              </List.Item>

              {dummyRoutes.map(({ routeName, routeId }) => (
                <List.Item key={routeId} className="relative pl-4">
                  <List.Title className="pl-2 text-body1 text-Primary-700">
                    {routeName}
                  </List.Title>
                  <InputContainer className="absolute top-6 right-6 h-6 w-6">
                    <InputContainer.Label>
                      <List.Icon
                        className={tw(
                          'absolute top-0 right-0 h-7 w-7',
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
                      <InputContainer.Label.Input
                        onChange={(e) => {
                          handleRouteCheckChange(
                            { routeName, routeId },
                            e.target.checked
                          );
                        }}
                        type="checkbox"
                        className="bg-Gray-500"
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
