import {atom} from "recoil";

export const MeAtom = atom({
    key: "MeAtom",
    default: "undefined",
})

export const CharacterSelectedFinishedAtom = atom({
    key: "CharacterSelectedFinishedAtom",
    default: false,
})

export const selectedGLBIndexAtom = atom({
    key: "SelectedGLBAtom",
    default: 0,
});