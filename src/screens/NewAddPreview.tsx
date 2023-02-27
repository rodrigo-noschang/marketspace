import { HStack, VStack } from "native-base"
import { useNavigation } from '@react-navigation/native'

import { useNewAdd } from "@contexts/newAddContext";
import { useAuth } from "@contexts/authContext";

import Button from "@components/Button";
import ProductsInfo from "@components/ProductsInfo";
import AddPreviewHeader from "@components/AddPreviewHeader";

const NewAddPreview = () => {
    const { newAdd, newAddImages } = useNewAdd();
    const { user } = useAuth();

    const navigator = useNavigation();

    return (
        <VStack flex = {1} bgColor = 'gray.700'> 
            <AddPreviewHeader />
            
            <ProductsInfo 
                productAnnouncer = {user}
                productData = {newAdd}
                productImages = {newAddImages}
            />
            

            <HStack px = {6} py = {6} justifyContent = 'space-between'>
                <Button 
                    title = 'Voltar e editar'
                    buttonTheme = 'light'
                    iconName = 'arrowleft'
                    w = '48%'
                    onPress = {() => navigator.goBack()}
                />

                <Button 
                    title = 'Publicar'
                    buttonTheme = 'blue'
                    iconName = 'tag'
                    w = '48%'
                />
            </HStack>

        </VStack>
    )
}

export default NewAddPreview;