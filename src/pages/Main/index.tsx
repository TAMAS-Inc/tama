import { useNavigate } from 'react-router-dom';
import { tw } from '@/utils/tailwindMerge';
import { AD, BusCard, Notification, SyncButton } from '@/components';
import { MainHeader } from './components';

type MainProps<T extends React.ElementType> = Component<T>;

export default function Main({ className, ...restProps }: MainProps<'div'>) {
  const navigate = useNavigate();
  const data = [
    {
      routeId: '228000176',
      routeName: '5001A',
      remainSeatCnt: '34',
      remainStationCnt: '3',
      predictReaminTime: '12분 34초',
      predictRemainSeatCnt: '12',
    },
    {
      routeId: '228000177',
      routeName: '5001B',
      remainSeatCnt: '34',
      remainStationCnt: '4',
      predictReaminTime: '12분 34초',
      predictRemainSeatCnt: '12',
    },
  ];

  return (
    <div className={tw('pt-8', className)} {...restProps}>
      <MainHeader>춘시기넹</MainHeader>
      <Notification />
      {data.map(
        ({
          routeId,
          routeName,
          remainSeatCnt,
          remainStationCnt,
          predictReaminTime,
          predictRemainSeatCnt,
        }) => (
          <BusCard
            key={routeId}
            onClick={(e) => {
              if ((e.target as HTMLElement).closest('svg'))
                navigate(`main/analysis/${routeName}`);
              else navigate(`main/busRoute/${routeName}`);
            }}
          >
            <BusCard.RouteName>{routeName}</BusCard.RouteName>
            <BusCard.Info>
              <BusCard.Content>{predictReaminTime}</BusCard.Content>
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
