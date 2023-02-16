import { useEffect, useState } from "react";
import { VStack, Text } from "native-base";
import { useNavigation } from '@react-navigation/native'

import HomeHeader from "@components/HomeHeader";
import UserAddsHighlight from "@components/UserAddsHighlight";

import { useAuth } from "@contexts/authContext";
import { AppRoutesNavigatorProps } from "@routes/app.routes"; 

const Home = () => {
    const { user, checkTokenValidity } = useAuth();

    const navigator = useNavigation<AppRoutesNavigatorProps>();

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
                onPress = {handleRedirectToMyAdds}
            />
            
        </VStack>
    )
}

export default Home;