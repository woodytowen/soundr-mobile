import { getPermissionFlag } from "../store/permissionStorage"
import * as Location from 'expo-location';
import { SoundrLocation } from "../types/soundrEventRequest";

export const getLocation = async (radius?: number): Promise<SoundrLocation | undefined> => {
    if(await getPermissionFlag('locationPermission') === 'denied') return;

    try {
        const location = await Location.getCurrentPositionAsync({});
                console.log('Location fetched:', location);
        return {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            radius: radius ? radius : 100,
        };
    } catch (error) {
        console.error('Error fetching location:', error);
        return;
    }
}