import { VStack, Center, Image, Heading, Text, Pressable, ScrollView } from "native-base";
import { useNavigation } from '@react-navigation/native';

import { AuthRoutesNavigatorProps } from "@routes/auth.routes";

import Logo from '@assets/Logo.png';
import AvatarDefault from '@assets/AvatarDefault.png';

import Input from "@components/Input";
import Button from "@components/Button";
import EditPhotoBadge from "@components/EditPhotoBadge";

const SignUp = () => {
    const navigator = useNavigation<AuthRoutesNavigatorProps>()

    const handleRedirectToSignIn = () => {
        navigator.navigate('signIn');
    }

    const handleCreateAccount = () => {

    }

    return (
        <VStack flex = {1} bgColor = 'gray.600' pt = {12} pb = {20} px = {10}>
            <ScrollView showsVerticalScrollIndicator = {false}>
                <Center>
                    <Image 
                        source = {Logo}
                        alt = 'Logo image'
                        size = {12}
                    />

                    <Heading fontFamily = 'heading' fontSize = 'lg' mt = {2}>
                        Boas vindas!
                    </Heading>
                    <Text mt = {2} fontSize = 'md' fontFamily = 'body' textAlign = 'center' color = 'gray.200'>
                        Crie sua conta e use o espaço para comprar itens variados e vender seus produtos
                    </Text>

                    <Pressable mt = {6} mb = {3} position = 'relative'>
                        <Image 
                            source = {AvatarDefault}
                            alt = 'User avatar'
                        />
                        <EditPhotoBadge />
                    </Pressable>

                    <Input placeholder = 'Nome' mt = {3}/>
                    <Input placeholder = 'E-mail' mt = {3}/>
                    <Input placeholder = 'Telefone' mt = {3}/>

                    <Input 
                        placeholder = 'Senha'
                        isSecure
                        mt = {3} 
                    />
                    <Input 
                        placeholder = 'Confirmar senha'
                        isSecure
                        mt = {3}
                    />

                    <Button 
                        title = 'Criar'
                        buttonTheme = 'dark'
                        w = '100%' 
                        mt = {7}
                        onPress = {handleCreateAccount}
                    />

                    <Heading mt = {9} fontSize = 'md' fontFamily = 'heading' color = 'gray.400'>
                        Já tem uma conta?
                    </Heading>

                    <Button 
                        title = 'Ir para o login'
                        buttonTheme = 'light'
                        w = '100%' 
                        mt = {4}
                        onPress = {handleRedirectToSignIn}
                    />
                </Center>
            </ScrollView>
        </VStack>
    )
}

export default SignUp;