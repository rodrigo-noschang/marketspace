import { useEffect, useState } from "react";
import { VStack, Text } from "native-base";
import { useNavigation } from '@react-navigation/native'

import HomeHeader from "@components/HomeHeader";
import UserAddsHighlight from "@components/UserAddsHighlight";

import { useAuth } from "@contexts/authContext";
import api from "@services/api";
import { AppError } from "@utils/AppError";
import { AppRoutesNavigatorProps } from "@routes/app.routes"; 

import { userAddsStorageStoreUserAdds, userAddsStorageGetUserAdds } from "@storage/userAddsStorage";

const Home = () => {
    const [userAdds, setUserAdds] = useState(null);
    const [userAddsError, setUserAddsError] = useState('');
    const { user, checkTokenValidity } = useAuth();

    const navigator = useNavigation<AppRoutesNavigatorProps>();

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
            const title = error instanceof AppError ? error.message : 'Não foi possível carregar seus anúncios. Tente novamente mais tarde';
            setUserAddsError(title);
        }
    }

    const handleRedirectToMyAdds = () => {
        navigator.navigate('myAdds');
    }

    useEffect(() => {
        checkTokenValidity();
    }, [])

    return (
        <VStack pt = {50} px = {6}>
            <HomeHeader  avatar = {user.avatar} name = {user.name}/>

            <Text fontSize = 'md' fontFamily = 'body' color = 'gray.400' mt = {8}>
                Seus produtos anunciados para venda
            </Text>

            <UserAddsHighlight 
                fetchAndStoreUserAdds = {fetchAndStoreUserAdds}
                userAdds = {userAdds}
                error = {userAddsError}
                onPress = {handleRedirectToMyAdds}
            />
            
        </VStack>
    )
}

export default Home;