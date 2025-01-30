import {useGLTF} from '@react-three/drei'
import {usePlayer} from "./hooks/usePlayer.ts";
import {Vector3,Group} from "three";
import {RefObject} from "react";
import { NickNameBoard } from '../structures/ground/3dUIs/NickNameBoard.tsx';

interface ModelProps{
    player: {
        id: string;
        selectedGLBIndex:number
        nickname:string
        jobPosition:string
    } | undefined;
    nicknameRef?: RefObject<Group>;
    position: Vector3;
    modelIndex:number;
}
export function Player({player, position, modelIndex:mIdx}:ModelProps) {
    const modelIndex :number = mIdx ?? player?.selectedGLBIndex;
    const {me,playerRef,nicknameRef, memoizedPosition, playerId, nodes, materials} = usePlayer(
        {
            player,
            position,
            modelIndex
        }
    )
    return (
        <>
            {me && (
                <NickNameBoard ref={nicknameRef} text={`${player?.nickname}[${player?.jobPosition}]`} isNpc={false}/>
            )}
            <group ref={playerRef} position={memoizedPosition} name={playerId} dispose={null}>
            <group name="Root_Scene">
                <group name="RootNode">
                    <group name="CharacterArmature" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                        <primitive object={nodes.Root}/>
                    </group>
                    <skinnedMesh
                        name="Character"
                        geometry={nodes.Character.geometry}
                        material={modelIndex === 1 ? materials["Atlas.001"] : materials.Atlas}
                        skeleton={nodes.Character.skeleton}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                        receiveShadow
                        castShadow
                    />
                    </group>
                </group>
            </group>
        </>
        
    );
}

useGLTF.preload('/CubeGuyCharacter.glb');
