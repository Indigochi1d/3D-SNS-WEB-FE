export const isValidText = (text : string) => {
    return Boolean(text && text.trim() !== "");
}