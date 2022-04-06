import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const UserImage = atom({
  key: 'UserImage',
  default: false,
  effects_UNSTABLE: [persistAtom],

});