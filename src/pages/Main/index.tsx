import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { AD, BusCard, Notification, SyncButton } from '@/components';
import { getCurrentDate } from '@/utils/date';
import NotFound from '../404';
import { MainHeader } from './components';
import {
  RealtimeInfo,
  RealtimeReqParams,
  useRealtime,
} from './hooks/useRealtime';
import { currentCommuteState, isUserValidState } from '@/state/atom';

export default function Main() {
  const navigate = useNavigate();
  const currentCommute = useRecoilValue(currentCommuteState);

  const testParams: RealtimeReqParams = {
    stationId: currentCommute.station.stationId,
    routeIds: currentCommute.routes.flatMap((r) => r.routeId),
    predictDate: getCurrentDate(),
  };

  const { isError, isLoading, data, mutation } = useRealtime(testParams);

  useEffect(() => {
    const refreshDataInterval = setInterval(() => {
      mutation.mutate({ ...testParams, predictDate: getCurrentDate() });
    }, 15000);

    return () => clearInterval(refreshDataInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSyncButtonClick = () => {
    mutation.mutate({ ...testParams, predictDate: getCurrentDate() });
  };

  if (isError) return <NotFound />;

  return (
    <>
      <MainHeader />
      <Notification />
      {isLoading || mutation.isLoading ? (
        <span>Loading...</span>
      ) : (
        data?.map(
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
                  navigate(`analysis/${routeName}`);
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
                    {remainStationCnt}번째 전 (실시간 {remainSeatCnt}석, 예측
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
      <SyncButton onClick={handleSyncButtonClick} />
      <AD />
    </>
  );
}
