import { Box, VStack } from "native-base";

import { useAdd } from "@contexts/addContext";

import AppHeader from "@components/AppHeader";
import AddForm from "@components/AddForm";

const AddEditing = () => {

    const { add, addImages } = useAdd();

    return (
        <VStack pt = {10} flex = {1}>
            <Box px = {6}>
                <AppHeader 
                    title = 'Editar anúncio'
                    returnable
                />
            </Box>

            <AddForm 
                productData = {add}
                productImages = {addImages}
            />
        </VStack>
    )
}

export default AddEditing;