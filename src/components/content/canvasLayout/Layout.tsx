import {ReactNode} from "react";
import { useRecoilValue } from "recoil";
import { IsLoadCompleteAtom } from "../../../store/PlayersAtom";
import styled from "styled-components";
import SideBar from "./canvasUserInterfaces/common/SideBar";
import Minimap from "./canvasUserInterfaces/ground/Minimap";

interface CanvasLayoutProps {
    children: ReactNode;
}

const Wrapper = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    background-color: transparent;
`;

const CanvasLayout = ({children} :CanvasLayoutProps) => {
    const isLoadCompleted = useRecoilValue(IsLoadCompleteAtom);
    return (
        <Wrapper>
            {children}
            {isLoadCompleted &&
            (
                <>
                    <SideBar/>
                    <Minimap/>
                </>
            )}
        </Wrapper>
    );
};

export default CanvasLayout;
