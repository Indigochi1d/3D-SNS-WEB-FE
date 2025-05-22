import { ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { CurrentMapAtom, IsLoadCompleteAtom } from "../../../store/PlayersAtom";
import styled from "styled-components";
import SideBar from "./canvasUserInterfaces/common/SideBar";
import Minimap from "./canvasUserInterfaces/ground/Minimap";
import ChatBox from "./canvasUserInterfaces/common/ChatBox";
import { MapTypeEnum } from "../../../store/PlayersAtom";
import Notice from "./canvasUserInterfaces/common/Notice";

interface CanvasLayoutProps {
  children: ReactNode;
}

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
`;

const CanvasLayout = ({ children }: CanvasLayoutProps) => {
  const isLoadCompleted = useRecoilValue(IsLoadCompleteAtom);
  const currentMap = useRecoilValue(CurrentMapAtom);
  return (
    <Wrapper>
      {children}
      {isLoadCompleted && (
        <>
          <Notice />
          <SideBar />
          <Minimap />
          {currentMap !== MapTypeEnum.GAMEROOM && <ChatBox />}
        </>
      )}
    </Wrapper>
  );
};

export default CanvasLayout;
