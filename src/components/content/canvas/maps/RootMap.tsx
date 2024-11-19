// 모든 맵의 Root역할을 할 컴포넌트

import {GroundElements} from "./structures/ground";
import {useRecoilValue} from "recoil";
import {CharacterSelectFinishedAtom} from "../../../../store/PlayersAtom.ts";
import {CharacterInit} from "../../lobby/CharacterInit.tsx";

export const RootMap = () => {
    const characterSelectFinished = useRecoilValue(CharacterSelectFinishedAtom);

    return (
        <>
            {!characterSelectFinished ? <CharacterInit/> : <GroundElements/>}
    </>
    )
}