import { VStack, Box } from 'native-base';
import AppHeader from '@components/AppHeader';

import AddForm from '@components/AddForm';

const NewAdd = () => {
    
    return (
        <VStack flex = {1}>

            <Box pt = {45} px = {6} bgColor = 'gray.600'>
                <AppHeader 
                    title = 'Criar anúncio'
                    returnable
                    warningMessage = 'Se você sair dessa tela, os dados do anúncio serão perdidos e será necessário inserí-los novamente'
                />
            </Box>

            
            <AddForm />
        </VStack>
    )

}

export default NewAdd;