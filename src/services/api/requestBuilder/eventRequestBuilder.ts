import { SoundrLocation } from "../../types/soundrEventRequest";


export const eventRequestBuilder = (offset: number, genre: string[], location?: SoundrLocation) => {
    const requestBody: any = {
        offset,
        genre,
    };
    if (location) {
        requestBody.location = location;
    }
    return requestBody;
}