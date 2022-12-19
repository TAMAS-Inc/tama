import { atom, DefaultValue, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { v4 as uuid } from 'uuid';

const { persistAtom } = recoilPersist({ key: 'current' });

export const userState = atom<User>({
  key: 'userState',
  default: {
    userId: uuid(),
    commutes: [],
    agreement: { allowLocation: false, allowMarketing: false },
    currentComId: '',
    editing: {
      comId: '',
      comName: '',
      station: null,
      routes: [],
    },
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
    return user.commutes.length !== 0;
  },
});

export const isCommuteValidState = selector({
  key: 'isCommuteValidState',
  get: ({ get }) => {
    const user = get(userState);
    return (
      user.commutes.filter(
        (commute) => commute.station && commute.routes.length !== 0
      ).length !== 0
    );
  },
});

export const editingState = selector({
  key: 'editingState',
  get: ({ get }) => {
    const user = get(userState);
    return user.editing;
  },
  set: ({ set, reset }, newValue) => {
    if (newValue instanceof DefaultValue) {
      reset(userState);
    } else {
      set(userState, (user) => ({
        ...user,
        editing: newValue,
      }));
    }
  },
});
