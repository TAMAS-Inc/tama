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
import { MainHeader } from './components';
import {
  RealtimeInfo,
  RealtimeReqParams,
  useRealtime,
} from './hooks/useRealtime';

export default function Main() {
  const navigate = useNavigate();
  const currentCommute = useRecoilValue(currentCommuteState);

  const params: RealtimeReqParams = {
    stationId: currentCommute.station?.stationId as string,
    routeIds: currentCommute.routes.flatMap((r) => r.routeId),
    predictDate: getCurrentDate(),
  };

  const { isError, isLoading, data: Routes, mutation } = useRealtime(params);

  const handleSyncButtonClick = () => {
    mutation.mutate({ ...params, predictDate: getCurrentDate() });
  };

  if (!Routes && isError)
    return (
      <div>
        <MainHeader />
        <Error>
          <Error.SVG />
          <Error.Text>
            현재 보고 계신 페이지를 이용할 수 없습니다.
            <br />
            아래의 버튼을 눌러 재시도 해주세요.
          </Error.Text>
          <Error.InduceLink
            path="/main"
            onClick={() => {
              window.location.reload();
            }}
          >
            재시도
          </Error.InduceLink>
        </Error>
      </div>
    );

  return (
    <div>
      <MainHeader />
      <Notification />
      {isLoading && !mutation.isLoading ? (
        <LoadingWithDelay />
      ) : (
        Routes?.sort((a, b) => {
          if (a.routeName > b.routeName) return 1;
          if (a.routeName < b.routeName) return -1;
          return 0;
        }).map(
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
                    {remainStationCnt}번째 전{' '}
                    <span className=" text-Gray-500">|</span> 실시간
                    {remainSeatCnt < 0 ? '정보 없음' : ` ${remainSeatCnt}석`},
                    <span className="font-bold text-Primary-600">
                      {' '}
                      예측
                      {predictRemainSeatCnt === -1
                        ? '정보 없음'
                        : ` 
                    ${predictRemainSeatCnt}석`}
                    </span>
                  </BusCard.Content>
                )}
              </BusCard.Info>
              <BusCard.InfoIcon />
            </BusCard>
          )
        )
      )}
      <SyncButton onClick={handleSyncButtonClick} />
    </div>
  );
}
