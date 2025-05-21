import { ReactNode, useEffect } from "react";
import { socket } from "../../sockets/clientSocket.ts";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  ChatsAtom,
  ShownChatMessagesAtom,
  MeAtom,
  PlayersAtom,
  RecentChatsAtom,
  IChats,
  CharacterSelectFinishedAtom,
} from "../../store/PlayersAtom.ts";
import { SocketStatusAtom } from "../../store/SocketAtom.ts";

interface initializeProps {
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

interface newTextProps {
  senderId: string;
  senderNickname: string;
  senderJobPosition: string;
  text: string;
  timeStamp: number;
}

export const ClientSocketControls = (): ReactNode => {
  const [me, setMe] = useRecoilState(MeAtom);
  const setPlayers = useSetRecoilState(PlayersAtom);
  const setSocketStatus = useSetRecoilState(SocketStatusAtom);
  const setChats = useSetRecoilState(ChatsAtom);
  const setRecentChats = useSetRecoilState(RecentChatsAtom);
  const setCharacterSelectFinished = useSetRecoilState(
    CharacterSelectFinishedAtom
  );
  const shownChatMessage = useRecoilValue(ShownChatMessagesAtom);

  const handleConnect = (): void => {
    console.log("ClientSocketControls Connected");
    setSocketStatus({
      isConnected: true,
      error: null,
    });

    // 재연결 시 서버에 현재 상태 전송
    if (me) {
      socket.emit("initialize", {
        tmpNickname: me.nickname,
        tmpJobPosition: me.jobPosition,
        selectedGLBIndex: me.selectedGLBIndex,
        myRoom: { object: [] },
      });
    }
  };

  const handleDisconnect = (): void => {
    console.log("ClientSocketControls Disconnected");
    setSocketStatus({
      isConnected: false,
      error: "Socket Disconnected",
    });

    // 연결이 끊어지면 클라이언트 상태 초기화
    setPlayers([]);
    setMe(undefined);
    setChats([]);
    setRecentChats([]);
    setCharacterSelectFinished(false);
  };

  const handleReconnectAttempt = (attemptNumber: number): void => {
    console.log(`Reconnection attempt ${attemptNumber}`);
    setSocketStatus({
      isConnected: false,
      error: `재연결 시도 중... (${attemptNumber}/5)`,
    });
  };

  const handleReconnectFailed = (): void => {
    console.log("Reconnection failed");
    setSocketStatus({
      isConnected: false,
      error: "서버 연결에 실패했습니다. 페이지를 새로고침해주세요.",
    });
  };

  const handleInitialize = (value: initializeProps): void => {
    console.log(value);
    setMe(value);
    console.log("ClientSocketControls Initialized");
  };

  const handleEnter = (): void => {
    console.log("ClientSocketControls Enter");
  };

  const handleExit = (): void => {
    console.log("ClientSocketControls Exit");
  };

  const handlePlayers = (value: PlayerProps[]): void => {
    setPlayers(value);
    const newMe = value.find((p: PlayerProps) => p && me && p.id === me.id);

    if (newMe) {
      setMe({
        ...newMe,
        myRoom: { objects: [] },
      });
    }
    console.log("ClientSocketControls Players");
  };

  const handleNewText = ({
    senderId,
    senderNickname,
    senderJobPosition,
    text,
    timeStamp,
  }: newTextProps) => {
    console.log("ClientSocketControls New Text");
    const newChat: IChats = {
      senderId,
      senderNickname,
      senderJobPosition: senderJobPosition || "Unknown",
      text,
      timeStamp,
    };

    setChats((prev) => [...prev, newChat]);

    setRecentChats((prev) => {
      // 이미 표시된 채팅은 제외
      const filteredPrev = prev.filter(
        (chat) =>
          !shownChatMessage.some(
            (shownChat) =>
              shownChat.senderId === chat.senderId &&
              shownChat.timeStamp === chat.timeStamp
          )
      );

      // 새로운 채팅 추가
      return [...filteredPrev, newChat];
    });
  };

  useEffect(() => {
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("reconnect_attempt", handleReconnectAttempt);
    socket.on("reconnect_failed", handleReconnectFailed);
    socket.on("initialize", handleInitialize);
    socket.on("enter", handleEnter);
    socket.on("exit", handleExit);
    socket.on("players", handlePlayers);
    socket.on("newText", handleNewText);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("reconnect_attempt", handleReconnectAttempt);
      socket.off("reconnect_failed", handleReconnectFailed);
      socket.off("initialize", handleInitialize);
      socket.off("enter", handleEnter);
      socket.off("exit", handleExit);
      socket.off("players", handlePlayers);
      socket.off("newText", handleNewText);
    };
  }, [me, setMe, setPlayers, setChats, setRecentChats, shownChatMessage]);

  return <></>;
};
