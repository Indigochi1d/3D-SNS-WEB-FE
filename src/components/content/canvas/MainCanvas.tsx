import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {Player} from "./maps/player";
import {RootMap} from "./maps/RootMap.tsx";

const MainCanvas = () => {
    const aspectRatio: number = window.innerWidth / window.innerHeight;
    return (
        <Canvas
            id="canvas"
            gl={{antialias: true}}
            shadows
            camera={{
                fov: 30,
                aspect: aspectRatio,
                near: 0.01,
                far: 100000,
                position: [12, 12, 12]
            }}
        >
            <ambientLight intensity={5} name="ambientLight"/>
            <directionalLight
                castShadow
                intensity={5}
                position={[0, 50, -50]}
                shadow-normalBias={[0, 1]}
                shadow-camera-left={-25}
                shadow-camera-right={25}
                shadow-camera-top={25}
                shadow-camera-bottom={-25}
                shadow-camera-near={0.1}
                shadow-camera-far={200}
            />
            <OrbitControls/>
            <Player/>
            <RootMap/>
        </Canvas>
    );
};

export default MainCanvas;