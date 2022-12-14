import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { tw } from '@/utils/tailwindMerge';
import { AD, BusCard, Notification, SyncButton } from '@/components';
import { MainHeader } from './components';

type MainProps<T extends React.ElementType> = Component<T>;
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

export default function Main({ className, ...restProps }: MainProps<'div'>) {
  const navigate = useNavigate();
  const location: Location = useLocation();
  const { userStation } = location.state;

  useEffect(() => {
    if (!userStation) navigate('/landing');
  }, [userStation, navigate]);

  const data = [
    {
      routeId: '228000176',
      routeName: '5001A',
      remainSeatCnt: '34',
      remainStationCnt: '3',
      predictRemainTime: '12분 34초',
      predictRemainSeatCnt: '12',
    },
    {
      routeId: '228000177',
      routeName: '5001B',
      remainSeatCnt: '34',
      remainStationCnt: '4',
      predictRemainTime: '12분 34초',
      predictRemainSeatCnt: '12',
    },
  ];

  return (
    <div className={tw('', className)} {...restProps}>
      <MainHeader>{userStation ?? '춘시기넹'}</MainHeader>
      <Notification />
      {data.map(
        ({
          routeId,
          routeName,
          remainSeatCnt,
          remainStationCnt,
          predictRemainTime,
          predictRemainSeatCnt,
        }) => (
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
              <BusCard.Content>{predictRemainTime}</BusCard.Content>
              <BusCard.Content>
                {remainStationCnt}번째 전 (실시간 {remainSeatCnt}석, 예측{' '}
                {predictRemainSeatCnt}석)
              </BusCard.Content>
            </BusCard.Info>
            <BusCard.InfoIcon />
          </BusCard>
        )
      )}
      <SyncButton />
      <AD />
    </div>
  );
}
