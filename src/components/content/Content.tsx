import {useRecoilValue} from "recoil";
import {CharacterSelectFinishedAtom, MeAtom} from "../../store/PlayersAtom.ts";
import MainCanvas from "./canvas/MainCanvas.tsx";
import CanvasLayout from "./canvasLayout/Layout.tsx";
import Lobby from "./lobby/Lobby.tsx";
import {SocketStatusAtom} from "../../store/SocketAtom.ts";
import ServerOffline from "../utilComponents/ErrorComponent/ServerOffline.tsx";

export const Content = () => {
    const characterSelectFinished: boolean = useRecoilValue(CharacterSelectFinishedAtom);
    const me = useRecoilValue(MeAtom);
    const socketStatus = useRecoilValue(SocketStatusAtom);

    if (characterSelectFinished && me && socketStatus.isConnected) {
        return (
            <CanvasLayout>
                <MainCanvas />
            </CanvasLayout>
        )
    }
    if(!socketStatus.isConnected){
        return(
            <ServerOffline/>
        )
    }
    
    return <Lobby/>;

}
