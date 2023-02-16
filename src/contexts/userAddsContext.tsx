import { ReactNode, createContext, useContext, useEffect, useState } from "react";

import api from "@services/api";
import { AppError } from "@utils/AppError";
import { ProductAddDTO } from "@dtos/AddsDTO";
import { userAddsStorageGetUserAdds, userAddsStorageStoreUserAdds } from "@storage/userAddsStorage";


type UserAddsDataProps = {
    userAdds: ProductAddDTO[] | null
    userAddsError: string
    fetchAndStoreUserAdds: () => Promise<void>
}

const UserAddsContext = createContext<UserAddsDataProps>({} as UserAddsDataProps);

type UserAddsProviderProps = {
    children: ReactNode,
}

export const UserAddsContexProvider = ({ children }: UserAddsProviderProps) => {
    const [userAdds, setUserAdds] = useState<ProductAddDTO[] | null>(null);
    const [userAddsError, setUserAddsError] = useState('');

    const fetchAndStoreUserAdds = async () => {
        try {
            const storedUserAdds = await userAddsStorageGetUserAdds();

            if (!storedUserAdds) {
                const response = await api.get('/users/products');
                setUserAdds(response.data);

                await userAddsStorageStoreUserAdds(response.data);
            }

            setUserAdds(storedUserAdds);
        } catch (error) {
            console.log('Deu erro na request, paizin');
            const title = error instanceof AppError ? error.message : 'Não foi possível carregar seus anúncios. Tente novamente mais tarde';
            setUserAddsError(title);
        }
    }

    useEffect(() => {
        fetchAndStoreUserAdds();
    }, [])

    return (
        <UserAddsContext.Provider value = {{
            userAdds,
            userAddsError,
            fetchAndStoreUserAdds
        }}>
            { children }

        </UserAddsContext.Provider>
    )
}

export const useUserAdds = () => useContext(UserAddsContext);