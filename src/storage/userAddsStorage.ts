import AsyncStorage from "@react-native-async-storage/async-storage"
import { USER_ADDS_COLLECTION } from "./storageConfig"

import { ProductAddDTO } from "@dtos/AddsDTO"

export const userAddsStorageStoreUserAdds = async (userProducts: ProductAddDTO[]) => {
    try {
        await AsyncStorage.setItem(USER_ADDS_COLLECTION, JSON.stringify(userProducts));
    } catch (error) {
        throw error
    }
}

export const userAddsStorageGetUserAdds = async () => {
    try {
        const userAdds = await AsyncStorage.getItem(USER_ADDS_COLLECTION)
        return userAdds ? JSON.parse(userAdds) : null;
    } catch (error) {
        throw error
    }
}

export const removeAdds = async () => {
    try {
        await AsyncStorage.removeItem(USER_ADDS_COLLECTION);
    } catch (error) {
        throw error
    }
}