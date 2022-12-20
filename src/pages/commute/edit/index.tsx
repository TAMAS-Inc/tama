import { Link } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import { tw } from '@/utils/tailwindMerge';
import { BusCard, NavigationHeader, TextButton } from '@/components';
import { commutesState, currentComIdState } from '@/state/atom';
import { ConfirmDeleteModal } from '../components';
import { useCommutes } from '@/hooks/useCommutes';

type EditProps<T extends React.ElementType> = Component<T>;

export default function Edit({
  children,
  className,
  ...restProps
}: EditProps<'div'>) {
  const [currentComId, setCurrentComId] = useRecoilState(currentComIdState);
  const commute = useRecoilValue(commutesState);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<Commute['comId']>('');
  const { deleteCommute, resetEditing } = useCommutes();

  useEffect(() => {
    resetEditing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteClick = () => {
    deleteCommute(deleteId);
    setIsConfirmModalOpen(false);
  };

  const handleCancelClick = () => {
    setIsConfirmModalOpen(false);
  };

  return (
    <div className={tw('', className)} {...restProps}>
      <NavigationHeader>내 출근길 관리</NavigationHeader>
      {commute.map(({ comId, comName, station, routes }) => (
        <BusCard
          key={comId}
          id={comName}
          className="flex h-28 flex-col items-start justify-between py-3"
          onClick={() => {
            setCurrentComId(comId);
          }}
        >
          <div>
            <BusCard.Info className="static left-0 flex translate-x-0 flex-row">
              <BusCard.Content className="w-28 text-body1 line-clamp-1">
                {comName}
              </BusCard.Content>
              <BusCard.StationName className="mb-0 flex items-center justify-center">
                {station?.stationName}
              </BusCard.StationName>
            </BusCard.Info>
            <BusCard.Content className="text-Gray-400">
              {routes.map((route) => route.routeName).join(', ')}
            </BusCard.Content>
          </div>
          {comId === currentComId && (
            <BusCard.CheckIcon className="bottom-2" isChecked />
          )}
          <ul className="flex gap-4">
            <li>
              <Link to={`/commute/edit/${comId}`}>
                <TextButton>수정</TextButton>
              </Link>
            </li>
            {comId !== currentComId && (
              <li>
                <TextButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsConfirmModalOpen(true);
                    setDeleteId(comId);
                  }}
                >
                  삭제
                </TextButton>
              </li>
            )}
          </ul>
        </BusCard>
      ))}
      {isConfirmModalOpen && (
        <ConfirmDeleteModal
          onCancelClick={handleCancelClick}
          onDeleteClick={handleDeleteClick}
        />
      )}
    </div>
  );
}
