import { useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { Text } from "native-base";

import { AuthRoutesNavigatorProps } from '@routes/auth.routes';
import { useAuth } from "@contexts/authContext";
import { UserDTO } from "@dtos/UserDTO";

const Home = () => {
    const { user, token, setUser, getUserDataToCheckTokenValidity } = useAuth();
    const navigator = useNavigation<AuthRoutesNavigatorProps>();
    
    const checkTokenValidity = async () => {
        try {
            const token = await getUserDataToCheckTokenValidity();
            // console.log('Home -> ', token);
        } catch (error) {
            // console.log('Home -> ',  error) ;
            navigator.navigate('signIn')
        }
    }

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