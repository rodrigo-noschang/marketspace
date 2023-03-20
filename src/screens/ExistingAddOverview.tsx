import { Box } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { AddsRoutesNavigationProps } from "@routes/adds.routes";

import Button from "@components/Button";
import AppHeader from "@components/AppHeader";
import ProductsInfo from "@components/ProductsInfo";

const ExistingAddOverview = () => {

    const navigator = useNavigation<AddsRoutesNavigationProps>();

    const handleEditAdd = () => {
        navigator.navigate('editAdd');
    }

    const handleDeactivateAdd = () => {
        console.log('IMPLEMENTAR DESATIVAÇÃO DO ANUNCIO!!!!!! -> EditExistingAdd');
    }

    const handleDeleteAdd = () => {
        console.log('IMPLEMENTAR EXCLUSÃO DO ANUNCIO!!!!!! -> EditExistingAdd');
    }

    return (
            <Box pt = {45} flex = {1}>
                <Box px = {6}>
                    <AppHeader
                        title = ''
                        returnable
                        actionIcon = 'edit'
                        action = {handleEditAdd}
                    />
                </Box>

                <ProductsInfo addType = 'existing'>
                    <Box mt = {6} flex = {1} pb = {10}>
                        <Button 
                            title = 'Desativar anúncio'
                            buttonTheme = 'dark'
                            iconName = 'poweroff'
                            onPress = {handleDeactivateAdd}
                        />

                        <Button mt = {3}
                            title = 'Excluir anúncio'
                            buttonTheme = 'light'
                            iconName = 'delete'
                            onPress = {handleDeleteAdd}
                        />
                    </Box>

                </ProductsInfo>
            </Box>
    )

}

export default ExistingAddOverview;