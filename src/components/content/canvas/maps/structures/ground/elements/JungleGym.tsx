import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import {Object3D, Vector3} from "three";
import {useEffect} from "react";

const name = 'ground-jungleGym';
const scale = 0.8;

const JungleGym:React.FC = () => {
    const { scene }  = useGLTF('/models/Jungle gym.glb');
    const position : Vector3 = useMemo(():Vector3 => new Vector3(-12,0,6), []);
    useEffect(() => {
       scene.traverse((mesh:Object3D) => {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
       }) 
    },[scene]);
    return (
        <primitive visible name={name} scale={scale} position={position} object={scene} />
    );
};

export default JungleGym;
