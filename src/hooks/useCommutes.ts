import { useRecoilState, useSetRecoilState } from 'recoil';
import { v4 as uuid } from 'uuid';
import { commutesState, editingState, currentComIdState } from '@/state/atom';

export const useCommutes = () => {
  const [commutes, setCommutes] = useRecoilState(commutesState);
  const setComId = useSetRecoilState(currentComIdState);
  const [editing, setEditing] = useRecoilState(editingState);
  type CreateNewCommute = (defaultComName: string) => Commute['comId'];
  type AddCommute = (newCommute: Commute) => void;
  type DeleteCommute = (comId: Commute['comId']) => Commute[];
  type EditCommute = (newValue: Commute) => void;
  type ResetEdit = () => void;

  const createNewCommute: CreateNewCommute = (defaultComName = '') => {
    const comId = uuid();
    setEditing(() => ({
      comId,
      comName: defaultComName,
      station: null,
      routes: [],
    }));
    return comId;
  };

  const resetEditing: ResetEdit = () => {
    setEditing({
      comId: '',
      comName: '',
      station: null,
      routes: [],
    });
  };

  const addCommute: AddCommute = (newCommute) => {
    setCommutes((prev) => [
      ...prev.filter((p) => p.comId !== newCommute.comId),
      editing,
    ]);
    setComId(newCommute.comId);
    resetEditing();
  };

  const deleteCommute: DeleteCommute = (comId) => {
    setCommutes((prev) => prev.filter((p) => p.comId !== comId));
    return commutes;
  };

  const editCommute: EditCommute = (newValue) => {
    setEditing((prev) => ({ ...prev, ...newValue }));
  };

  return {
    commutes,
    editing,
    createNewCommute,
    addCommute,
    deleteCommute,
    editCommute,
    resetEditing,
  };
};
