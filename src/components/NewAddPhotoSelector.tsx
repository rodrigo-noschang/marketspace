import { Alert } from "react-native";
import { HStack, Pressable, Image, Icon, Badge, Center } from "native-base"
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { useAuth } from "@contexts/authContext";

type PhotoObject = {
    name: string, 
    uri: string,
    type: string
}

type Props = {
    productsPhotos: PhotoObject[],
    setProductsPhotos: (newPhotoObjectArray: PhotoObject[]) => void;
}

const NewAddPhotoSelector = ({ productsPhotos, setProductsPhotos }: Props) => {
    
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

    const deleteProductPhoto = (photoUri: string) => {
        const updatedPhotos = productsPhotos.filter(photos => photos.uri !== photoUri);
        setProductsPhotos(updatedPhotos);
    }

    const handleChangeOrDeleteProduct = async (photoUri: string) => {
        return Alert.alert('Deseja excluir essa imagem?', '', [
            {
                text: 'Cancelar',
                onPress: () => {}
            },
            {
                text: 'Excluir',
                onPress: () => deleteProductPhoto(photoUri)
            }
        ]);
    }

    const handleAddProductImage = async () => {
        const photoObject = await selectImageFromGalery();

        if (!photoObject) return;
        setProductsPhotos([...productsPhotos, photoObject])
    }

    return (
        <HStack flexWrap = 'wrap' mt = {3}>
            { productsPhotos.length > 0 &&
                productsPhotos.map(photo => (
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

            { productsPhotos.length < 3 &&
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