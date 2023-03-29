import { useState } from "react";
import { Box, useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";

import api from "@services/api";
import { AppError } from "@utils/AppError";
import { useUserAdds } from "@contexts/userAddsContext";
import { AddsRoutesNavigationProps } from "@routes/adds.routes";

import Button from "@components/Button";
import AppHeader from "@components/AppHeader";
import ProductsInfo from "@components/ProductsInfo";

const UsersExistingAddOverview = () => {
    const [isLoadingDeactivate, setIsLoadingDeactivate] = useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);

    const navigator = useNavigation<AddsRoutesNavigationProps>();

    const { onFocusAdd, sortUserAddsByActiveAfterUpdate } = useUserAdds();
    const toast = useToast();

    const handleEditAdd = () => {
        navigator.navigate('editAdd');
    }

    const handleDeactivateAdd = async () => {
        if (!onFocusAdd) return;
        setIsLoadingDeactivate(true);

        const data = {
            is_active: !onFocusAdd.is_active
        }

        try {
            await api.patch(`/products/${onFocusAdd.id}`, data);

            sortUserAddsByActiveAfterUpdate(onFocusAdd.id);
            setIsLoadingDeactivate(false);

            navigator.navigate('appHome');
        } catch (error) {
            const title = error instanceof AppError ? error.message : 'Não foi possível desativar o anuncio, tente novamente mais tarde';
            
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.100'
            });         
            setIsLoadingDeactivate(false);
        }
    }

    const handleDeleteAdd = async () => {
        if (!onFocusAdd) return;
        setIsLoadingDelete(true);
        
        try {
            await api.delete(`/products/${onFocusAdd.id}`)
            
            sortUserAddsByActiveAfterUpdate(onFocusAdd.id);
            setIsLoadingDelete(false);

            navigator.navigate('appHome');
        } catch (error) {
            const title = error instanceof AppError ? error.message : 'Não foi possível deletar o anuncio, tente novamente mais tarde';
            
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.100'
            });         
            setIsLoadingDelete(false);
        }
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
                            title = {onFocusAdd?.is_active ? 'Desativar anúncio' : 'Reativar anúncio'}
                            buttonTheme = 'dark'
                            iconName = 'poweroff'
                            isLoading = {isLoadingDeactivate}
                            onPress = {handleDeactivateAdd}
                        />

                        <Button mt = {3}
                            title = 'Excluir anúncio'
                            buttonTheme = 'light'
                            iconName = 'delete'
                            isLoading = {isLoadingDelete}
                            onPress = {handleDeleteAdd}
                        />
                    </Box>

                </ProductsInfo>
            </Box>
    )

}

export default UsersExistingAddOverview;