import { useState } from 'react';
import { Link } from 'react-router-dom';
import { tw } from '@/utils/tailwindMerge';
import { BusCard, NavigationHeader, TextButton } from '@/components';

type EditProps<T extends React.ElementType> = Component<T>;

export default function Edit({
  children,
  className,
  ...restProps
}: EditProps<'div'>) {
  const data = [
    {
      routeId: '1',
      routeName: '춘시기네',
      stationName: '기흥역',
      routeList: '5001, 5002',
    },
    {
      routeId: '2',
      routeName: '라이언네',
      stationName: '보정역',
      routeList: '5001, 5002',
    },
    {
      routeId: '3',
      routeName: '이주네',
      stationName: '미금역',
      routeList: '5001, 5002',
    },
  ];

  const [selected, setSelected] = useState('춘시기네');

  const handleSelect: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if ((e.target as HTMLElement).closest('button')) return;
    setSelected(e.currentTarget.id);
  };

  const handleRemoveClick = () => {
    // eslint-disable-next-line no-console
    console.log('삭제');
  };

  return (
    <div className={tw('', className)} {...restProps}>
      <NavigationHeader>내 출근길 관리</NavigationHeader>
      {data.map(({ routeId, routeName, stationName, routeList }) => (
        <BusCard
          key={routeId}
          id={routeName}
          className="flex h-28 flex-col items-start justify-between py-3"
          onClick={handleSelect}
        >
          <div>
            <BusCard.Info className="static left-0 flex translate-x-0 flex-row">
              <BusCard.Content className="w-28 text-body1">
                {routeName}
              </BusCard.Content>
              <BusCard.StationName className="mb-0 flex items-center justify-center">
                {stationName}
              </BusCard.StationName>
            </BusCard.Info>
            <BusCard.Content className="text-Gray-400">
              {routeList}
            </BusCard.Content>
          </div>
          {routeName === selected && (
            <BusCard.CheckIcon className="bottom-2" isChecked />
          )}
          <ul className="flex gap-4">
            <li>
              <Link to="/commute">
                <TextButton>수정</TextButton>
              </Link>
            </li>
            {routeName !== selected && (
              <li>
                <TextButton onClick={handleRemoveClick}>삭제</TextButton>
              </li>
            )}
          </ul>
        </BusCard>
      ))}
    </div>
  );
}
