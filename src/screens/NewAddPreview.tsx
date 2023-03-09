import { useState } from "react";
import { HStack, VStack } from "native-base"
import { useNavigation } from '@react-navigation/native'
import { useToast } from "native-base";

import { AppError } from "@utils/AppError";
import { useAdd } from "@contexts/addContext";
import { useAuth } from "@contexts/authContext";
import api from "@services/api";

import Button from "@components/Button";
import ProductsInfo from "@components/ProductsInfo";
import AddPreviewHeader from "@components/AddPreviewHeader";
import { DatabaseProductDTO } from "@dtos/ProductDTO";

import { AddsRoutesNavigationProps } from "@routes/adds.routes";

const NewAddPreview = () => {
    const [isLoading, setIsLoading] = useState(false);

    const { add, addImages } = useAdd();
    const { user } = useAuth();

    const navigator = useNavigation<AddsRoutesNavigationProps>();
    const toast = useToast();

    const postProductImages = async (productId: string, product: DatabaseProductDTO) => {
        const productImagesForm = new FormData();

        productImagesForm.append('product_id', productId);

        for (const image of addImages) {
            productImagesForm.append('images', image as any)
        }

        const response = await api.post('/products/images', productImagesForm, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
    }
    
    const handleCreateAdd = async () => {
        setIsLoading(true);
        try {
            const response = await api.post('/products', add);
            const productId = response.data.id;
    
            postProductImages(productId, response.data);

            navigator.navigate('appHome')
        } catch (error) {
            const title = error instanceof AppError ? error.message : 'Não foi possível criar o produto. Tente novamente mais tarde'

            setIsLoading(false);

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.100'
            })
        }
    }

    return (
        <VStack flex = {1} bgColor = 'gray.700'> 
            <AddPreviewHeader />
            
            <ProductsInfo 
                productAnnouncer = {user}
                productData = {add}
                productImages = {addImages}
            />
            

            <HStack px = {6} py = {6} justifyContent = 'space-between'>
                <Button 
                    title = 'Voltar e editar'
                    buttonTheme = 'light'
                    iconName = 'arrowleft'
                    w = '48%'
                    onPress = {() => navigator.goBack()}
                />

                <Button 
                    title = 'Publicar'
                    buttonTheme = 'blue'
                    iconName = 'tag'
                    w = '48%'
                    isLoading = {isLoading}
                    onPress  = {handleCreateAdd}
                />
            </HStack>

        </VStack>
    )
}

export default NewAddPreview;