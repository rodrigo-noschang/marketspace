import AsyncStorage from '@react-native-async-storage/async-storage';

import { TOKEN_COLLECTION } from './storageConfig';

export const authStorageStoreToken = async (token: string) => {
    try {
        await AsyncStorage.setItem(TOKEN_COLLECTION, token);
    } catch (error) {
        throw error;
    }
}

export const authStorageGetToken = async () => {
    try {
        const storedToken = await AsyncStorage.getItem(TOKEN_COLLECTION);

        return storedToken ?? '';
    } catch (error) {
        throw error;
    }
}

export const authStorageClearToken = async () => {
    try {
        AsyncStorage.removeItem(TOKEN_COLLECTION);
    } catch (error) {
        throw error
    }
}