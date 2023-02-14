import AsyncStorage from '@react-native-async-storage/async-storage';

import { TOKEN_COLLECTION } from './storageConfig';

export const authStorageStoreToken = async (token: string) => {
    await AsyncStorage.setItem(TOKEN_COLLECTION, token);
}