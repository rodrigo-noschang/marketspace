import { ReactNode, createContext, useContext, useEffect, useState } from "react";

import api from "@services/api";
import { AppError } from "@utils/AppError";
import { DatabaseProductDTO } from "@dtos/ProductDTO";

type UserAddsDataProps = {
    userAdds: DatabaseProductDTO[] | null
    userAddsError: string,
    onFocusAdd: DatabaseProductDTO | null,

    fetchUserAdds: () => Promise<void>,
    insertNewAdd: (product: DatabaseProductDTO) => void,
    putAddOnFocus: (addId: string) => void
    sortUserAddsByActiveAfterUpdate: (updatedAddId: string) => void
}

const UserAddsContext = createContext<UserAddsDataProps>({} as UserAddsDataProps);

type UserAddsProviderProps = {
    children: ReactNode,
}

export const UserAddsContexProvider = ({ children }: UserAddsProviderProps) => {
    const [userAdds, setUserAdds] = useState<DatabaseProductDTO[] | null>(null);
    const [onFocusAdd, setOnFocusAdd] = useState<DatabaseProductDTO | null>(null);
    const [userAddsError, setUserAddsError] = useState('');

    const fetchUserAdds = async () => {
        try {
            const response = await api.get('/users/products');
            
            setUserAddsError('');
            sortUserAdds(response.data);
        } catch (error) {
            const title = error instanceof AppError ? error.message : 'Não foi possível carregar seus anúncios. Tente novamente mais tarde';
            setUserAddsError(title);
        }
    }

    const sortUserAdds = (userAdds: DatabaseProductDTO[]) => {

        const sortedAdds = userAdds.sort((a, b) => {
            return Number(b.is_active) - Number(a.is_active)
        })

        setUserAdds(sortedAdds);
    }

    const sortUserAddsByActiveAfterUpdate = (updatedAddId: string) => { 
        if (!userAdds) return;

        const updatedAdd = userAdds.find(add => add.id === updatedAddId);
        if (!updatedAdd) return;

        updatedAdd.is_active = !updatedAdd.is_active; // Update is_active on state as well
        
        sortUserAdds(userAdds);
    }

    const insertNewAdd = (product: DatabaseProductDTO) => {
        if (userAdds) {
            setUserAdds([...userAdds, product]);
        } else {
            setUserAdds([product])
        }
    }

    // const removeAddFromState = (addId: string) => {
    //     if (!userAdds) return;

    //     const addsListUpdated = userAdds.filter(add => add.id !== addId);

    //     setUserAdds(addsListUpdated);
    // }

    const putAddOnFocus = (addId: string) => {
        const addToBeFocused = userAdds?.find(add => add.id === addId);
        if (!addToBeFocused) return;

        setOnFocusAdd(addToBeFocused);
    }

    useEffect(() => {
        fetchUserAdds();
    }, [])

    return (
        <UserAddsContext.Provider value = {{
            userAdds,
            userAddsError,
            onFocusAdd,
            fetchUserAdds,
            insertNewAdd,
            putAddOnFocus,
            sortUserAddsByActiveAfterUpdate
        }}>
            { children }

        </UserAddsContext.Provider>
    )
}

export const useUserAdds = () => useContext(UserAddsContext);