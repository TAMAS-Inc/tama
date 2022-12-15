import { useRecoilState } from 'recoil';
import { commutesState } from "@/state/atom";

export const useCommutes = () => {
  const [commutes, setCommutes] = useRecoilState(commutesState)
  const addCommute = (commute: Commute) => { 
    setCommutes(prev => [...prev, commute])
  }

  return {commutes, addCommute}
}