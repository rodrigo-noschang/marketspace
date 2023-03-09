import { useCallback, useState } from "react";
import { Box, VStack } from "native-base";
import { useFocusEffect } from "@react-navigation/native";

import { useAdd } from "@contexts/addContext";
import { useUserAdds } from "@contexts/userAddsContext";

import AppHeader from "@components/AppHeader";
import AddForm from "@components/AddForm";

const AddEditing = () => {
    const [selectedAddId, setSelectedAddId] = useState('');

    const { add, addImages } = useAdd();
    const { userAdds } = useUserAdds();

    const findSelectedAddId = () => {
        const selectedAdd = userAdds?.find(userAdd => userAdd.name === add.name && userAdd.description === add.description);

        if (selectedAdd) {
            setSelectedAddId(selectedAdd.id);
        }
    }

    useFocusEffect(useCallback(() => {
        findSelectedAddId();
    }, []))

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
                selectedAddId = {selectedAddId}
            />
        </VStack>
    )
}

export default AddEditing;