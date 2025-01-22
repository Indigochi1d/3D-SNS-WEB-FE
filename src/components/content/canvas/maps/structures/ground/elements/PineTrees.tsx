import {useGLTF} from '@react-three/drei';
import {useEffect, useMemo} from 'react';
import { SkeletonUtils } from 'three-stdlib';

const name = 'ground-pineTrees';
const scale = 15;


interface PineTreesProps {
    position: [number, number, number];
}


const PineTrees:React.FC<PineTreesProps> = ({position}:PineTreesProps) => {
    const {scene:scene_} = useGLTF('/models/Pine Trees.glb');
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

export default PineTrees;
