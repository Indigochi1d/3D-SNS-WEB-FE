import { useGLTF } from "@react-three/drei";
import { useMemo,useEffect } from "react";
import { Vector3,Object3D} from "three";

const name = 'ground-swing';
const scale = 0.05;

const Swing : React.FC = () => {
    const {scene} = useGLTF('/models/Swing.glb');
    const position:Vector3 = useMemo(() =>  new Vector3(8,0,8), []);
    useEffect(() => {
        scene.traverse((mesh:Object3D) => {
            mesh.castShadow = true;
            mesh.receiveShadow = true;
        });
    },[scene])

    return (
       <primitive visible name={name} object={scene} position={position} scale={scale} />
    );
};

export default Swing;
