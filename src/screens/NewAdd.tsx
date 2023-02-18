import { useState } from 'react';
import { Alert } from 'react-native';
import { VStack, Heading, Text, Pressable, Icon, Center, HStack, Image } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import AppHeader from '@components/AppHeader';

import { useAuth } from '@contexts/authContext';

type PhotoObject = {
    name: string, 
    uri: string,
    type: string
}

const NewAdd = () => {
    const [productPhotos, setProductPhotos] = useState<PhotoObject[]>([]);
    const { user } = useAuth();

    const selectImageFromGalery = async () => {
        const selectedImage = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1
        })

        if (selectedImage.canceled) return;

        const fileUri = selectedImage.assets[0].uri
        const fileExtension = fileUri.split('.').pop();

        const fileObject = {
            name: `${user.name.toLowerCase()}.${fileExtension}`,
            type: `image/${fileExtension}`,
            uri: fileUri
        }

        return fileObject
    }

    const handleAddProductImage = async () => {
        const photoObject = await selectImageFromGalery();

        if (!photoObject) return;
        setProductPhotos([...productPhotos, photoObject])
    }

    const updateImagesState = (photoUri: string, newPhoto: PhotoObject) => {
        const currentPhotoIndex = productPhotos.findIndex(photo => photo.uri === photoUri);

        if (currentPhotoIndex === -1) return;

        productPhotos.splice(currentPhotoIndex, 1, newPhoto);
        setProductPhotos([...productPhotos]);
    }

    const changeProductImage = async (photoUri: string) => {
        const photoObject = await selectImageFromGalery();

        if (!photoObject) return;
        updateImagesState(photoUri, photoObject);   
    }

    const deleteProductPhoto = (photoUri: string) => {
        const updatedPhotos = productPhotos.filter(photos => photos.uri !== photoUri);
        setProductPhotos(updatedPhotos);
    }

    const handleChangeOrDeleteProduct = async (photoUri: string) => {
        return Alert.alert('Deseja excluir ou trocar a imagem?', '', [
            {
                text: 'Cancelar',
                onPress: () => {}
            },
            {
                text: 'Trocar',
                onPress: () => changeProductImage(photoUri)
            },
            {
                text: 'Excluir',
                onPress: () => deleteProductPhoto(photoUri)
            }
        ]);
    }

    return (
        <VStack pt = {45} px = {6} flex = {1}>
            <AppHeader 
                title = 'Criar anúncio'
                returnable
            />

            <Heading fontSize = 'lg' color = 'gray.200' fontFamily = 'heading' mt = {2}>
                Imagens
            </Heading>

            <Text fontSize = 'md' color = 'gray.200' fontFamily = 'body' mt = {1}>
                Escolha até 3 imagens para mostrar o quanto o seu produto é incrível!
            </Text>

            <HStack flexWrap = 'wrap' mt = {3}>

                { productPhotos.length > 0 &&
                    productPhotos.map(photo => (
                        <Pressable onPress = {() => handleChangeOrDeleteProduct(photo.uri)} key = {photo.uri}>
                            <Image 
                                w = {100}
                                h = {100}
                                rounded = 'md'
                                source = {{uri: photo.uri}}
                                alt = 'Foto do produto'
                                mr = {3}
                                mb = {2}
                            />
                        </Pressable>
                    ))
                }

                { productPhotos.length < 3 &&
                    <Pressable bgColor = 'gray.500' w = {100} h = {100} rounded = 'md' onPress = {handleAddProductImage}>
                        <Center flex = {1}>
                            <Icon 
                                as = {AntDesign}
                                name = 'plus'
                                size = {6}
                                color = 'gray.400'
                            />
                        </Center>
                    </Pressable>
                }

            </HStack>

        </VStack>
    )

}

export default NewAdd;