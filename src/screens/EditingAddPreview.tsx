import { useState } from "react";
import { HStack, VStack } from "native-base"
import { useNavigation, useRoute } from '@react-navigation/native'
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

type RouteParams = {
    selectedAddId: string
}

const EditingAddPreview = () => {
    const [isLoading, setIsLoading] = useState(false);

    const { add, addImages } = useAdd();
    const { user } = useAuth();

    const toast = useToast();
    const navigator = useNavigation<AddsRoutesNavigationProps>();
    const route = useRoute();

    const {selectedAddId} = route.params as RouteParams;

    const handleEditAdd = async () => {
        setIsLoading(true);
        try {
            await api.put(`/products/${selectedAddId}`, add);

            navigator.navigate('appHome')
        } catch (error) {
            const title = error instanceof AppError ? error.message : 'Não foi possível editar o produto. Tente novamente mais tarde'

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
                    title = 'Salvar alterações'
                    buttonTheme = 'blue'
                    iconName = 'tag'
                    w = '48%'
                    isLoading = {isLoading}
                    onPress  = {handleEditAdd}
                />
            </HStack>

        </VStack>
    )
}

export default EditingAddPreview;