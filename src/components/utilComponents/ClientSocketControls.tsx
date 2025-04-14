import { ReactNode, useEffect } from "react";
import { socket } from "../../sockets/clientSocket.ts";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ChatsAtom, MeAtom, PlayersAtom } from "../../store/PlayersAtom.ts";
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
  senderId: number;
  senderNickname: string;
  senderJobPosition: string;
  text: string;
  timeStamp: Date;
}

export const ClientSocketControls = (): ReactNode => {
  const [me, setMe] = useRecoilState(MeAtom);
  const setPlayers = useSetRecoilState(PlayersAtom);
  const setSocketStatus = useSetRecoilState(SocketStatusAtom);
  const setChats = useSetRecoilState(ChatsAtom);

  const handleConnect = (): void => {
    console.log("ClientSocketControls Connected");
    setSocketStatus({
      isConnected: true,
      error: null,
    });
  };

  const handleDisconnect = (): void => {
    console.log("ClientSocketControls Disconnected");
    setSocketStatus({
      isConnected: false,
      error: "Socket Disconnected",
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
    setChats((prev) => [
      ...prev,
      {
        senderId,
        senderNickname,
        senderJobPosition: senderJobPosition || "Unknown",
        text,
        timeStamp,
      },
    ]);
  };

  useEffect(() => {
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("initialize", handleInitialize);
    socket.on("enter", handleEnter);
    socket.on("exit", handleExit);
    socket.on("players", handlePlayers);
    socket.on("newText", handleNewText);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("initialize", handleInitialize);
      socket.off("enter", handleEnter);
      socket.off("exit", handleExit);
      socket.off("players", handlePlayers);
      socket.off("newText", handleNewText);
    };
  }, []);
  return <></>;
};
