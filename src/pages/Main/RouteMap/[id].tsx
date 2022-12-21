import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from '@heroicons/react/24/outline';
import { TruckIcon } from '@heroicons/react/24/solid';
import { animateScroll } from 'react-scroll';
import { tw } from '@/utils/tailwindMerge';
import {
  NavigationHeader,
  Notification,
  BusCard,
  Icon,
  SyncButton,
  LoadingWithDelay,
  Error,
  IconButton,
} from '@/components';

import { useRouteMap, RouteMapInfo } from '../hooks/useRouteMap';

type BusRouteProps<T extends React.ElementType> = Component<T>;

function Bus({
  stationSeq,
  routeLocations,
}: {
  stationSeq: number;
  routeLocations: RouteMapInfo['routeLocations'];
}) {
  const currentLocation = routeLocations.find(
    (r) => r.stationSeq === stationSeq
  );
  const isThere = !!currentLocation;
  return (
    <>
      {isThere ? (
        <div className="absolute top-8 -left-[78px] mx-2 rounded-sm border border-Gray-200 px-1 text-body3 ">
          {currentLocation.plateNo.slice(-4)}{' '}
          <span className="text-Primary-600">
            {currentLocation.remainSeatCnt}석
          </span>
        </div>
      ) : (
        ''
      )}
      <Icon
        icon={isThere ? TruckIcon : ArrowDownCircleIcon}
        className={tw(
          'absolute top-8 -left-[8px] h-4 w-4  fill-White stroke-Gray-400',
          isThere ? 'fill-[#e94545] stroke-none' : ''
        )}
      />
    </>
  );
}

export default function RouteMap({
  className,
  ...restProps
}: BusRouteProps<'div'>) {
  const { id: routeId } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSyncing, setIsSyncing] = useState(false);
  const { isLoading, isError, data, mutation } = useRouteMap(routeId ?? '');

  if (isLoading)
    return (
      <div className={tw('', className)} {...restProps}>
        <NavigationHeader />
        <Notification />
        <LoadingWithDelay />
      </div>
    );

  if (isError)
    return (
      <div className={tw('', className)} {...restProps}>
        <NavigationHeader />
        <Error>
          <Error.SVG />
          <Error.Text>
            현재 보고 계신 페이지를 이용할 수 없습니다.
            <br />
            재접속 후에도 화면이 나타나지 않는다면
            <br />
            아래 버튼을 눌러 알려주세요!
          </Error.Text>
          <Error.InduceLink path="/menu/inquiry">
            문의하러 가기
          </Error.InduceLink>
        </Error>
      </div>
    );

  const { routeInfo, routeLocations, routePassingStations } = data;

  const handleSyncButtonClick = () => {
    setIsSyncing(true);
    mutation.mutate(routeId ?? '', {
      onSuccess: () => {
        setIsSyncing(false);
      },
    });
  };

  const handleTopClick = () => {
    animateScroll.scrollToTop();
  };

  return (
    <div className={tw('', className)} {...restProps}>
      <NavigationHeader>{routeInfo.routeName}</NavigationHeader>
      <Notification />
      <BusCard className="relative flex h-full flex-col py-4">
        <BusCard.StationName className="text-body1">
          {routeInfo.routeName}
        </BusCard.StationName>
        <BusCard.Info className="flex items-center text-Gray-400">
          <BusCard.Content>
            {routeInfo.regionName} | {routeInfo.startStationName} ↔
            {routeInfo.endStationName}
          </BusCard.Content>
          <BusCard.Content>
            {routeInfo.upFirstTime} ~ {routeInfo.upLastTime} ∙ 배차간격
            {routeInfo.peekAlloc}-{routeInfo.nPeekAlloc}분
          </BusCard.Content>
          <BusCard.Content>{routeLocations.length}대 운행중</BusCard.Content>
        </BusCard.Info>
        <Icon
          icon={TruckIcon}
          className="absolute top-[18px] -ml-24 h-6 w-6 fill-[#e94545]"
        />
      </BusCard>
      {routePassingStations.map(
        ({ stationId, stationName, mobileNo, stationSeq }) => (
          <BusCard key={stationId} className="flex h-full flex-col items-start">
            <div className="relative ml-14 h-20 border-l-2 border-l-Primary-500 pl-4">
              <BusCard.StationName
                className={tw(
                  'mt-4',
                  stationName.includes('경유') ? 'text-Gray-500' : ''
                )}
              >
                {stationName}
              </BusCard.StationName>
              <BusCard.Info className="text-Gray-400">
                <BusCard.Content>{mobileNo ?? '미정차'}</BusCard.Content>
              </BusCard.Info>
              <Bus stationSeq={stationSeq} routeLocations={routeLocations} />
            </div>
          </BusCard>
        )
      )}

      <IconButton
        className="mx-auto my-4 h-12 w-12 animate-bounce"
        onClick={handleTopClick}
      >
        <IconButton.Icon
          icon={ArrowUpCircleIcon}
          className="h-12 w-12 stroke-Gray-400 stroke-1"
        />
      </IconButton>
      <div className="p-4 text-body3 text-Gray-400">
        실시간 정보는 상황에 따라 오차가 발생할 수 있습니다.
      </div>
      <SyncButton onClick={handleSyncButtonClick} />
    </div>
  );
}
