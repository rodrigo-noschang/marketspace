import { useEffect } from "react";
import { VStack, HStack, Box, Text, Image, Heading } from "native-base";

import Button from "@components/Button";

import { useAuth } from "@contexts/authContext";
import { UserDTO } from "@dtos/UserDTO";
import api from "@services/api";

const Home = () => {
    const { user, checkTokenValidity } = useAuth();

    console.log(user);

    useEffect(() => {
        checkTokenValidity();
    }, [])

    return (
        <VStack pt = {50} px = {6}>
            <HStack justifyContent = 'space-between' alignItems = 'center'>
                <HStack>
                    { user.avatar &&
                        <Image 
                            source = {{uri: `${api.defaults.baseURL}/avatar/${user.avatar}`}}
                            alt = 'User profile image'
                            rounded = 'full'
                        />
                    }
                    <VStack ml = {2}>
                        <Text fontSize = 'md' fontFamily = 'body' color = 'gray.200'> 
                            Boas vindas, 
                        </Text>
                        <Heading fontSize = 'lg' color = 'gray.200' mt = {1}> 
                            {user.name}! 
                        </Heading>
                    </VStack>
                </HStack>

                <Button
                    title = 'Criar anúncio'
                    buttonTheme = 'dark'
                    iconName = 'plus'
                    iconSize = {4}
                />
            </HStack>

            
        </VStack>
    )
}

export default Home;