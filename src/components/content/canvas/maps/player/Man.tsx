import {useGLTF} from '@react-three/drei'
import {usePlayer} from "./hooks/usePlayer.ts";
import {Vector3} from "three";

interface ModelProps{
    player: {
        id: string;
        selectedGLBIndex:number
    } | undefined;
    position: Vector3;
    modelIndex:number;
}
export function Man({player, position, modelIndex}:ModelProps) {
    const {playerRef, memoizedPosition, playerId, nodes, materials} = usePlayer(
        {
            player,
            position,
            modelIndex: modelIndex ?? player?.selectedGLBIndex
        }
    )
    return (
        <group ref={playerRef} position={memoizedPosition} name={playerId} dispose={null}>
            <group name="Root_Scene">
                <group name="RootNode">
                    <group name="CharacterArmature" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                        <primitive object={nodes.Root}/>
                    </group>
                    <skinnedMesh
                        name="Character"
                        geometry={nodes.Character.geometry}
                        material={materials.Atlas}
                        skeleton={nodes.Character.skeleton}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                        receiveShadow
                        castShadow
                    />
                </group>
            </group>
        </group>
    );
}

useGLTF.preload('/CubeGuyCharacter.glb')
