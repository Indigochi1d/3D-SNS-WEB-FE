// 모든 맵의 Root역할을 할 컴포넌트

import { GroundElements } from "./structures/ground";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CharacterSelectFinishedAtom,
  ChatsAtom,
  PlayersAtom,
  RecentChatsAtom,
  ShownChatMessagesAtom,
} from "../../../../store/PlayersAtom.ts";
import { CharacterInit } from "../../lobby/CharacterInit.tsx";
import { useThree } from "@react-three/fiber";
import { Fragment, MutableRefObject, Suspense, useEffect, useRef } from "react";
import { OrbitControls as typeOC } from "three-stdlib";
import { Vector3 } from "three";
import { Man } from "../maps/player/Man.tsx";
import { Woman } from "../maps/player/Woman.tsx";
import { Kid } from "../maps/player/Kid.tsx";
import Loader from "../../loader/Loader.tsx";
import ChatBubble from "./structures/ground/3dUIs/ChatBubble.tsx";

export const RootMap = () => {
  const characterSelectFinished = useRecoilValue(CharacterSelectFinishedAtom);
  const camera = useThree((three) => three.camera);
  const [players] = useRecoilState(PlayersAtom);
  const controls: MutableRefObject<typeOC | null> = useRef(null);
  const nicknameRef = useRef(null);
  const recentChat = useRecoilValue(RecentChatsAtom);

  useEffect(() => {
    if (!controls.current) return;
    camera.position.set(14, 14, 14);
    controls.current.target.set(0, 0, 0);
  }, [camera.position]);

  return (
    <Suspense fallback={<Loader />}>
      {!characterSelectFinished ? (
        <CharacterInit />
      ) : (
        <>
          <GroundElements />
          {players.map((player) => {
            // console.log("player id:", player.id);
            // console.log("recent Chat:", recentChat);
            // console.log("recentChat senderId:", recentChat[0]?.senderId);
            // console.log(player.id === recentChat[0]?.senderId); // true -> 5s -> false

            const matchedChat = recentChat.find(
              (c) => c.senderId?.trim() === player.id.trim()
            );
            console.log("🎯 Matched Chat:", matchedChat);
            return (
              <Fragment key={player.id}>
                {matchedChat && (
                  <ChatBubble
                    key={`${player.id}_chat`}
                    player={player}
                    chat={matchedChat}
                  />
                )}
                {player.selectedGLBIndex === 0 && (
                  <Man
                    key={player.id}
                    player={player}
                    position={
                      new Vector3(
                        player.position[0],
                        player.position[1],
                        player.position[2]
                      )
                    }
                    modelIndex={0}
                    nicknameRef={nicknameRef}
                  />
                )}
                {player.selectedGLBIndex === 1 && (
                  <Kid
                    key={player.id}
                    player={player}
                    position={
                      new Vector3(
                        player.position[0],
                        player.position[1],
                        player.position[2]
                      )
                    }
                    modelIndex={1}
                  />
                )}
                {player.selectedGLBIndex === 2 && (
                  <Woman
                    key={player.id}
                    player={player}
                    position={
                      new Vector3(
                        player.position[0],
                        player.position[1],
                        player.position[2]
                      )
                    }
                    modelIndex={2}
                  />
                )}
              </Fragment>
            );
          })}
        </>
      )}
    </Suspense>
  );
};
