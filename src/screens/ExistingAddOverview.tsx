import { Box } from "native-base";

import AppHeader from "@components/AppHeader";
import ProductsInfo from "@components/ProductsInfo";

const ExistingAddOverview = () => {

    const handleEditAdd = () => {
        console.log('IMPLEMENTAR EDIÇÃO DE ANUNCIO!!!!!! -> EditExistingAdd');
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

                <ProductsInfo 
                    addType = 'existing'
                />
            </Box>
    )

}

export default ExistingAddOverview;