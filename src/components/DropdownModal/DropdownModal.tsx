import { Link } from 'react-router-dom';
import { useState } from 'react';
import { tw } from '@/utils/tailwindMerge';
import { BaseModal, BusCard, List, TextButton } from '@/components';
// import { MyStationCard } from '../MyStationCard';

type DropdownModalProps<T extends React.ElementType> = {
  handleDropdown: (arg: boolean) => void;
  handleCurrent: React.Dispatch<React.SetStateAction<string>>;
} & Component<T>;

export function DropdownModal({
  children,
  className,
  handleDropdown,
  handleCurrent,
  ...restProps
}: DropdownModalProps<'div'>) {
  const data = [
    {
      routeId: '1',
      routeName: '춘시기네',
      stationName: '기흥역',
      dest: '롯데캐슬스카이, 이안두드림, 백남준아트센터 방면',
    },
    {
      routeId: '2',
      routeName: '라이언네',
      stationName: '보정역',
      dest: '롯데캐슬스카이, 이안두드림, 백남준아트센터 방면',
    },
    {
      routeId: '3',
      routeName: '이주네',
      stationName: '미금역',
      dest: '롯데캐슬스카이, 이안두드림, 백남준아트센터 방면',
    },
  ];

  const [selected, setSelected] = useState('춘시기네');

  const handleSelect: React.MouseEventHandler<HTMLDivElement> = (e) => {
    setSelected(e.currentTarget.id);
    handleCurrent(e.currentTarget.id);
  };

  const handleClickDimmed: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) handleDropdown(false);
  };

  return (
    <BaseModal className={tw('pl-0 ', className)} {...restProps}>
      <BaseModal.Content className="bottom-0 h-[620px] w-full bg-White">
        <List className="relative">
          <Link to="/">
            <TextButton className="absolute top-3 right-8 z-10 bg-White text-body2">
              편집
            </TextButton>
          </Link>
          <div className="pt-3">
            <List.Title className="text-center text-body1 font-bold">
              내 정류장 설정
            </List.Title>
          </div>
          <Link to="/" className="block text-center">
            <TextButton className="mt-3.5 mb-8 h-8 w-[320px] text-left text-body2 text-Gray-500">
              정류장 검색
            </TextButton>
          </Link>

          {data.map(({ routeId, routeName, stationName, dest }) => (
            // <MyStationCard
            //   key={routeName}
            //   routeName={routeName}
            //   stationName={stationName}
            //   dest={dest}
            //   id={`${i}`}
            //   handleSelect={handleSelect}
            //   selected={+i === selected}
            // />
            <BusCard
              key={routeId}
              id={routeName}
              className="flex flex-col items-start justify-center"
              onClick={handleSelect}
            >
              <BusCard.Info className="static left-0 flex translate-x-0 flex-row">
                <BusCard.Content className="w-28 text-body1">
                  {routeName}
                </BusCard.Content>
                <BusCard.StationName className="mb-0 flex items-center justify-center">
                  {stationName}
                </BusCard.StationName>
              </BusCard.Info>
              <BusCard.Content className="text-Gray-400">
                {dest}
              </BusCard.Content>
              {routeName === selected && <BusCard.CheckIcon isChecked />}
            </BusCard>
          ))}
        </List>
      </BaseModal.Content>
      <BaseModal.DimBg onClick={handleClickDimmed} />
    </BaseModal>
  );
}
