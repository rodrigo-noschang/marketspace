import { useState } from "react";
import { VStack, Image, Center, Text, Heading, ScrollView, useToast } from "native-base";
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { AuthRoutesNavigatorProps } from "@routes/auth.routes";

import { AppError } from "@utils/AppError";

import Logo from '@assets/Logo.png';
import Marketspace from '@assets/marketspace.png';

import Input from "@components/Input";
import Button from "@components/Button";

import { useAuth } from "@contexts/authContext";

type FormInputProps = {
    email: string,
    password: string
}

const formSchema = yup.object({
    email: yup.string().required('Informe o e-mail').email('Formato de e-mail inválido'),
    password: yup.string().required('Informe a senha')
})

const SignIn = () => {
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();

    const { control, handleSubmit, formState: {errors} } = useForm<FormInputProps>({
        resolver: yupResolver(formSchema)
    });

    const navigator = useNavigation<AuthRoutesNavigatorProps>();
    const toast = useToast();

    const handleRedirectToSignUp = () => {
        navigator.navigate('signUp');
    }

    const handleSignIn = async (data: FormInputProps) => {
        try {
            setLoading(true);
            await signIn(data.email, data.password);
        } catch (error) {
            const title = error instanceof AppError ? error.message : 'Não foi possível fazer login, tente novamente mais tarde';
            toast.show({
                title,
                bgColor: 'red.100',
                placement: 'top'
            })

        } finally {
            setLoading(false);
        }
    }

    return (
        <VStack flex = {1}>
            <ScrollView flex = {1} showsVerticalScrollIndicator = {false}>
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

                    <Heading mt = {20} mb = {2} fontSize = 'md' fontFamily = 'heading'>
                        Acesse sua conta
                    </Heading>

                    <Controller 
                        control = {control}
                        name = 'email'
                        render = {({field: {onChange, value}}) => (
                            <Input 
                                mt = {4} 
                                placeholder = "E-mail" 
                                onChangeText = {onChange}
                                value = {value}
                                keyboardType = 'email-address'
                                autoCapitalize = "none"
                                errorMessage = {errors.email?.message}
                            />

                        )}
                    />

                    <Controller 
                        control = {control}
                        name = 'password'
                        render = {({ field: {onChange, value} }) => (
                            <Input mt = {4} 
                                placeholder = "Senha" 
                                isSecure
                                onChangeText = {onChange}
                                value = {value}
                                onSubmitEditing = {handleSubmit(handleSignIn)}
                                returnKeyType = 'send'
                                errorMessage = {errors.password?.message}
                            />
                        )}
                    
                    />


                    <Button 
                        title = 'Entrar'
                        buttonTheme = 'blue'
                        w = '100%'
                        mt = {8}
                        onPress = {handleSubmit(handleSignIn)}
                        isLoading = {loading}
                    />
                </Center>

                <Center px = {10}>
                    <Heading mt = {12} fontSize = 'md' fontFamily = 'heading' color = 'gray.400'>
                        Ainda não tem acesso?
                    </Heading>

                    <Button
                        title = 'Criar uma conta'
                        buttonTheme = 'light'
                        w = '100%'
                        mt = {5}
                        onPress = {handleRedirectToSignUp}
                    />
                </Center>
            </ScrollView>
        </VStack>

    ) 

}

export default SignIn;