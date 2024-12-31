import Floor from "./elements/Floor.tsx";
import JungleGym from "./elements/JungleGym.tsx";
import PineTrees from "./elements/PineTrees.tsx";

export const GroundElements = () => {
    return (
        <>
            <Floor />
            <JungleGym/>

            <PineTrees position={[-30,0,-30]} />
            <PineTrees position={[-20,0,-20]} />
            <PineTrees position={[-30,0,-20]} />
            <PineTrees position={[-20,0,-20]} />
        </>
    )
}
