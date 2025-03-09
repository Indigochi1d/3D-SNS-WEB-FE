import { useRecoilValue } from "recoil";
import { CurrentMapAtom, MeAtom, PlayersAtom } from "../../../../../store/PlayersAtom";
import styled from "styled-components";

const MinimapWrapper = styled.div`
    position: fixed;
    width: 200px;
    height: 200px;
    right:50px;
    bottom:50px;
    background-color: #0000004b;
    rotate: 50deg;
    &:visible{
        display: block;
    }
    &:invisible{
        display: none;
    }
`;  

const PlayerPoint = styled.div`
    position: absolute;
    top:100px;
    left:180px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    &:me-point{
        background-color: #59c771;
    }
    &:other-point{
        background-color: #3e3b5f;
    }
`;


const Minimap = () => {
    const currentMap = useRecoilValue(CurrentMapAtom);
    const players = useRecoilValue(PlayersAtom);
    const me = useRecoilValue(MeAtom);

    return (
        <MinimapWrapper 
            className={currentMap === "GROUND" ? "visible" : "invisible"}
            onContextMenu={(e) => e.preventDefault()}
            >
            {players.map((player) => (
                <PlayerPoint
                key={player.id}
                id={`player-point-${player.id}`}
                className={player.id === me?.id ? "me-point" : "other-point"}
                />
            ))}
        </MinimapWrapper>
    );
};

export default Minimap;
