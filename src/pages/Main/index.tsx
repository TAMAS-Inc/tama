/* eslint-disable no-nested-ternary */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { AD, BusCard, Error, Notification, SyncButton } from '@/components';
import { currentCommuteState } from '@/state/atom';
import { getCurrentDate } from '@/utils/date';
import NotFound from '../404';
import { MainHeader } from './components';
import {
  RealtimeInfo,
  RealtimeReqParams,
  useRealtime,
} from './hooks/useRealtime';

const INTERVAL_TIME = 15000;

export default function Main() {
  const navigate = useNavigate();
  const currentCommute = useRecoilValue(currentCommuteState);

  const testParams: RealtimeReqParams = {
    stationId: currentCommute.station?.stationId as string,
    routeIds: currentCommute.routes.flatMap((r) => r.routeId),
    predictDate: getCurrentDate(),
  };

  const { isError, isLoading, data, mutation } = useRealtime(testParams);

  useEffect(() => {
    const refreshDataInterval = setInterval(() => {
      // mutation.mutate({ ...testParams, predictDate: getCurrentDate() });
    }, INTERVAL_TIME);

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
      {isError ? (
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
      ) : isLoading ? (
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

      <SyncButton onClick={handleSyncButtonClick} />
      <AD />
    </>
  );
}
