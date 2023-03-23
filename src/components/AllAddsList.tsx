import { useEffect, useState } from "react";
import { Box, Text, VStack, ScrollView, Input, Icon, HStack } from "native-base";
import { Ionicons } from '@expo/vector-icons';

import Loading from "./Loading";
import AddProduct from "./AddProduct";

import api from "@services/api";
import { AppError } from "@utils/AppError";
import { DatabaseProductDTO } from "@dtos/ProductDTO";

const AllAddsList = () => {
    const [isLoadingAdds, setIsLoadingAdds] = useState(true);
    const [addsList, setAddsList] = useState<DatabaseProductDTO[]>([]);

    const fetchAdds = async () => {
        try {
            const response = await api.get('/products');
            setAddsList(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoadingAdds(false);
        }
    }

    useEffect(() => {
        fetchAdds();

    }, [])


    return (
        isLoadingAdds ? <Loading /> :

        addsList.length > 0 ?

        <VStack flex = {1} mt = {6}>
                <Text fontFamily = 'body' fontSize = 'md' color = 'gray.300'>
                    Compre produtos variados
                </Text>

                <HStack mt = {4} w = '100%' bgColor = 'gray.700' rounded = 'md' p = {2} alignItems = 'center'>
                    <Input 
                        placeholder = 'Buscar anúncio'
                        fontSize = 'lg'
                        h = {8}
                        placeholderTextColor = 'gray.400'
                        flex = {1}
                        borderWidth = {0}
                        _focus = {{
                            bgColor: 'gray.700',
                        }}
                    />

                    <Icon 
                        as = {Ionicons}
                        name = 'search'
                        size = {6}
                        color = 'gray.100'
                        ml = {2}
                    />

                    <Text color = 'gray.400' fontSize = 'xl' mx = {1}> | </Text>

                    <Icon 
                        as = {Ionicons}
                        name = 'options-outline'
                        size = {6}
                        color = 'gray.100'        
                    />
                </HStack>

                <ScrollView flex = {1} mt = {4} showsVerticalScrollIndicator = {false}>
                    <HStack flexWrap = 'wrap' justifyContent = 'space-between' pb = {10}>
                        {
                            addsList.map(add => {
                                return (
                                    <AddProduct 
                                        product = {add}
                                        key = {add.id}
                                    />
                                )
                            })
                        }
                    </HStack>
                </ScrollView>

            </VStack>
        :
            <Text fontSize = 'lg' fontFamily = 'body' color = 'gray.300' mt = {10} fontStyle = 'italic'> 
                Nenhum anúncio foi encontrado... 
            </Text>
    )

}

export default AllAddsList;