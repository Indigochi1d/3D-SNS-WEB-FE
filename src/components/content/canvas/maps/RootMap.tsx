// 모든 맵의 Root역할을 할 컴포넌트

import {GroundElements} from "./structures/ground";
import {useRecoilState, useRecoilValue} from "recoil";
import {CharacterSelectFinishedAtom, PlayersAtom} from "../../../../store/PlayersAtom.ts";
import {CharacterInit} from "../../lobby/CharacterInit.tsx";
import {useThree} from "@react-three/fiber";
import {MutableRefObject, useEffect, useRef} from "react";
import {OrbitControls as typeOC} from "three-stdlib";
import {Vector3} from "three";
import { Player } from "./player/Player.tsx";


export const RootMap = () => {
    const characterSelectFinished = useRecoilValue(CharacterSelectFinishedAtom);
    const camera = useThree(three => three.camera);
    const [players] = useRecoilState(PlayersAtom);
    const controls: MutableRefObject<typeOC | null> = useRef(null);
    useEffect(() => {
        if (!controls.current) return;
        camera.position.set(14, 14, 14)
        controls.current.target.set(0, 0, 0);
    }, [camera.position])

    const nicknameRef = useRef(null);

    return (
        <>
            {!characterSelectFinished ?
                <CharacterInit/> :
                (
                    <>
                        <GroundElements/>
                        {players.map((player) => {
                           return(
                            <Player
                                key={player.id}
                                player={player}
                                position={new Vector3(player.position[0],player.position[1],player.position[2])}
                                modelIndex={player.selectedGLBIndex}
                                nicknameRef={nicknameRef}
                                />

                           )
                        })}
                    </>
                )

            }
        </>
    )
}
