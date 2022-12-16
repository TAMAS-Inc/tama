import { useRecoilState } from 'recoil';
import { v4 as uuid } from 'uuid';
import { commutesState } from '@/state/atom';

export const useCommutes = () => {
  const [commutes, setCommutes] = useRecoilState(commutesState);
  type CreateNewCommute = () => Commute['comId'];
  type EditCommute = (comId: Commute['comId'], newValue: Commute) => void;

  const createNewCommute: CreateNewCommute = () => {
    const comId = uuid();
    setCommutes((prev) => [
      ...prev,
      {
        comId,
        comName: '춘식이네',
        station: null,
        routes: [],
      },
    ]);
    return comId;
  };

  const editCommute: EditCommute = (comId, newValue) => {
    setCommutes((prev) =>
      prev.map((p) => {
        if (p.comId !== comId) return p;
        return newValue;
      })
    );
  };

  return { commutes, createNewCommute, editCommute };
};
