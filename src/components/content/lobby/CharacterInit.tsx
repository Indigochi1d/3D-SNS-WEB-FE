import {useThree} from "@react-three/fiber";
import {Camera, Vector3} from "three";
import {useRecoilValue} from "recoil";
import {SelectedGLBIndexAtom} from "../../../store/PlayersAtom.ts";
import {MutableRefObject, useEffect, useRef} from "react";
import {OrbitControls as typeOC} from "three-stdlib";
import {OrbitControls} from "@react-three/drei";
import {Player} from "../canvas/maps/player/Player.tsx";

export const CharacterInit = () => {
    const camera : Camera = useThree(three => three.camera);
    const selectedCharacterGLBIndex : number = useRecoilValue(SelectedGLBIndexAtom);

    const controls:MutableRefObject<typeOC | null> = useRef(null);
    const nicknameRef = useRef(null);

    useEffect(() => {
        if(!controls.current?.target) return;
        camera.position.set(8,8,8);
        controls.current.target.set(0,1,0);
    },[camera.position]);
    return (
        <>
            <Player
                key={selectedCharacterGLBIndex}
                player={undefined}
                position={new Vector3(0,0,0)}
                modelIndex={selectedCharacterGLBIndex}
                nicknameRef={nicknameRef}
            />
            <OrbitControls
                ref={controls}
                minDistance={1}
                maxDistance={8}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={-Math.PI / 2}
                autoRotate={true}
            />
        </>
    )


}
