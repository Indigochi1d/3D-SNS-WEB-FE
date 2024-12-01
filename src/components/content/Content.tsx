import {useRecoilValue} from "recoil";
import {CharacterSelectFinishedAtom, MeAtom} from "../../store/PlayersAtom.ts";
import MainCanvas from "./canvas/MainCanvas.tsx";
import CanvasLayout from "./canvasLayout/Layout.tsx";
import Lobby from "./lobby/Lobby.tsx";


export const Content = () => {
    const characterSelectFinished: boolean = useRecoilValue(CharacterSelectFinishedAtom);
    const me = useRecoilValue(MeAtom);

    if (characterSelectFinished && me) {
        return (
            <CanvasLayout>
                <MainCanvas />
            </CanvasLayout>
        )
    }

    return <Lobby/>;

}