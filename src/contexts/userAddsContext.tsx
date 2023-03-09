import { ReactNode, createContext, useContext, useEffect, useState } from "react";

import api from "@services/api";
import { AppError } from "@utils/AppError";
import { DatabaseProductDTO } from "@dtos/ProductDTO";


type UserAddsDataProps = {
    userAdds: DatabaseProductDTO[] | null
    userAddsError: string
    fetchUserAdds: () => Promise<void>,
    insertNewAdd: (product: DatabaseProductDTO) => void
}

const UserAddsContext = createContext<UserAddsDataProps>({} as UserAddsDataProps);

type UserAddsProviderProps = {
    children: ReactNode,
}

export const UserAddsContexProvider = ({ children }: UserAddsProviderProps) => {
    const [userAdds, setUserAdds] = useState<DatabaseProductDTO[] | null>(null);
    const [userAddsError, setUserAddsError] = useState('');

    const fetchUserAdds = async () => {
        try {
            const response = await api.get('/users/products');
            
            setUserAddsError('');
            setUserAdds(response.data);
        } catch (error) {
            const title = error instanceof AppError ? error.message : 'Não foi possível carregar seus anúncios. Tente novamente mais tarde';
            setUserAddsError(title);
        }
    }

    const insertNewAdd = (product: DatabaseProductDTO) => {
        if (userAdds) {
            setUserAdds([...userAdds, product]);
        } else {
            setUserAdds([product])
        }
    }

    useEffect(() => {
        fetchUserAdds();
    }, [])

    return (
        <UserAddsContext.Provider value = {{
            userAdds,
            userAddsError,
            fetchUserAdds,
            insertNewAdd
        }}>
            { children }

        </UserAddsContext.Provider>
    )
}

export const useUserAdds = () => useContext(UserAddsContext);