import AsyncStorage from '@react-native-async-storage/async-storage';

export const setPermissionFlag = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.error('Failed to save permission flag', e); //TODO add more meaningful error handling
    }
};

export const getPermissionFlag = async (key: string): Promise<string | null> => {
    try {
        
        return await AsyncStorage.getItem(key);
    } catch (e) {
        console.error('Failed to fetch permission flag', e); //TODO add more meaningful error handling
        return null;
    }
};