import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

type CurrentStation = {
  id: string;
  currentStation?: string;
};

type UserStations = {
  id: string;
  userStationName: string;
  stationName: string;
  routeList: string;
};

const { persistAtom } = recoilPersist({ key: 'current' });

export const currentStationState = atom<CurrentStation | null>({
  key: `currentStationState`,
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const userStationsState = atom<UserStations[] | never[]>({
  key: `userStationState`,
  default: [],
  effects_UNSTABLE: [persistAtom],
});
