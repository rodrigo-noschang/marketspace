import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import api from '@services/api';
import { UserDTO } from '@dtos/UserDTO';
import { userStorageClearUser, userStorageGetUser, userStorageStoreUser } from '@storage/userStorage';
import { authStorageClearToken, authStorageGetToken, authStorageStoreToken } from '@storage/authStorage';

type AuthContextDataProps = {
    user: UserDTO,
    token: string,
    loadingData: boolean,
    isTokenValid: boolean,

    setUser: (userData: UserDTO) => void,
    setToken: (newToken: string) => void,
    setLoadingData: (loadingState: boolean) => void,
    setIsTokenValid: (validState: boolean) => void,

    signIn: (inputEmail: string, inputPassword: string) => Promise<void>,
    checkTokenValidity: () => Promise<void>,
    signOutAndClearStorage: () => void,
}

type AuthContextProviderProps = {
    children: ReactNode
}

const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = useState({} as UserDTO);
    const [token, setToken] = useState('');
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [loadingData, setLoadingData] = useState(true);

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

    const checkTokenValidity = async () => {

        try {
            const response = await api.get('/users/me');

            if (response.data.id) {
                setIsTokenValid(true);
            }
        } catch (error) {
            setIsTokenValid(false);
            throw error;
        }
    }


    const signIn = async (inputEmail: string, inputPassword: string) => {
        const data = {email: inputEmail, password: inputPassword};

        try {
            const response = await api.post('/sessions', data);

            setTokenToRequestHeader(response.data.token);
            setIsTokenValid(true);
            
            const userData = getUserDataFromApiResponse(response.data.user);
            updateAndStoreUser(userData);

            updateAndStoreToken(response.data.token);
        } catch (error) {
            throw error
        }
    }

    const signOutAndClearStorage = async () => {
        setUser({} as UserDTO);
        setToken('');
        setIsTokenValid(false);

        await userStorageClearUser();
        await authStorageClearToken();
    }

    const getStoredUserAndToken = async () => {
        try {
            const storedUser = await userStorageGetUser();
            const storedToken = await authStorageGetToken();

            if (storedToken) {
                setTokenToRequestHeader(storedToken);
            }

            await checkTokenValidity();
            
            setUser(storedUser);
            setToken(storedToken);
        } catch (error) {
            signOutAndClearStorage();
        } finally {
            setLoadingData(false);
        }
    }

    useEffect(() => {
        setLoadingData(true);
        setIsTokenValid(false);
        getStoredUserAndToken();
    }, [])

    return (
        <AuthContext.Provider value = {{
            user, 
            token,
            loadingData,
            isTokenValid,
            setUser,
            setToken,
            setLoadingData,
            setIsTokenValid,
            signIn,
            checkTokenValidity,
            signOutAndClearStorage
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);