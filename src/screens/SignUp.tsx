import { useState } from "react";
import { Alert } from "react-native";
import { VStack, Center, Image, Heading, Text, Pressable, ScrollView, useToast } from "native-base";
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import * as ImagePicker from 'expo-image-picker';

import api from "@services/api";

import { AuthRoutesNavigatorProps } from "@routes/auth.routes";

import Logo from '@assets/Logo.png';
import AvatarDefault from '@assets/AvatarDefault.png';

import Input from "@components/Input";
import Button from "@components/Button";
import EditPhotoBadge from "@components/EditPhotoBadge";
import { AppError } from "@utils/AppError";

type FormInputProps = {
    name: string,
    email: string,
    tel: string,
    password: string,
    confirmPassword: string,
}

const formSchema = yup.object({
    name: yup.string().required('Informe seu nome'),
    email: yup.string().required('Informe seu email').email('Formato de email inválido'),
    tel: yup.string().required('Informe seu telefone').matches(/^[1-9]{2}[1-9]{2}\9[0-9]{4}[0-9]{4}$/, 'Telefone deve conter DDI+DDD+Numero'),
    password: yup.string().required('Informe sua senha').min(6, 'A senha deve ter ao menos 6 dígitos'),
    confirmPassword: yup.string().required('Confime a senha').oneOf([yup.ref('password'), null], 'As senhas devem ser iguais'),
})

const SignUp = () => {
    const [photoFile, setPhotoFile] = useState<any>();
    const [userPhoto, setUserPhoto] = useState<string | undefined>();
    const [loading, setLoading] = useState(false);

    const { control, handleSubmit, formState: {errors} } = useForm<FormInputProps>({
        resolver: yupResolver(formSchema)
    });

    const navigator = useNavigation<AuthRoutesNavigatorProps>();
    const toast = useToast();

    const handleRedirectToSignIn = () => {
        navigator.navigate('signIn');
    }

    const handleSelectProfilePhoto = async () => {
        try {
            const selectedImage = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1
            });

            if (selectedImage.canceled) return;

            const fileExtension = selectedImage.assets[0].uri.split('.').pop();
            const photoFileObject = {
                uri: selectedImage.assets[0].uri,
                type: `${selectedImage.assets[0].type}/${fileExtension}`
            } as any

            setUserPhoto(selectedImage.assets[0].uri);
            setPhotoFile(photoFileObject);
        } catch (error) {
            toast.show({
                title: 'Ocoorreu um erro durante a seleção das imagens, por favor, tente novamente',
                placement: 'top',
                bgColor: 'red.100'
            })
        }
    }

    const handleCreateAccount = async ({ name, email, tel, password }: FormInputProps) => {
        if (!photoFile) {
            return Alert.alert('Selecione uma imagem de perfil', 'Não será possível selecionar uma imagem depois!');
        }

        setLoading(true);

        const fileExtension = photoFile.type.split('/')[1];
        const inFormPhotoFile = {
            name: `${name}.${fileExtension}`.toLowerCase(),
            ...photoFile
        }

        const createUserForm = new FormData();
        createUserForm.append('avatar', inFormPhotoFile);

        createUserForm.append('name', name);
        createUserForm.append('email', email);
        createUserForm.append('tel', tel);
        createUserForm.append('password', password);

        try {
            await api.post('/users', createUserForm, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            navigator.navigate('signIn');
        } catch (error: any) {
            const title = error instanceof AppError ? error.message : 'Não foi possível criar conta. Tente novamente mais tarde';
            
            toast.show({
                title,
                bgColor: 'red.100',
                placement: 'top'
            })

            setLoading(false);
        }
    }

    return (
        <ScrollView flex = {1} bgColor = 'gray.600' pt = {12} px = {10} showsVerticalScrollIndicator = {false}>
            <VStack flex = {1}>
                <Center pb = {20}>
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

                    <Pressable mt = {6} mb = {3} position = 'relative' onPress = {handleSelectProfilePhoto} >
                        <Image 
                            source = {!userPhoto ? AvatarDefault : {uri: userPhoto}}
                            alt = 'User avatar'
                            size = {32}
                            borderRadius = {64}
                        />
                        <EditPhotoBadge />
                    </Pressable>

                    <Controller 
                        control = {control}
                        name = 'name'
                        render = {({ field: {onChange, value} }) => (
                            <Input 
                                mt = {3}
                                placeholder = 'Nome' 
                                errorMessage = {errors.name?.message}
                                onChangeText = {onChange}
                                value = {value}
                            />
                        )}
                    />

                    <Controller 
                        control = {control}
                        name = 'email'
                        render = {({ field: {onChange, value} }) => (
                            <Input 
                                mt = {3}
                                placeholder = 'E-mail' 
                                errorMessage = {errors.email?.message}
                                onChangeText = {onChange}
                                value = {value}
                                keyboardType = 'email-address'
                                autoCapitalize = 'none'
                            />
                        )}
                    />

                    <Controller 
                        control = {control}
                        name = 'tel'
                        render = {({ field: {onChange, value} }) => (
                            <Input 
                                mt = {3}
                                placeholder = 'Telefone' 
                                errorMessage = {errors.tel?.message}
                                onChangeText = {onChange}
                                value = {value}
                                keyboardType = 'numeric'
                            />
                        )}
                    />

                    <Controller 
                        control = {control}
                        name = 'password'
                        render = {({ field: {onChange, value} }) => (
                            <Input 
                                mt = {3}
                                placeholder = 'Senha' 
                                errorMessage = {errors.password?.message}
                                onChangeText = {onChange}
                                value = {value}
                                isSecure
                            />
                        )}
                    />

                    <Controller 
                        control = {control}
                        name = 'confirmPassword'
                        render = {({ field: {onChange, value} }) => (
                            <Input 
                                mt = {3}
                                placeholder = 'Confirmarsenha' 
                                errorMessage = {errors.confirmPassword?.message}
                                onChangeText = {onChange}
                                value = {value}
                                onSubmitEditing = {handleSubmit(handleCreateAccount)}
                                isSecure
                            />
                        )}
                    />

                    <Button 
                        title = 'Criar'
                        buttonTheme = 'dark'
                        w = '100%' 
                        mt = {7}
                        isLoading = {loading}
                        onPress = {handleSubmit(handleCreateAccount)}
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
            </VStack>
        </ScrollView>
    )
}

export default SignUp;