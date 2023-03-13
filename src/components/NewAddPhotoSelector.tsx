import { useState } from "react";
import { Alert } from "react-native";
import { HStack, Pressable, Image, Icon, Badge, Center } from "native-base"
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { useAuth } from "@contexts/authContext";
import { useNewAdd } from "@contexts/newAddContext";

const NewAddPhotoSelector = () => {
    const { user } = useAuth();
    const { newAddImages, setNewAddImages, deleteAddImage } = useNewAdd();

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

    const deleteProductPhotoLocally = async (photoUri: string) => {
        deleteAddImage(photoUri);
    }

    const handleChangeOrDeleteProduct = async (photoUri: string) => {
        return Alert.alert('Deseja excluir essa imagem?', '', [
            {
                text: 'Cancelar',
                onPress: () => {}
            },
            {
                text: 'Excluir',
                onPress: () => deleteProductPhotoLocally(photoUri)
            }
        ]);
    }

    const handleAddProductImage = async () => {
        const photoObject = await selectImageFromGalery();

        if (!photoObject) return;
        setNewAddImages([...newAddImages, photoObject])
    }

    return (
        <HStack flexWrap = 'wrap' mt = {3}>
            { newAddImages.length > 0 &&
                newAddImages.map(photo => (
                    <Pressable onPress = {() => handleChangeOrDeleteProduct(photo.uri)} key = {photo.uri}>
                        <Badge position = 'absolute' zIndex = {2} bgColor = 'gray.200' rounded = 'full' p = {0} top = {1} right = {4}>
                            <Icon 
                                as = {AntDesign}
                                name = 'close'
                                size = {3}
                                color = 'gray.700'
                            />
                        </Badge>
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

            { newAddImages.length < 3 &&
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
    )
    

}

export default NewAddPhotoSelector