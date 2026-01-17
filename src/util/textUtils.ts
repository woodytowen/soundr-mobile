

//Needs something like this to limit characters if lineup length is too long
//Make re-usable and add to utils file
export const limitCharacters = (text: string, limit: number, ellipsis: string = '...'): string => {
    if (text.length <= limit) return text;
    return text.substring(0, limit) + ellipsis;
}
