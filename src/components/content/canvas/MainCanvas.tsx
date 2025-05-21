import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { RootMap } from "./maps/RootMap.tsx";
import { useRecoilValue } from "recoil";
import { SocketStatusAtom } from "../../../store/SocketAtom";
import Lobby from "../lobby/Lobby";
import styled from "styled-components";

const ReconnectMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  z-index: 1000;
`;

const MainCanvas = () => {
  const aspectRatio: number = window.innerWidth / window.innerHeight;
  const socketStatus = useRecoilValue(SocketStatusAtom);

  if (!socketStatus.isConnected) {
    return (
      <>
        <Lobby />
        <ReconnectMessage>
          <h2>연결이 끊어졌습니다</h2>
          <p>페이지를 새로고침하여 재접속해주세요.</p>
        </ReconnectMessage>
      </>
    );
  }

  return (
    <Canvas
      id="canvas"
      gl={{ antialias: true }}
      shadows
      camera={{
        fov: 30,
        aspect: aspectRatio,
        near: 0.01,
        far: 100000,
        position: [12, 12, 12],
      }}
    >
      <ambientLight intensity={5} name="ambientLight" />
      <directionalLight
        castShadow
        intensity={5}
        position={[0, 50, -50]}
        shadow-normalBias={0.1}
        shadow-bias={-0.001}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
        shadow-camera-near={0.1}
        shadow-camera-far={200}
      />
      <OrbitControls enabled={socketStatus.isConnected} />
      <RootMap />
    </Canvas>
  );
};

export default MainCanvas;
