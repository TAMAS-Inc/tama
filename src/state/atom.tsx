
import { atom, DefaultValue, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { v4 as uuid } from 'uuid';

const dummyRoutes: Route[] = [
  {
    routeId: '228000176',
    routeName: '5001',
  },
  {
    routeId: '228000389',
    routeName: '5003A',
  },
];

const dummyStation: Station = {
  stationId: '228000682',
  stationName: '기흥역',
};

const dummyCommutes: Commute[] = [
  {
    comId: 'bd8d8bce-40a3-44ed-b830-21e67cce7ebb',
    comName: '우리 집',
    station: dummyStation,
    routes: dummyRoutes,
  },
  {
    comId: 'db7d8bce-40a3-44ed-b830-21e67eec7ebb',
    comName: '다른 집',
    station: dummyStation,
    routes: dummyRoutes,
  },
];

export const dummyUser: User = {
  userId: 'bd8d8bce-40a3-44ed-b830-21e67cce7ebb',
  commutes: dummyCommutes,
  agreement: { allowLocation: true, allowMarketing: false },
  currentComId: 'bd8d8bce-40a3-44ed-b830-21e67cce7ebb',
};

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
export const newCommuteState = atom<Commute>({
  key: 'userState',
  default: {
      comId: uuid(),
      comName: '춘식이네',
      station: {
        stationId: '',
        stationName: '정류장 선택',
      },
      routes: []
    }
});

export const userState = atom<User>({
  key: 'userState',
  default: {
    userId: null,
    commutes: [],
    agreement: { allowLocation: false, allowMarketing: false },
    currentComId: '',
  },
  effects_UNSTABLE: [persistAtom],
});

export const commutesState = selector({
  key: 'commutesState',
  get: ({ get }) => {
    const user = get(userState);
    return user.commutes;
  },
  set: ({ set, reset }, newValue) => {
    if (newValue instanceof DefaultValue) {
      reset(userState);
    } else {
      set(userState, (user) => ({
        ...user,
        commutes: newValue,
      }));
    }
  },
});

export const currentComIdState = selector({
  key: 'currentComIdState',
  get: ({ get }) => {
    const user = get(userState);
    return user.currentComId;
  },
  set: ({ set, reset }, newValue) => {
    if (newValue instanceof DefaultValue) {
      reset(userState);
    } else {
      set(userState, (user) => ({
        ...user,
        currentComId: newValue,
      }));
    }
  },
});

export const agreementState = selector({
  key: 'agreementState',
  get: ({ get }) => {
    const user = get(userState);
    return user.agreement;
  },
  set: ({ set, reset }, newValue) => {
    if (newValue instanceof DefaultValue) {
      reset(userState);
    } else {
      set(userState, (user) => ({
        ...user,
        agreement: newValue,
      }));
    }
  },
});

export const currentCommuteState = selector({
  key: 'currentCommuteState',
  get: ({ get }) => {
    const user = get(userState);
    const current = user.commutes.find((c) => c.comId === user.currentComId);
    if (!current)
      throw new Error('올바르지 않은 CommuteId가 포함되어있습니다!');
    return current;
  },
});
export const isUserValidState = selector({
  key: 'isUserValidState',
  get: ({ get }) => {
    const user = get(userState);
    return user.userId !== null;
  },
});
