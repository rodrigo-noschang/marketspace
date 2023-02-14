import { ReactNode, createContext, useContext, useState } from 'react';

import { UserDTO } from '@dtos/UserDTO';
import api from '@services/api';
import { userStorageStoreUser } from '@storage/userStorage';
import { authStorageStoreToken } from '@storage/authStorage';

type AuthContextDataProps = {
    user: UserDTO,
    token: string,
    setUser: (userData: UserDTO) => void,
    signIn: (inputEmail: string, inputPassword: string) => Promise<void>,
    getUserDataToCheckTokenValidity: () => Promise<string>
}

type AuthContextProviderProps = {
    children: ReactNode
}

const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = useState({} as UserDTO);
    const [token, setToken] = useState('');

    const getUserDataFromApiResponse = (userResponseData: any) => {
        const { id, avatar, name, email, tel } = userResponseData;
        const userData = { id, avatar, name, email, tel };

        return userData;
    }

    const updateAndStoreUser = async (userData: UserDTO) => {
        setUser(userData);

        await userStorageStoreUser(userData);
    }

    const setTokenToRequestHeader = (token: string) => {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    const updateAndStoreToken = async (token: string) => {
        setToken(token);

        await authStorageStoreToken(token);
    }

    const getUserDataToCheckTokenValidity = async () => {
        try {
            const response = await api.get('/users/me');
            return response.data.token;
        } catch (error) {
            throw error
        }
    }


    const signIn = async (inputEmail: string, inputPassword: string) => {
        const data = {email: inputEmail, password: inputPassword};

        try {
            const response = await api.post('/sessions', data);

            setTokenToRequestHeader(response.data.token);
            
            const userData = getUserDataFromApiResponse(response.data.user);
            updateAndStoreUser(userData);

            updateAndStoreToken(response.data.token);
        } catch (error) {
            throw error
        }
    }

    return (
        <AuthContext.Provider value = {{
            user, 
            token,
            setUser,
            signIn,
            getUserDataToCheckTokenValidity,
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);