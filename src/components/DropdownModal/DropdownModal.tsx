import { Link } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { tw } from '@/utils/tailwindMerge';
import { BaseModal, BusCard } from '@/components';
import { userStationsState, currentStationState } from '@/state/atom';

type DropdownModalProps<T extends React.ElementType> = {
  handleDropdown: (arg: boolean) => void;
  handleCurrent?: React.Dispatch<React.SetStateAction<string>>;
} & Component<T>;

export function DropdownModal({
  children,
  className,
  handleDropdown,
  handleCurrent,
  ...restProps
}: DropdownModalProps<'div'>) {
  const userStations = useRecoilValue(userStationsState);
  const [currentStation, setCurrentStation] =
    useRecoilState(currentStationState);

  const handleSelect: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const target = (e.target as HTMLElement).closest('.truncate');
    if (target) {
      const currentSt = userStations.find(
        (station) => station.id === target?.id
      );
      setCurrentStation({
        id: target?.id,
        currentStation: currentSt?.userStationName,
      });
    }
  };

  const handleClickDimmed: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) handleDropdown(false);
  };

  return (
    <BaseModal className={tw('', className)} {...restProps}>
      <BaseModal.Content className="bottom-0 h-[620px] w-full overflow-hidden rounded-lg bg-White">
        <div className="flex flex-row justify-between pt-8 pl-6 pr-8 pb-8">
          <div className="text-body1 font-bold">내 정류장 설정</div>
          <ul className="flex gap-2 text-body2">
            <li>
              <Link to="/commute">추가</Link>
            </li>
            <li>
              <Link to="/commute/edit">편집</Link>
            </li>
          </ul>
        </div>

        {userStations.map(({ id, userStationName, stationName, routeList }) => (
          <BusCard
            key={userStationName}
            id={id}
            className="flex flex-col items-start justify-center truncate"
            onClick={handleSelect}
          >
            <BusCard.Info className="static left-0 flex translate-x-0 flex-row">
              <BusCard.Content className="w-28 text-body1">
                {userStationName}
              </BusCard.Content>
              <BusCard.StationName className="mb-0 flex items-center justify-center">
                {stationName}
              </BusCard.StationName>
            </BusCard.Info>
            <BusCard.Content className="text-Gray-400">
              {routeList}
            </BusCard.Content>
            {userStationName === currentStation?.currentStation && (
              <BusCard.CheckIcon isChecked />
            )}
          </BusCard>
        ))}
      </BaseModal.Content>
      <BaseModal.DimBg onClick={handleClickDimmed} />
    </BaseModal>
  );
}
