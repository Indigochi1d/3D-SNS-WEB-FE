import { Vector3 } from "three";

export const isValidText = (text : string) => {
    return Boolean(text && text.trim() !== "");
}

const usernameRegex = /^[a-z]([a-z0-9_]{4,11})$/;

export const isValidNickname  = (nickname:string) => {
    return usernameRegex.test(nickname);
}

/*
    미니맵 위치 계산
*/
export const calculateMinimapPosition = (originalPosition:Vector3) =>{
    return {
        x: 2*originalPosition.x - 5,
        z: 2*originalPosition.z - 5
    }
}
