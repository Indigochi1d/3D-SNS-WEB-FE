import {atom} from "recoil";

interface SocketStatusProps{
    isConnected : boolean,
    error: null | string,
}

export const SocketStatusAtom = atom<SocketStatusProps>({
    key:"SocketStatusAtom",
    default:{
        isConnected : false,
        error : null,
    }
});