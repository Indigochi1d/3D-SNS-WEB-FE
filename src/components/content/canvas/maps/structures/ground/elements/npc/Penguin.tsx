import { useGLTF } from "@react-three/drei";
import { MutableRefObject, useEffect,useMemo, useRef } from "react";
import { Vector3,Object3D,Group } from "three";
import { NickNameBoard } from "../../3dUIs/NickNameBoard";

const name = "ground-npc-penguin";

const Penguin :React.FC = () => {
    const ref:MutableRefObject<Group|null> = useRef(null);
    const nameRef:MutableRefObject<Group|null> = useRef(null);
    
    const {scene} = useGLTF("/models/Penguin.glb");
    const position : Vector3 = useMemo(() => new Vector3(0,1.5,-5), []);

    useEffect(() => {
        if(!ref.current || !nameRef.current) return;
        nameRef.current.position.set(
            ref.current.position.x,
            ref.current.position.y+2,
            ref.current.position.z
        );
        scene.traverse((mesh:Object3D) => {
            mesh.castShadow = true;
            mesh.receiveShadow = true;
        })
    }, [position,scene]);
    return (
        <>
            <NickNameBoard ref={nameRef}text="펭돌이" isNpc={true}/>
            <primitive
                ref={ref}
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
