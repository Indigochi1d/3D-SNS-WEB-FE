import { useRecoilValue } from "recoil";
import {
  CharacterSelectFinishedAtom,
  MeAtom,
} from "../../store/PlayersAtom.ts";
import MainCanvas from "./canvas/MainCanvas.tsx";
import CanvasLayout from "./canvasLayout/Layout.tsx";
import Lobby from "./lobby/Lobby.tsx";
import { SocketStatusAtom } from "../../store/SocketAtom.ts";
import NotFound from "../utilComponents/ErrorComponent/NotFound.tsx";

export const Content = () => {
  const characterSelectFinished: boolean = useRecoilValue(
    CharacterSelectFinishedAtom
  );
  const me = useRecoilValue(MeAtom);
  const socketStatus = useRecoilValue(SocketStatusAtom);
  const serverStatus = socketStatus.isConnected;

  if (characterSelectFinished && me && socketStatus.isConnected) {
    return (
      <CanvasLayout>
        <MainCanvas />
      </CanvasLayout>
    );
  }
  if (!serverStatus) {
    return <NotFound serverStatus={serverStatus} />;
  }

  return <Lobby />;
};
