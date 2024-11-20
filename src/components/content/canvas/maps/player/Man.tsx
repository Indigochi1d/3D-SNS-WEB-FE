import * as THREE from 'three'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF, SkeletonUtils } from 'three-stdlib'
import {Vector3} from "three";

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
    Character: THREE.SkinnedMesh
    Root: THREE.Bone
  }
  materials: {
    Atlas: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

interface ModelProps {
  player: {
    id: string;
    [key: string]: string;
  } | undefined;
  position: Vector3;
}


export function Man({ player, position }: ModelProps) {
  const playerId = player?.id ?? ''; // player가 undefined일 수 있으므로 조건부 접근 사용

  const memoizedPosition = useMemo(() => position, []);

  const playerRef = useRef<THREE.Group | null>(null);

  const { scene, materials, animations } = useGLTF('/models/CubeGuyCharacter.glb') as GLTFResult;

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

  return (
      <group ref={playerRef} position={memoizedPosition} name={playerId} dispose={null}>
        <group name="Root_Scene">
          <group name="RootNode">
            <group name="CharacterArmature" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
              <primitive object={nodes.Root} />
            </group>
            <skinnedMesh
                name="Character"
                geometry={nodes.Character.geometry}
                material={materials.Atlas}
                skeleton={nodes.Character.skeleton}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
            />
          </group>
        </group>
      </group>
  );
}

useGLTF.preload('/CubeGuyCharacter.glb')
