import AsyncStorage from "@react-native-async-storage/async-storage"
import { USER_ADDS_COLLECTION } from "./storageConfig"

import { ProductsDTO } from "@dtos/ProductsDTO"

export const userAddsStorageStoreUserAdds = async (userProducts: ProductsDTO[]) => {
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