import { atom } from "recoil";

interface Ime {
  id: string;
  position: [number, number, number];
  nickname: string;
  jobPosition: string;
  selectedGLBIndex: number;
  myRoom: {
    objects: [];
  };
}

interface IPlayer {
  id: string;
  position: [number, number, number];
  nickname: string;
  jobPosition: string;
  selectedGLBIndex: number;
}

interface IChats {
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

export const MeAtom = atom<Ime | undefined>({
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

export const PlayersAtom = atom<IPlayer[]>({
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

export const CurrentMyRoomAtom = atom<Ime | undefined>({
  key: "CurrentMyRoomAtom",
  default: undefined,
});

export const ChatsAtom = atom<IChats[]>({
  key: "ChatsAtom",
  default: [],
});

export const RecentChatsAtom = atom<IChats[]>({
  key: "RecentChatsAtom",
  default: [],
});

export const ShownChatMessagesAtom = atom<IChats[]>({
  key: "ShownChatMessagesAtom",
  default: [],
});
