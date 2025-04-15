import { Text, RoundedBox } from "@react-three/drei";
import { Vector3 } from "three";

interface IChatBubble {
  message: string;
  position: Vector3;
}

function ChatBubble({ message, position }: IChatBubble) {
  return (
    <group position={position}>
      <RoundedBox
        args={[2.5, 1, 0.2]} // width, height, depth
        radius={0.1}
        smoothness={4}
      >
        <meshStandardMaterial color="white" />
      </RoundedBox>
      <Text
        position={[0, 0, 0.15]} // 앞쪽으로 살짝 빼줌
        fontSize={0.3}
        color="black"
        maxWidth={2.2}
        anchorX="center"
        anchorY="middle"
      >
        {message}
      </Text>
    </group>
  );
}

export default ChatBubble;
