import {Box} from "@react-three/drei";
import {useRef} from "react";
import {useFrame} from "@react-three/fiber";
import * as THREE from 'three';

export const Player = () => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame(()=>{
        if(ref.current){
            ref.current.rotation.y += 0.01;
        }
    })
    return (
        <Box ref={ref} position-y={0.5}>
            <meshStandardMaterial color={"red"}/>
        </Box>
    )
}