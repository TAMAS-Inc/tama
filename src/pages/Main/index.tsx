import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import {
  AD,
  BusCard,
  LoadingWithDelay,
  Notification,
  SyncButton,
} from '@/components';
import { currentCommuteState } from '@/state/atom';
import { getCurrentDate } from '@/utils/date';
import NotFound from '../404';
import { MainHeader } from './components';
import {
  RealtimeInfo,
  RealtimeReqParams,
  useRealtime,
} from './hooks/useRealtime';

export default function Main() {
  const navigate = useNavigate();
  const [fetchTime, setFetchTime] = useState(15);
  const currentCommute = useRecoilValue(currentCommuteState);

  const testParams: RealtimeReqParams = {
    stationId: currentCommute.station?.stationId as string,
    routeIds: currentCommute.routes.flatMap((r) => r.routeId),
    predictDate: getCurrentDate(),
  };

  const {
    isError,
    isLoading,
    data: Routes,
    mutation,
  } = useRealtime(testParams);

  const handleSyncButtonClick = () => {
    mutation.mutate({ ...testParams, predictDate: getCurrentDate() });
    setFetchTime(15);
  };

  useEffect(() => {
    const timeId = setInterval(() => {
      setFetchTime((time) => time - 1);
    }, 1000);
    return () => {
      if (fetchTime === 0) {
        setFetchTime(15);
        mutation.mutate({ ...testParams, predictDate: getCurrentDate() });
      }
      clearInterval(timeId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchTime]);

  if (isError) return <NotFound />;

  return (
    <>
      <MainHeader />
      <Notification />
      {isLoading ? (
        <LoadingWithDelay />
      ) : (
        Routes?.map(
          ({
            exist,
            routeId,
            routeName,
            remainSeatCnt,
            remainStationCnt,
            predictRemainTime,
            predictRemainSeatCnt,
          }: RealtimeInfo) => (
            <BusCard
              key={routeId}
              onClick={(e) => {
                if ((e.target as HTMLElement).closest('svg'))
                  navigate(
                    `analysis?routeId=${routeId}&stationId=${currentCommute.station?.stationId}`
                  );
                else navigate(`busRoute/${routeName}`);
              }}
            >
              <BusCard.RouteName>{routeName}</BusCard.RouteName>
              <BusCard.Info>
                <BusCard.Content>
                  {exist ? `${predictRemainTime}분 후 도착` : '정보 없음'}
                </BusCard.Content>
                {exist && (
                  <BusCard.Content>
                    {remainStationCnt}번째 전 (실시간
                    {remainSeatCnt < 0 ? '정보 없음' : `${remainSeatCnt}석`},
                    예측
                    {predictRemainSeatCnt === -1
                      ? '정보 없음'
                      : ` 
                    ${predictRemainSeatCnt}석`}
                    )
                  </BusCard.Content>
                )}
              </BusCard.Info>
              <BusCard.InfoIcon />
            </BusCard>
          )
        )
      )}
      <SyncButton fetchTime={fetchTime} onClick={handleSyncButtonClick} />
      <AD />
    </>
  );
}
