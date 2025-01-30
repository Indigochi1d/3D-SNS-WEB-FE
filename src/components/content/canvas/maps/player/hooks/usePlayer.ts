import {MutableRefObject, useEffect, useMemo, useRef, useState} from "react";
import * as THREE from "three";
import {useAnimations, useGLTF} from "@react-three/drei";
import {GLTF, SkeletonUtils} from "three-stdlib";
import {useGraph,useFrame, RootState} from "@react-three/fiber";
import {Vector3} from "three";
import { useRecoilValue } from "recoil";
import { MeAtom } from "../../../../../../store/PlayersAtom";

type ActionName =
    | 'CharacterArmature|CharacterArmature|CharacterArmature|Death'
    | 'CharacterArmature|CharacterArmature|CharacterArmature|Duck'
    | 'CharacterArmature|CharacterArmature|CharacterArmature|HitReact'
    | 'CharacterArmature|CharacterArmature|CharacterArmature|Idle'
    | 'CharacterArmature|CharacterArmature|CharacterArmature|Idle_Attack'
    | 'CharacterArmature|CharacterArmature|CharacterArmature|Idle_Hold'
    | 'CharacterArmature|CharacterArmature|CharacterArmature|Jump'
    | 'CharacterArmature|CharacterArmature|CharacterArmature|Jump_Idle'
    | 'CharacterArmature|CharacterArmature|CharacterArmature|Jump_Land'
    | 'CharacterArmature|CharacterArmature|CharacterArmature|No'
    | 'CharacterArmature|CharacterArmature|CharacterArmature|Punch'
    | 'CharacterArmature|CharacterArmature|CharacterArmature|Run'
    | 'CharacterArmature|CharacterArmature|CharacterArmature|Run_Attack'
    | 'CharacterArmature|CharacterArmature|CharacterArmature|Run_Hold'
    | 'CharacterArmature|CharacterArmature|CharacterArmature|Walk'
    | 'CharacterArmature|CharacterArmature|CharacterArmature|Walk_Hold'
    | 'CharacterArmature|CharacterArmature|CharacterArmature|Wave'
    | 'CharacterArmature|CharacterArmature|CharacterArmature|Yes'


interface GLTFAction extends THREE.AnimationClip {
    name: ActionName
}

type GLTFResult = GLTF & {
    nodes: {
        Character: THREE.SkinnedMesh,
        Root: THREE.Bone
    }
    materials: {
        Atlas: THREE.MeshStandardMaterial,
        "Atlas.001"?: THREE.MeshStandardMaterial
    }
    animations: GLTFAction[]
}

interface ModelProps {
    player: {
        id: string;
    } | undefined;
    position: Vector3;
    modelIndex:number;
}

export const usePlayer = ({ player, position,modelIndex }: ModelProps) => {
    const playerId = player?.id ?? ''; // player가 undefined일 수 있으므로 조건부 접근 사용
    const me = useRecoilValue(MeAtom);

    const memoizedPosition = useMemo(() => position, []);

    const playerRef:MutableRefObject<THREE.Group|null> = useRef<THREE.Group | null>(null);
    const nicknameRef:MutableRefObject<THREE.Group|null> = useRef(null);

    const { scene, materials, animations } = useGLTF(
        (()=>{
                switch (modelIndex){
                    case 0:
                        return "/models/CubeGuyCharacter.glb"
                    case 1:
                        return "/models/Steve.glb"
                    case 2:
                        return "/models/CubeWomanCharacter.glb"
                    default:
                        return "";
                }
            })()
    ) as GLTFResult;


    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);

    const objectMap = useGraph(clone) as GLTFResult;
    const nodes = objectMap.nodes;

    const [animation, setAnimation] = useState<ActionName>(
        `CharacterArmature|CharacterArmature|CharacterArmature|Idle`,
    );

    const { actions } = useAnimations(animations, playerRef);
    

    useEffect(() => {
        actions[animation]?.reset().fadeIn(0.5).play();
        return () => {
            actions[animation]?.fadeOut(0.5);
        };
    }, [actions, animation]);


    useFrame(({camera}:RootState)=>{
        if(!player) return;
        if(!playerRef.current) return;
        if(playerRef.current.position.distanceTo(position) > 0.1){
            const direction = playerRef.current.position.clone().sub(position).normalize().multiplyScalar(0.04);
            playerRef.current.position.sub(direction);
            playerRef.current.lookAt(position);
            setAnimation("CharacterArmature|CharacterArmature|CharacterArmature|Run");
        }
        else{
            setAnimation("CharacterArmature|CharacterArmature|CharacterArmature|Idle");
        }

        if(nicknameRef.current){
            nicknameRef.current.position.set(
                playerRef.current.position.x,
                playerRef.current.position.y+3,
                playerRef.current.position.z,
            );
            nicknameRef.current.lookAt(10000,10000,10000);
        }
        if(me?.id === player.id&&camera){
            camera.position.set(
                playerRef.current.position.x+12,
                playerRef.current.position.y+12,
                playerRef.current.position.z+12,
            )
            camera.lookAt(playerRef.current.position);
        }
    });
    return {me,playerRef,nicknameRef,memoizedPosition,playerId,nodes,materials};
}
