import { useCallback, useState,FC } from "react";
import { useSetRecoilState,useRecoilValue } from "recoil";
import { CurrentMapAtom, CurrentMyRoomAtom,MeAtom } from "../../../../../store/PlayersAtom";
import styled from "styled-components";
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import HomeIcon from '@mui/icons-material/Home';
import SportsEsportIcon from '@mui/icons-material/SportsEsports';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';


const SideBarWrapper = styled.div`
    transition: 0.4s ease-in-out;
    position: fixed;
    left:0;
    top:0;
    background-color: #007355;
    width: 250px;
    height: 100%;
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 42px 0px;
    border-radius: 0 10px 10px 0;
    &.opened {
        transform: translateX(0);
    }
    &.closed{
        transform: translateX(-100%);
    }

    div{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        padding: 10px;
        gap: 10px;
        border-bottom: 1px solid gray;
        cursor: pointer;
        svg{
            width: 48px;
            height: 48px;
            color: #ebb9af;
        }
        span{
            font-size: 18px;
            padding-top: 8px;
            color: #ebb9af;
            font-weight: 500;
        }
        & > *{
            transition: 0.2s ease-in-out;
        }
        &:hover{
            background-color: #ebb9af;
            & > *{
                color: #007355;
            }
            span {
                font-size: 20px;
                font-weight: 800;
            }

            svg{
                width: 50px;
                height: 50px;
                color: #007355;
            }
        }
    }
`;

const DropdownController = styled.div`
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ebb9af;
    cursor: pointer;
    svg{
        font-weight: 700;
        width: 42px;
        height: 42px;
    }
    &:hover{
        transform: scale(1.05);
    }
`;



const SideBar:FC = () => {
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const setCurrentMap = useSetRecoilState(CurrentMapAtom);
    const setCurrentMyRoom = useSetRecoilState(CurrentMyRoomAtom);
    const me = useRecoilValue(MeAtom);

    const handleClick = useCallback((mapType:string) => (e:React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setCurrentMyRoom(mapType === "MYROOM" ? me : undefined);
        setCurrentMap(mapType);
        setIsDropDownOpen(false);
    },[me,setCurrentMap,setCurrentMyRoom]);

    return (
        <>
            <SideBarWrapper className={isDropDownOpen ? "opened" : "closed"}>
                <div onClick={handleClick("GROUND")}>
                    <SportsCricketIcon/>
                    <span>놀이터로 가기</span>
                </div>
                <div onClick={handleClick("MYROOM")}>
                    <HomeIcon/>
                    <span>내 방으로 가기</span>
                </div>
                <div onClick={handleClick("GAME_ROOM")}>
                    <SportsEsportIcon/>
                    <span>게임 방으로 가기</span>
                </div>
            </SideBarWrapper>
            <DropdownController onClick={(e)=>{
                e.stopPropagation();
                setIsDropDownOpen(prev => !prev);
            }}>
                {isDropDownOpen ? <CloseIcon/> : <MenuIcon/>}
            </DropdownController>
        </>
        
    );
};

export default SideBar;
