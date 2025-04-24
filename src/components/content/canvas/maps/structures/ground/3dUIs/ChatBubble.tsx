import { Text, RoundedBox } from "@react-three/drei";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  MeAtom,
  RecentChatsAtom,
  ShownChatMessagesAtom,
} from "../../../../../../../store/PlayersAtom";
import { useCallback, useEffect, useState } from "react";
import { IPlayer, IChats } from "../../../../../../../store/PlayersAtom";
import { useAnimatedText } from "../../../../../../hooks/useAnimatedText";

interface IChatBubble {
  chat: IChats | undefined;
  player: IPlayer;
}

function ChatBubble({ player, chat }: IChatBubble) {
  const setRecentChats = useSetRecoilState(RecentChatsAtom);
  const setShownChatMessage = useSetRecoilState(ShownChatMessagesAtom);
  const me = useRecoilValue(MeAtom);
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    if (chat) {
      setVisible(true);
    }
  }, [chat]);

  const registerShownChat = useCallback(() => {
    if (!chat) return;
    setShownChatMessage((prev) => [...prev, chat]);
  }, [chat, setShownChatMessage]);

  const displayText = useAnimatedText({
    text:
      (chat?.text.length ?? 0) > 30
        ? `${chat?.text.slice(0, 30)}`
        : `${chat?.text}`,
    once: true,
    callbackFunc: registerShownChat,
  });

  useEffect(() => {
    if (!chat) return;
    setVisible(true);
    const timeout = setTimeout(() => {
      setRecentChats((prev) => {
        return prev.filter(
          (recentChat) =>
            recentChat.timeStamp !== chat?.timeStamp &&
            recentChat.senderId !== chat?.senderId
        );
      });
      setVisible(false);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [chat, setRecentChats]);

  if (!chat?.text || !visible) return null;

  return (
    <group
      position={[
        player.position[0],
        player.position[1] + 4,
        player.position[2],
      ]}
      name={`chat-bubble-RoundedBox-${player.id}`}
      visible={visible}
    >
      <RoundedBox
        args={[2.5, 1.3, 0.2]} // width, height, depth
        radius={0.1}
        smoothness={4}
      >
        <meshStandardMaterial color="white" />
      </RoundedBox>
      <Text
        position={[0, 0, 0.15]} // 앞쪽으로 살짝 빼줌
        fontSize={0.2}
        color={me?.id === player.id ? "#276b4f" : "#000000"}
        maxWidth={2.2}
        anchorX="center"
        anchorY="middle"
        overflowWrap="break-word"
        whiteSpace="normal"
      >
        {displayText}
      </Text>
    </group>
  );
}

export default ChatBubble;
