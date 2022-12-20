/* eslint-disable no-nested-ternary */
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {
  BusCard,
  Error,
  Notification,
  SyncButton,
  LoadingWithDelay,
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
  const currentCommute = useRecoilValue(currentCommuteState);

  const params: RealtimeReqParams = useMemo(
    () => ({
      stationId: currentCommute.station?.stationId as string,
      routeIds: currentCommute.routes.flatMap((r) => r.routeId),
      predictDate: getCurrentDate(),
    }),
    [currentCommute.routes, currentCommute.station?.stationId]
  );

  const { isError, isLoading, data: Routes, mutation } = useRealtime(params);

  const handleSyncButtonClick = () => {
    mutation.mutate({ ...params, predictDate: getCurrentDate() });
  };

  useEffect(() => {
    const timeId = setInterval(() => {
      mutation.mutate({ ...params, predictDate: getCurrentDate() });
    }, 16000);
    return () => {
      clearInterval(timeId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

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
                else navigate(`RouteMap/${routeId}`);
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
    </>
  );
}
