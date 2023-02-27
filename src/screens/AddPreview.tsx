import AppHeader from "@components/AppHeader";
import { Box, VStack } from "native-base";

import ProductsInfo from "@components/ProductsInfo";

import { useNewAdd } from "@contexts/newAddContext";
import { useAuth } from "@contexts/authContext";
import Button from "@components/Button";

const AddPreview = () => {
    const { newAdd, newAddImages } = useNewAdd();
    const { user } = useAuth();

    const handleEditAdd = () => {
        console.log('IMPLEMENTAR EDIÇÃO DO ADD')
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
                productData = {newAdd}
                productAnnouncer = {user}
                productImages = {newAddImages}
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