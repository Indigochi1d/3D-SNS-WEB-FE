import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import {
  ExitedNoticeAtom,
  EnteredNoticeAtom,
} from "../../../../../store/PlayersAtom";

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
  }
  &.invisible {
    display: none;
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
  useEffect(() => {
    setVisible(true);
    const timeout = setTimeout(() => {
      setVisible(false);
      setEnteredPlayer(undefined);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [enteredPlayer, setEnteredPlayer, setVisible]);
  useEffect(() => {
    setVisible(true);
    const timeout = setTimeout(() => {
      setVisible(false);
      setExitedPlayer(undefined);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [exitedPlayer, setExitedPlayer, setVisible]);
  return (
    <NoticeWrapper className={visible ? "visible" : "invisible"}>
      {enteredPlayer && (
        <div>{`${enteredPlayer.nickname}[${enteredPlayer.jobPosition}]님이 입장하셨습니다.`}</div>
      )}
      {exitedPlayer && (
        <div>{`${exitedPlayer.nickname}[${exitedPlayer.jobPosition}]님이 퇴장하셨습니다.`}</div>
      )}
    </NoticeWrapper>
  );
};

export default Notice;
