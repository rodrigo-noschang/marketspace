import AsyncStorage from "@react-native-async-storage/async-storage"

import { USER_COLLECTION } from "./storageConfig"
import { UserDTO } from "@dtos/UserDTO"

export const userStorageStoreUser = async (userData: UserDTO) => {
    try {
        await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(userData));
    } catch (error) {
        throw error
    }
}

export const userStorageGetUser = async () => {
    try {
        const userData = await AsyncStorage.getItem(USER_COLLECTION);

        if (userData) {
            return JSON.parse(userData);
        } else {
            return {} as UserDTO
        }
    } catch (error) {
        throw error;
    }
}

export const userStorageClearUser = async () => {
    try {
        AsyncStorage.removeItem(USER_COLLECTION);
    } catch (error) {
        throw error
    }
}