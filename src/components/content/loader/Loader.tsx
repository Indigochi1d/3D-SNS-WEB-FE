import { Html, useProgress } from "@react-three/drei";
import { useSetRecoilState } from "recoil";
import { IsLoadCompleteAtom } from "../../../store/PlayersAtom";
import { useEffect } from "react";


const Loader = () => {
    const {progress} = useProgress()
    const setIsLoadCompleted = useSetRecoilState(IsLoadCompleteAtom);

    useEffect(() => {
        setIsLoadCompleted(progress === 100);
    }, [progress,setIsLoadCompleted]);


    return (
        <Html center>
            <progress value={progress}/>
        </Html>
    );
};

export default Loader;
