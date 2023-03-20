import { useState } from "react";
import { HStack, VStack, ScrollView } from "native-base"
import { useNavigation } from '@react-navigation/native'
import { useToast } from "native-base";

import { AppError } from "@utils/AppError";
import { useNewAdd } from "@contexts/newAddContext";
import api from "@services/api";

import Button from "@components/Button";
import ProductsInfo from "@components/ProductsInfo";
import AddPreviewHeader from "@components/AddPreviewHeader";

import { AddsRoutesNavigationProps } from "@routes/adds.routes";

const NewAddPreview = () => {
    const [isLoading, setIsLoading] = useState(false);

    const { newAdd, newAddImages } = useNewAdd();

    const navigator = useNavigation<AddsRoutesNavigationProps>();
    const toast = useToast();

    const postProductImages = async (productId: string, ) => {
        const productImagesForm = new FormData();

        productImagesForm.append('product_id', productId);

        for (const image of newAddImages) {
            productImagesForm.append('images', image as any)
        }

        await api.post('/products/images', productImagesForm, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
    }
    
    const handleCreateAdd = async () => {
        setIsLoading(true);
        try {
            const response = await api.post('/products', newAdd);
            const productId = response.data.id;
    
            postProductImages(productId);

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

            <ScrollView>
                <ProductsInfo addType = 'new' />
                
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
            </ScrollView>

        </VStack>
    )
}

export default NewAddPreview;