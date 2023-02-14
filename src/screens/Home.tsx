import { useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { Text } from "native-base";

import { AuthRoutesNavigatorProps } from '@routes/auth.routes';
import { useAuth } from "@contexts/authContext";
import { UserDTO } from "@dtos/UserDTO";

const Home = () => {
    const { user, token, loadingData, setUser, setToken, setLoadingData, setIsTokenValid, checkTokenValidity, signOutAndClearStorage } = useAuth();
    const navigator = useNavigation<AuthRoutesNavigatorProps>();
    
    // const checkTokenValidity = async () => {

    //     try {
    //         const token = await getUserDataToCheckTokenValidity();
    //         setIsTokenValid(true);
    //     } catch (error) {
    //         signOutAndClearStorage();
    //         setIsTokenValid(false);
    //     } 
    // }

    useEffect(() => {
        checkTokenValidity();
    }, [])

    return (
        <Text pt = {30}>
            Hello people
        </Text>
    )
}

export default Home;