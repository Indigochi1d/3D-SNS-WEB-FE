import Floor from "./elements/Floor.tsx";
import JungleGym from "./elements/JungleGym.tsx";
import Penguin from "./elements/npc/Penguin.tsx";
import PineTrees from "./elements/PineTrees.tsx";
import Swing from "./elements/Swing.tsx";
import Tree from "./elements/Tree.tsx";

export const GroundElements = () => {
    return (
        <>
            <Floor />
            <JungleGym/>
            <Penguin/>

            <PineTrees position={[-30,0,-30]} />
            <PineTrees position={[-20,0,-30]} />
            <PineTrees position={[-30,0,-20]} />
            <PineTrees position={[-20,0,-20]} />


            <Tree position={[-3,0,20]} />
            <Tree position={[-14,0,22]} />
            <Tree position={[8,0,15]} />

            <Swing/>
        </>
    )
}
