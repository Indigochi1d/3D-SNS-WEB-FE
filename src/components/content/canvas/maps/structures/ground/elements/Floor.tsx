import {useLoader} from "@react-three/fiber";
import {RepeatWrapping, TextureLoader} from "three";
import {GROUND_MAPSIZE} from "../../../../../../../data/constants.ts";
import {socket} from "../../../../../../../sockets/clientSocket.ts";

const Floor = () => {
    const sandTexture = useLoader(TextureLoader, "/images/sand.jpg");
    sandTexture.wrapS = RepeatWrapping;
    sandTexture.wrapT = RepeatWrapping;
    sandTexture.repeat.x = 5;
    sandTexture.repeat.y = 5;
    return (
        <mesh
            castShadow
            receiveShadow
            rotation-x={-Math.PI / 2}
            position-y={-0.001}
            onPointerUp={(e)=>{
                socket.emit("move",[e.point.x,0,e.point.z]);
            }}
        >
            <planeGeometry args={[GROUND_MAPSIZE,GROUND_MAPSIZE]} />
            <meshStandardMaterial map={sandTexture}/>
        </mesh>
    );
};

export default Floor;
