import AppHeader from "@components/AppHeader";
import { Box, VStack } from "native-base";
import { useNavigation } from '@react-navigation/native'

import ProductsInfo from "@components/ProductsInfo";
import Button from "@components/Button";

import { useAdd } from "@contexts/addContext";
import { useAuth } from "@contexts/authContext";
import { AddsRoutesNavigationProps } from "@routes/adds.routes";

const AddPreview = () => {
    const { add, addImages } = useAdd();
    const { user } = useAuth();

    const navigator = useNavigation<AddsRoutesNavigationProps>();

    const handleEditAdd = () => {
        navigator.navigate('addEditing');
    }

    const handleDeactivateAdd = () => {
        console.log('IMPLEMENTAR DESTAIVAÇÃO DO ADD')
    }

    const handleDeleteAdd = () => {
        console.log('IMPLEMENTAR DELEÇÃO DO ADD')
    }

    return (
        <VStack flex = {1} pt = {10} pb = {5}>
            <Box px = {6}>
                <AppHeader 
                    returnable
                    title = ''
                    actionIcon = 'edit'
                    action = {handleEditAdd}
                />
            </Box>

            <ProductsInfo 
                productData = {add}
                productAnnouncer = {user}
                productImages = {addImages}
            >

                <Box mt = {4}>
                    <Button 
                        title = 'Desativar anúncio'
                        iconName = 'poweroff'
                        buttonTheme = 'dark'
                        onPress = {handleDeactivateAdd}
                    />

                    <Button 
                        title = 'Excluir anúncio'
                        iconName = 'delete'
                        buttonTheme = 'light'
                        mt = {2}
                        onPress = {handleDeleteAdd}
                    />
                </Box>

            </ProductsInfo>

        </VStack>
    )
}

export default AddPreview;