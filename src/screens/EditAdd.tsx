import AppHeader from "@components/AppHeader";
import EditingAddForm from "@components/EditingAddForm";
import { VStack, Box } from "native-base";

import { useUserAdds } from "@contexts/userAddsContext";
import Loading from "@components/Loading";

const EditAdd = () => {
    const { onFocusAdd } = useUserAdds();

    return (
        <VStack pt = {45} flex = {1} bgColor = 'gray.600'>

            <Box px = {6} bgColor = 'gray.600'>
                <AppHeader 
                    title = 'Editar anúncio'
                    returnable
                />
            </Box>

            { onFocusAdd ?
                <EditingAddForm 
                    addData = {onFocusAdd}
                />
            :
                <Loading />
            }
        </VStack>
    )
}

export default EditAdd;