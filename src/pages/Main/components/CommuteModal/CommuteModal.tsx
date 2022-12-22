import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BaseModal, BusCard } from '@/components';
import { currentComIdState, userState } from '@/state/atom';
import { tw } from '@/utils/tailwindMerge';
import { useCommutes } from '@/hooks/useCommutes';
import { animatedBaseModal } from '../../../../constants/style';

type CommuteModalProps<T extends React.ElementType> = {
  isModalOpen: boolean;
  onDimBgClick: React.MouseEventHandler<HTMLDivElement>;
  handleCurrent?: React.Dispatch<React.SetStateAction<string>>;
} & Component<T>;

export function CommuteModal({
  children,
  className,
  isModalOpen,
  onDimBgClick: handleDimBgClick,
  handleCurrent,
  ...restProps
}: CommuteModalProps<'div'>) {
  const navigate = useNavigate();

  const user = useRecoilValue(userState);
  const { createNewCommute } = useCommutes();

  const [currentComId, setCurrentComId] = useRecoilState(currentComIdState);

  const handleBusCardClick = (id: Commute['comId']) => {
    setCurrentComId(id);
  };

  const addCommute = () => {
    const newComId = createNewCommute('우리 집');
    navigate(`/commute/edit/${newComId}`);
  };

  return (
    <BaseModal className={tw('', className)} {...restProps}>
      <BaseModal.Content
        className={tw(
          'bottom-0 h-[620px] w-full overflow-hidden rounded-lg bg-White',
          animatedBaseModal,
          isModalOpen ? 'translate-y-0' : 'translate-y-[1800px]'
        )}
      >
        <div className="flex flex-row justify-between pt-8 pl-6 pr-8 pb-8">
          <div className="text-body1 font-bold">내 정류장 설정</div>
          <ul className="flex gap-2 text-body2">
            <li>
              <button type="button" onClick={addCommute}>
                추가
              </button>
            </li>
            <li>
              <Link to="/commute/edit">편집</Link>
            </li>
          </ul>
        </div>

        {user.commutes.map(({ comId, comName, station, routes }: Commute) => (
          <BusCard
            key={comId}
            id={comId}
            className="flex cursor-pointer flex-col items-start justify-center truncate"
            onClick={() => handleBusCardClick(comId)}
          >
            <BusCard.Info className="static left-0 flex translate-x-0 flex-row">
              <BusCard.Content className="mr-4 w-28 truncate text-body1">
                {comName}
              </BusCard.Content>
              <BusCard.StationName className="mb-0 w-40 truncate pt-1 pl-4 text-body2">
                {(station as Station).stationName}
              </BusCard.StationName>
            </BusCard.Info>
            <BusCard.Content className="w-40 whitespace-pre-wrap text-Gray-400">
              {routes.flatMap(({ routeName }) => routeName).join(', ')}
            </BusCard.Content>
            {comId === currentComId && <BusCard.CheckIcon isChecked />}
          </BusCard>
        ))}
      </BaseModal.Content>
      <BaseModal.DimBg
        onClick={handleDimBgClick}
        className={tw(isModalOpen ? '' : 'hidden')}
      />
    </BaseModal>
  );
}
