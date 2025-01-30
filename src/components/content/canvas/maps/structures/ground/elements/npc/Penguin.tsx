import { useGLTF } from "@react-three/drei";
import { useEffect,useMemo } from "react";
import { Vector3,Object3D } from "three";

const name = "ground-npc-penguin";

const Penguin :React.FC = () => {
    const {scene} = useGLTF("/models/Penguin.glb");
    const position : Vector3 = useMemo(() => new Vector3(0,1.5,-5), []);

    useEffect(() => {
        scene.traverse((mesh:Object3D) => {
            mesh.castShadow = true;
            mesh.receiveShadow = true;
        })
    }, [position,scene]);
    return (
        <>
            <primitive
                visible
                name={name}
                scale={3}
                position={position}
                object={scene}
                rotation={[0,Math.PI*3/2,0]}
            />
        </>
        
            
    );
};

export default Penguin;
