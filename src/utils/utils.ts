export const isValidText = (text : string) => {
    return Boolean(text && text.trim() !== "");
}

const usernameRegex = /^[a-z]([a-z0-9_]{4,11})$/;

export const isValidNickname  = (nickname:string) => {
    return usernameRegex.test(nickname);
}