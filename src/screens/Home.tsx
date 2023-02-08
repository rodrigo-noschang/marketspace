import { VStack, Image, Center, Text, Heading, ScrollView } from "native-base";

import Logo from '@assets/Logo.png';
import Marketspace from '@assets/marketspace.png';

import Input from "@components/Input";
import Button from "@components/Button";

const Home = () => {

    const handleLogin = () => {
        console.log('HOME -> Implementar LOGIN')
    }

    return (
        <VStack flex = {1}>
            <ScrollView flex = {1} >
                <Center bgColor = 'gray.600' py = {20} px = {10} borderBottomLeftRadius = {20} borderBottomRightRadius = {20}>
                    <Image 
                        source = {Logo}
                        alt = 'logo image'
                    />

                    <Image 
                        mt = {5}
                        source = {Marketspace}
                        alt = 'brand name'
                    />

                    <Text fontSize = 'md' color = 'gray.300' mt = {1}>
                        Seu espaço de compra e venda
                    </Text>

                    <Heading mt = {20} fontSize = 'md' fontFamily = 'heading'>
                        Acesse sua conta
                    </Heading>

                    <Input placeholder = "E-mail" />
                    <Input placeholder = "Senha" isSecure/>

                    <Button 
                        title = 'Entrar'
                        buttonTheme = 'blue'
                        w = '100%'
                        mt = {8}
                        onPress = {handleLogin}
                    />
                </Center>

                <Center px = {10}>
                    <Heading mt = {12} fontSize = 'sm' fontFamily = 'body' color = 'gray.400'>
                        Ainda não tem acesso?
                    </Heading>

                    <Button
                        title = 'Criar uma conta'
                        buttonTheme = 'light'
                        w = '100%'
                        mt = {5}
                    />
                </Center>
            </ScrollView>
        </VStack>

    ) 

}

export default Home;