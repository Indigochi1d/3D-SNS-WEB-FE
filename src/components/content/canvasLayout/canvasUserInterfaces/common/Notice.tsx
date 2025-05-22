import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import {
  ExitedNoticeAtom,
  EnteredNoticeAtom,
} from "../../../../../store/PlayersAtom";

interface NoticeItem {
  id: number;
  message: string;
}

const NoticeWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  user-select: none;
  transition: 0.4s ease-in-out;
  & > * {
    transition: 0.4s ease-in-out;
  }
  &.visible {
    display: flex;
    opacity: 1;
    visibility: visible;
  }
  &.invisible {
    opacity: 0;
    visibility: hidden;
  }
  div {
    margin-top: 40px;
    font-size: 22px;
    color: #000000;
    background-color: #ececec;
    border-radius: 10px;
    padding: 8px;
  }
`;

const Notice = () => {
  const [enteredPlayer, setEnteredPlayer] = useRecoilState(EnteredNoticeAtom);
  const [exitedPlayer, setExitedPlayer] = useRecoilState(ExitedNoticeAtom);
  const [visible, setVisible] = useState<boolean>(false);
  const [noticeQueue, setNoticeQueue] = useState<NoticeItem[]>([]);
  const [currentNotice, setCurrentNotice] = useState<NoticeItem | null>(null);
  const [noticeId, setNoticeId] = useState(0);

  // 새로운 알림을 큐에 추가
  const addToQueue = (message: string) => {
    const newNotice = {
      id: noticeId,
      message,
    };
    setNoticeQueue((prev) => [...prev, newNotice]);
    setNoticeId((prev) => prev + 1);
  };

  // 큐에서 다음 알림 처리
  useEffect(() => {
    if (noticeQueue.length > 0 && !currentNotice) {
      setCurrentNotice(noticeQueue[0]);
      setVisible(true);
      setNoticeQueue((prev) => prev.slice(1));
    }
  }, [noticeQueue, currentNotice]);

  // 현재 알림 표시 후 제거
  useEffect(() => {
    if (currentNotice) {
      const timeout = setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          setCurrentNotice(null);
        }, 400); // fade out 애니메이션 완료 후 제거
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [currentNotice]);

  // 입장 알림 처리
  useEffect(() => {
    if (enteredPlayer) {
      addToQueue(
        `${enteredPlayer.nickname}[${enteredPlayer.jobPosition}]님이 입장하셨습니다.`
      );
      setEnteredPlayer(undefined);
    }
  }, [enteredPlayer, setEnteredPlayer]);

  // 퇴장 알림 처리
  useEffect(() => {
    if (exitedPlayer) {
      addToQueue(
        `${exitedPlayer.nickname}[${exitedPlayer.jobPosition}]님이 퇴장하셨습니다.`
      );
      setExitedPlayer(undefined);
    }
  }, [exitedPlayer, setExitedPlayer]);

  return (
    <NoticeWrapper className={visible ? "visible" : "invisible"}>
      {currentNotice && <div>{currentNotice.message}</div>}
    </NoticeWrapper>
  );
};

export default Notice;
