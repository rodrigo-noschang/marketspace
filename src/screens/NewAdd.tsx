import { useEffect } from 'react';
import { VStack, Box } from 'native-base';
import AppHeader from '@components/AppHeader';

import NewAddForm from '@components/NewAddForm';
import { useNewAdd } from '@contexts/newAddContext';

const NewAdd = () => {
    
    const { setNewAddImages } = useNewAdd();

    useEffect(() => {

        return () => {
            setNewAddImages([]);
        }
    }, [])

    return (
        <VStack flex = {1}>

            <Box pt = {45} px = {6} bgColor = 'gray.600'>
                <AppHeader 
                    title = 'Criar anúncio'
                    returnable
                    warningMessage = 'Se você sair dessa tela, os dados do anúncio serão perdidos e será necessário inserí-los novamente'
                />
            </Box>

            
            <NewAddForm />
        </VStack>
    )

}

export default NewAdd;