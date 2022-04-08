import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const User = atom({
  key: 'User',
  default: false,
  effects_UNSTABLE: [persistAtom],

});