import { atom } from "recoil";

interface IMe {
  id: string;
  position: [number, number, number];
  nickname: string;
  jobPosition: string;
  selectedGLBIndex: number;
  myRoom: {
    objects: [];
  };
}

export interface IPlayer {
  id: string;
  position: [number, number, number];
  nickname: string;
  jobPosition: string;
  selectedGLBIndex: number;
}

export interface IChats {
  senderId: string;
  timeStamp: number;
  senderNickname: string;
  senderJobPosition: string;
  text: string;
}

export enum MapTypeEnum {
  GROUND = "GROUND",
  MYROOM = "MYROOM",
  GAMEROOM = "GAMEROOM",
}

export const MeAtom = atom<IMe | undefined>({
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

export const CurrentMyRoomAtom = atom<IMe | undefined>({
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

export const EnteredNoticeAtom = atom<IPlayer | undefined>({
  key: "EnteredPlayersAtom",
  default: undefined,
});

export const ExitedNoticeAtom = atom<IPlayer | undefined>({
  key: "ExitedPlayersAtom",
  default: undefined,
});
