import {atom} from "recoil";
interface meProps{
    id:string,
    position: [number,number,number],
    nickname: string,
    jobPosition: string,
    selectedGLBIndex: number,
    myRoom: {
        objects:[]
    }
}

export const MeAtom = atom<meProps|undefined>({
    key: "MeAtom",
    default: undefined,
})

export const CharacterSelectFinishedAtom = atom({
    key: "CharacterSelectFinishedAtom",
    default: false,
})

export const SelectedGLBIndexAtom = atom({
    key: "SelectedGLBAtom",
    default: 0,
});