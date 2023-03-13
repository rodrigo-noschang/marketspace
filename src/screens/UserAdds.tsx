import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { VStack, Text, Heading, Select, HStack, Icon } from "native-base";
import { SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

import AddProduct from "@components/AddProduct";
import AppHeader from "@components/AppHeader";

import { useUserAdds } from "@contexts/userAddsContext";
import { AddsRoutesNavigationProps } from "@routes/adds.routes";
import { DatabaseProductDTO } from "@dtos/ProductDTO";
import { NewProductAddDTO } from "@dtos/AddsDTO";
import api from "@services/api";

const UserAdds = () => {
    const { userAdds, fetchUserAdds } = useUserAdds();

    const [selectedAddsFilter, setSelectedAddsFilter] = useState('all');

    const navigator = useNavigation<AddsRoutesNavigationProps>();

    const handleNewAddRoute = () => {
        navigator.navigate('newAdd');
    }

    const handleShowAdd = (add: DatabaseProductDTO) => {
        console.log('IMPLEMENTAR ADD PREVIEW NA PAGINA USERADDS!!!!');
        // const addData: NewProductAddDTO = {
        //     name: add.name,
        //     description: add.description,
        //     is_new: add.is_new,
        //     price: add.price,
        //     accept_trade: add.accept_trade,
        //     payment_methods: add.payment_methods.map(method => method.key),
        // }

        // const addImages = add.product_images.map(image => {
        //     return {
        //         name: '',
        //         type: '',
        //         uri: `${api.defaults.baseURL}/images/${image.path}`
        //     } 
        // })

        // navigator.navigate('addPreview');
    }
    
    useFocusEffect(useCallback(() => {
        fetchUserAdds();
    }, []))

    return (
        <VStack pt = {45} px = {6} flex = {1}>
            <AppHeader 
                // returnable
                title = 'Meus anúncios'
                action = {handleNewAddRoute}
                actionIcon = "plus"
            />

            <HStack alignItems = 'center' justifyContent = 'space-between' mt = {4}>
                <Text fontSize = 'sm' fontFamily= 'body' color = 'gray.300'>
                    {userAdds ? userAdds.length : 0} anúncio(s) 
                </Text>

                <Select
                    selectedValue = {selectedAddsFilter} 
                    minW = {100} 
                    accessibilityLabel = 'Selecione um anúncio'
                    placeholder = 'Todos'
                    px = {2}
                    size = {3}
                    h = {8}
                    dropdownIcon = {
                        <Icon 
                            as = {SimpleLineIcons}
                            name = 'arrow-down'
                            size = {3}
                            mr = {1}
                        />
                    }
                    onValueChange = {itemValue => setSelectedAddsFilter(itemValue)}
                >
                    <Select.Item 
                        label = 'Todos' value = 'all'
                    />
                    {
                        userAdds?.map(add => (
                            <Select.Item label = {add.name} value = {add.id} key = {add.id}/>
                        ))
                    }
                </Select>
            </HStack>

            <HStack flexWrap = 'wrap' justifyContent = 'space-between'>
                {userAdds ? 
                    userAdds.map((add, index) => (
                        <AddProduct 
                            product = {add} 
                            key = {`${add.id}-${index}`}
                            onPress = {() => handleShowAdd(add)}
                        />
                    ))
                :
                    <Heading fontSize = 'lg' fontFamily = 'heading' color = 'gray.300'> Você ainda não possui anúncios </Heading>
                }
            </HStack>
        </VStack>
    )
}

export default UserAdds;