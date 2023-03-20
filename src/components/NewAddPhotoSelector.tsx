import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { HStack, Pressable, Image, Icon, Badge, Center, useToast } from "native-base"

import Loading from "./Loading";

import api from "@services/api";
import { AppError } from "@utils/AppError";
import { NewProductImage } from "@dtos/AddsDTO";
import { useAuth } from "@contexts/authContext";
import { DatabaseImages } from "@dtos/ProductDTO";
import { useNewAdd } from "@contexts/newAddContext";

type Props = {
    existingAddImages?: DatabaseImages[]
    productId?: string,
    updateNewImages: NewProductImage[],
    addImageIdToBeDeleted?: (imageId: string) => void,
    setUpdatedNewImages?: (imagesObjects: NewProductImage[]) => void
}

const NewAddPhotoSelector = ({ existingAddImages, productId, updateNewImages, addImageIdToBeDeleted, setUpdatedNewImages }: Props) => {
    const [usableImages, setUsableImages] = useState<NewProductImage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const { user } = useAuth();
    const { newAddImages, setNewAddImages } = useNewAdd();
    const toast = useToast();

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
        const updatedPhotos = usableImages.filter(photos => photos.uri !== photoUri);
        setUsableImages(updatedPhotos);
        setNewAddImages(updatedPhotos);
    }

    const getPhotoIdFromUri = (photoUri: string) => {
        const photoToBeDeleted = usableImages.find(image => image.uri === photoUri);
        if (!photoToBeDeleted || !photoToBeDeleted.id) return '';

        return photoToBeDeleted.id
    }

    const deleteProductPhotoLocallyAndFromDatabase = async (photoUri: string) => {
        const photoId = getPhotoIdFromUri(photoUri);

        deleteProductPhotoLocally(photoUri);
        if (addImageIdToBeDeleted) addImageIdToBeDeleted(photoId);
    }

    const deleteProductPhotoLocallyOrInDatabase = (photoUri: string) => {
        if (existingAddImages) {
            deleteProductPhotoLocallyAndFromDatabase(photoUri);
        } else {
            deleteProductPhotoLocally(photoUri);
        }
    }

    const handleDeleteProduct = async (photoUri: string) => {
        return Alert.alert('Deseja excluir essa imagem?', '', [
            {
                text: 'Cancelar',
                onPress: () => {}
            },
            {
                text: 'Excluir',
                onPress: () => deleteProductPhotoLocallyOrInDatabase(photoUri)
            }
        ]);
    }

    const handleAddProductImage = async () => {
        const photoObject = await selectImageFromGalery();

        if (!photoObject) return;
        setUsableImages([...usableImages, photoObject]);
        setNewAddImages([...usableImages, photoObject]);
        
        if (setUpdatedNewImages) setUpdatedNewImages([...updateNewImages, photoObject]);
    }

    useEffect(() => {
        setIsLoading(true);

        if (existingAddImages) {
            const standardImagesOjects = existingAddImages.map(image => {
                const fileExtension = image.path.split('.').pop();

                const imageObject = {
                    id: image.id,
                    name: `${user.name.toLowerCase()}.${fileExtension}`,
                    type: `image/${fileExtension}`,
                    uri: `${api.defaults.baseURL}/images/${image.path}`
                }

                return imageObject; 
            })

            setUsableImages(standardImagesOjects);
        } else {
            setUsableImages(newAddImages);
        }

        setIsLoading(false);
    }, [])

    return (
    isLoading ?
        <Loading />
    :
        <HStack flexWrap = 'wrap' mt = {3}>
            { usableImages.length > 0 &&
                usableImages.map(photo => (
                    <Pressable onPress = {() => handleDeleteProduct(photo.uri)} key = {photo.uri}>
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

            { usableImages.length < 3 &&
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