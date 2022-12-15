import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import { AD, BusCard, Notification, SyncButton } from '@/components';
import { MainHeader } from './components';
import NotFound from '../404';
import {
  RealtimeInfo,
  RealtimeReqParams,
  useRealtime,
} from './hooks/useRealtime';

type Location = {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state: {
    bus: string[];
    stationName: string;
    userStation: string;
  };
};

export default function Main() {
  const navigate = useNavigate();
  const location: Location = useLocation();

  const testParams: RealtimeReqParams = {
    stationId: '228000682',
    routeIds: ['228000176', '228000389'],
    predictDate: '2022-12-25T06:25',
  };

  const { isError, isLoading, data, mutation } = useRealtime(testParams);

  useEffect(() => {
    if (!location.state?.userStation) navigate('/landing');
  }, [location.state?.userStation, navigate]);

  if (isError) return <NotFound />;

  const handleSyncButtonClick = () => {
    mutation.mutate(testParams);
  };

  return (
    <>
      <MainHeader>{location.state?.userStation ?? '춘시기넹'}</MainHeader>
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
