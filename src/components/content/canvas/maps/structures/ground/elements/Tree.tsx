import {useGLTF} from '@react-three/drei';
import {useEffect, useMemo} from 'react';
import { SkeletonUtils } from 'three-stdlib';

const name = 'ground-tree';
const scale = 1;


interface TreeProps {
    position: [number, number, number];
}


const Tree:React.FC<TreeProps> = ({position}:TreeProps) => {
    const {scene:scene_} = useGLTF('/models/Tree.glb');
    const scene = useMemo(() => {
        return SkeletonUtils.clone(scene_);
    },[]);
    useEffect(() => {
        scene.traverse((mesh) => {
            mesh.castShadow = true;
            mesh.receiveShadow = true;
        });
    },[scene]);

    return (
        <primitive visible name={name} scale={scale} position={position} object={scene} rotation-y={Math.PI/4} />
    );
};

export default Tree;
