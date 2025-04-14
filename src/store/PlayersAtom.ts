import { atom } from "recoil";

interface meProps {
  id: string;
  position: [number, number, number];
  nickname: string;
  jobPosition: string;
  selectedGLBIndex: number;
  myRoom: {
    objects: [];
  };
}

interface PlayerProps {
  id: string;
  position: [number, number, number];
  nickname: string;
  jobPosition: string;
  selectedGLBIndex: number;
}

interface ChatsProps {
  senderId?: number;
  timeStamp?: Date;
  senderNickname: string;
  senderJobPosition: string;
  text: string;
}

export enum MapTypeEnum {
  GROUND = "GROUND",
  MYROOM = "MYROOM",
  GAMEROOM = "GAMEROOM",
}

export const MeAtom = atom<meProps | undefined>({
  key: "MeAtom",
  default: undefined,
});

export const CharacterSelectFinishedAtom = atom({
  key: "CharacterSelectFinishedAtom",
  default: false,
});

export const SelectedGLBIndexAtom = atom({
  key: "SelectedGLBAtom",
  default: 0,
});

export const PlayersAtom = atom<PlayerProps[]>({
  key: "PlayersAtom",
  default: [],
});

export const IsLoadCompleteAtom = atom({
  key: "IsLoadCompleteAtom",
  default: false,
});

export const CurrentMapAtom = atom<MapTypeEnum>({
  key: "CurrentMapAtom",
  default: MapTypeEnum.GROUND,
});

export const CurrentMyRoomAtom = atom<meProps | undefined>({
  key: "CurrentMyRoomAtom",
  default: undefined,
});

export const ChatsAtom = atom<ChatsProps[]>({
  key: "ChatsAtom",
  default: [],
});
