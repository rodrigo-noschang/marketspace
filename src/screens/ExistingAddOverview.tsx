import AppHeader from "@components/AppHeader";
import ProductsInfo from "@components/ProductsInfo";

import { useAuth } from "@contexts/authContext";
import { Box } from "native-base";

const ExistingAddOverview = () => {
    const { user } = useAuth();

    const handleEditAdd = () => {
        console.log('IMPLEMENTAR EDIÇÃO DE ANUNCIO!!!!!! -> EditExistingAdd');
    }

    return (
        <>
            <Box pt = {45} px = {6}>
                <AppHeader
                    title = ''
                    returnable
                    actionIcon = 'edit'
                    action = {handleEditAdd}
                />

                <ProductsInfo 
                    addType = 'existing'
                />
            </Box>
        
        </>
    )

}

export default ExistingAddOverview;