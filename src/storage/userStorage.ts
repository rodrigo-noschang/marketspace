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